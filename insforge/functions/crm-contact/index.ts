import { createAdminClient } from 'npm:@insforge/sdk';

// Generic "add a contact to the Pentridge Media CRM" endpoint.
// POST { email, name?, phone?, source, notes? } -> upserts a contact and tags it source:<source>.
// Used by the website newsletter signup and any other lead source that should
// land in AlignoCRM. (The readiness checklist has its own richer function.)
//
// Uses the project admin API_KEY because contacts/tags are RLS-gated to
// is_org_member(...). The anon key cannot insert/select those rows.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type AnyRecord = Record<string, any>;

const WORKSPACE_ID = Deno.env.get("READINESS_WORKSPACE_ID") || "org_8bf9140f1c74f6defe15";
const ORGANIZATION_ID = Deno.env.get("READINESS_ORG_ID") || "3d72d663-0231-4b5a-a57b-669ea5b5aa94";
const TAG_COLOR = "#9E57EA";

// Owner notification (Resend) — best-effort; skipped if the key is unset.
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const RESEND_FROM = Deno.env.get("RESEND_FROM") || "Pentridge Media <hello@pentridgemedia.com>";
const NOTIFY_EMAIL = Deno.env.get("CRM_NOTIFY_EMAIL") || "aki.b@pentridgemedia.com";
const REPLY_TO = Deno.env.get("READINESS_REPLY_TO") || "aki.b@pentridgemedia.com";

function json(body: AnyRecord, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return email.includes("@") ? email : null;
}

function splitName(name: string | null): { firstName: string | null; lastName: string | null } {
  if (!name) return { firstName: null, lastName: null };
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: null, lastName: null };
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// Only allow simple slug-ish source values so the tag name stays clean.
function safeSource(value: unknown): string {
  const s = (typeof value === "string" ? value : "").trim().toLowerCase().replace(/[^a-z0-9:-]+/g, "-");
  return s || "website";
}

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

const OFFICE_HOURS_ZOOM = "https://us06web.zoom.us/j/87488468945";
const OFFICE_HOURS_DATE = "Thursday, July 15 at 6pm EST";

async function sendOfficeHoursConfirmation(toEmail: string, firstName: string | null): Promise<void> {
  if (!RESEND_API_KEY) return;
  const greeting = firstName ? `Hey ${firstName},` : "Hey,";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [toEmail],
        cc: [NOTIFY_EMAIL],
        reply_to: REPLY_TO,
        subject: "You're in — AI Office Hours Zoom link",
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:480px">
          <p>${esc(greeting)}</p>
          <p>You're registered for AI Office Hours. Here's your Zoom link:</p>
          <p style="margin:24px 0">
            <a href="${OFFICE_HOURS_ZOOM}" style="background:#9333ea;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block">
              Join on Zoom
            </a>
          </p>
          <p style="color:#555;font-size:14px">${OFFICE_HOURS_DATE}<br>
          <a href="${OFFICE_HOURS_ZOOM}" style="color:#9333ea">${OFFICE_HOURS_ZOOM}</a></p>
          <p style="color:#555;font-size:14px">Bring your questions on AI, vibe coding, and workflow automation. See you there!</p>
          <p>— Aki</p>
        </div>`,
      }),
    });
    if (!res.ok) console.error("Office hours confirmation failed:", res.status, await res.text());
  } catch (err) {
    console.error("Office hours confirmation error:", err);
  }
}

async function notifyOwner(email: string, source: string, created: boolean, tagName: string): Promise<void> {
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [NOTIFY_EMAIL],
        reply_to: REPLY_TO,
        subject: `New ${source} contact: ${email}`,
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p><strong>New contact added to your CRM</strong></p>
          <p>Email: ${esc(email)}<br>Source: ${esc(source)}<br>${created ? "New contact" : "Returning contact (re-submitted)"}<br>Tagged: ${esc(tagName)}</p>
          <p>Saved to Pentridge Media.</p>
        </div>`,
      }),
    });
    if (!res.ok) console.error("Owner notify failed:", res.status, await res.text());
  } catch (err) {
    console.error("Owner notify error:", err);
  }
}

async function findContact(insforge: any, email: string) {
  const { data, error } = await insforge.database
    .from("contacts")
    .select("*")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("email", email)
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

async function ensureTag(insforge: any, name: string) {
  const { data: existing, error: selectError } = await insforge.database
    .from("tags")
    .select("*")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("name", name)
    .limit(1);
  if (selectError) throw selectError;
  if (existing?.[0]) return existing[0];

  const { data, error } = await insforge.database
    .from("tags")
    .insert([{ workspace_id: WORKSPACE_ID, organization_id: ORGANIZATION_ID, name, color: TAG_COLOR }])
    .select("*")
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

async function tagContact(insforge: any, contactId: string, tagId: string) {
  const { error } = await insforge.database
    .from("contact_tags")
    .upsert([{ contact_id: contactId, tag_id: tagId, organization_id: ORGANIZATION_ID }], {
      onConflict: "contact_id,tag_id",
    });
  if (error) throw error;
}

export default async function (req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const email = normalizeEmail(body.email);
    if (!email) {
      return json({ error: "A valid email is required" }, 400);
    }

    const source = safeSource(body.source);
    const tagName = `source:${source}`;
    const { firstName, lastName } = splitName(str(body.name));
    const phone = str(body.phone);
    const notes = str(body.notes);
    const now = new Date().toISOString();

    const insforge = createAdminClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      apiKey: Deno.env.get("API_KEY")!,
    });

    const existing = await findContact(insforge, email);
    let contact = existing;
    let created = false;

    if (existing) {
      // Keep known fields; only fill blanks and append a note if provided.
      const mergedNotes = notes
        ? [notes, existing.notes].filter(Boolean).join("\n\n---\n\n")
        : existing.notes;
      const { data, error } = await insforge.database
        .from("contacts")
        .update({
          first_name: existing.first_name || firstName,
          last_name: existing.last_name || lastName,
          phone: existing.phone || phone,
          notes: mergedNotes,
          updated_at: now,
        })
        .eq("id", existing.id)
        .select("*")
        .limit(1);
      if (error) throw error;
      contact = data?.[0] || existing;
    } else {
      const { data, error } = await insforge.database
        .from("contacts")
        .insert([{
          workspace_id: WORKSPACE_ID,
          organization_id: ORGANIZATION_ID,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          status: "active",
          notes,
          created_at: now,
          updated_at: now,
        }])
        .select("*")
        .limit(1);
      if (error) throw error;
      contact = data?.[0];
      created = true;
    }

    const tag = await ensureTag(insforge, tagName);
    if (tag?.id && contact?.id) {
      await tagContact(insforge, contact.id, tag.id);
    }

    // Notify the owner — best-effort, never blocks the response.
    await notifyOwner(email, source, created, tagName);

    // Send confirmation with Zoom link for office hours signups.
    if (source === "office-hours") {
      await sendOfficeHoursConfirmation(email, firstName);
    }

    return json({ received: true, contactId: contact?.id, created, tag: tagName });
  } catch (err) {
    console.error("crm-contact error:", err);
    return json({ error: "Submission failed" }, 400);
  }
}
