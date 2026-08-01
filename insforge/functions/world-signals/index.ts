import { createClient } from 'npm:@insforge/sdk';

// Activity signals for the Labs world. One authenticated endpoint that fans out
// to each app's project server-side.
//
// SECURITY SHAPE — this is the pattern the subscription oracle should also move
// to eventually:
//   * Identity comes from the caller's OWN token, never from a body parameter.
//     A client cannot ask for someone else's numbers.
//   * Per-app credentials live in secrets here and never reach the browser.
//   * Only aggregate counts are returned — never records, names or IDs.
//   * Any app that errors, times out, or is not configured yields null, which
//     the world renders as its neutral active baseline. A dead app must look
//     quiet, never broken.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

const TIMEOUT_MS = 4000;

async function fetchJSON(url: string, key: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// AlignoCRM scopes work by organization, not by deal owner (owner_id is unset),
// so the chain is: verified email -> user -> their orgs -> counts within them.
// Anything outside those orgs must never be counted.
async function alignoCrmSignals(email: string) {
  const base = Deno.env.get('ALIGNOCRM_URL');
  const key = Deno.env.get('ALIGNOCRM_API_KEY');
  if (!base || !key) return null;

  // NOTE: this endpoint ignores its email filter and returns every user, so the
  // match has to happen here. The list never leaves this function.
  const users = await fetchJSON(`${base}/api/auth/users`, key);
  const list = Array.isArray(users) ? users : users?.data ?? [];
  const me = list.find(
    (u: { email?: string }) => (u.email || '').toLowerCase() === email,
  );
  if (!me?.id) return null;

  const members = await fetchJSON(
    `${base}/api/database/records/organization_members?select=organization_id&user_id=eq.${me.id}`,
    key,
  );
  const orgs = (members || []).map((m: { organization_id: string }) => m.organization_id);
  if (!orgs.length) return { open_deals: 0, tasks_due: 0, contacts: 0 };

  const inList = `(${orgs.join(',')})`;
  const [deals, tasks, contacts] = await Promise.all([
    fetchJSON(`${base}/api/database/records/deals?select=id&status=eq.open&organization_id=in.${inList}`, key),
    fetchJSON(`${base}/api/database/records/tasks?select=id&organization_id=in.${inList}`, key),
    fetchJSON(`${base}/api/database/records/contacts?select=id&organization_id=in.${inList}`, key),
  ]);

  return {
    open_deals: Array.isArray(deals) ? deals.length : 0,
    tasks_due: Array.isArray(tasks) ? tasks.length : 0,
    contacts: Array.isArray(contacts) ? contacts.length : 0,
  };
}

export default async function (req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No auth token' }, 401);

    const insforge = createClient({
      baseUrl: Deno.env.get('INSFORGE_BASE_URL')!,
      edgeFunctionToken: authHeader.replace('Bearer ', ''),
    });
    const { data: userData } = await insforge.auth.getCurrentUser();
    const email = userData?.user?.email?.toLowerCase();
    if (!email) return json({ error: 'Invalid token' }, 401);

    // Fan out. Each app is independent — one failing must not blank the others.
    const [crm] = await Promise.all([alignoCrmSignals(email)]);

    return json({
      crm,
      pm: null,        // Pentridge-PM: no signals endpoint yet
      dropcard: null,  // DropCard: reads via its own proxy, not wired here yet
      voiyce: null,
      content: null,   // not shipped
    });
  } catch {
    // Never surface an error to the world; the neutral baseline is the fallback.
    return json({ crm: null, pm: null, dropcard: null, voiyce: null, content: null });
  }
}
