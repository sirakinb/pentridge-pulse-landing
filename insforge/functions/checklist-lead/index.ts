import { createAdminClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type AnyRecord = Record<string, any>;

// Pentridge Media workspace in AlignoCRM. Pinned intentionally: the shared
// CRM_WORKSPACE_ID secret is "pentridge", which is NOT a real workspace_id,
// so we hardcode the correct IDs (env can still override).
const WORKSPACE_ID = Deno.env.get("READINESS_WORKSPACE_ID") || "org_8bf9140f1c74f6defe15";
const ORGANIZATION_ID = Deno.env.get("READINESS_ORG_ID") || "3d72d663-0231-4b5a-a57b-669ea5b5aa94";
const SOURCE_TAG = "source:readiness-checklist";
const TAG_COLOR = "#9E57EA";

// Email (Resend) — all optional. If RESEND_API_KEY / RESEND_FROM are unset,
// email sending is skipped silently and the lead is still saved + shown on-screen.
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const RESEND_FROM = Deno.env.get("RESEND_FROM") || "Pentridge Media <hello@pentridgemedia.com>";
// Shared Pentridge broadcast audience in Resend (source stored in first_name,
// matching lib/resend-audiences.js on the main site).
const RESEND_AUDIENCE_ID = Deno.env.get("RESEND_AUDIENCE_ID") || "b61490b3-e4a6-4eb8-b2c3-6dc8b8799480";
const NOTIFY_EMAIL = Deno.env.get("READINESS_NOTIFY_EMAIL") || "aki.b@pentridgemedia.com";
const REPLY_TO = Deno.env.get("READINESS_REPLY_TO") || "aki.b@pentridgemedia.com";
const BOOKING_URL = Deno.env.get("READINESS_BOOKING_URL") || "https://cal.com/akinyemi-bajulaiye-2jua88/30min?overlayCalendar=true";

const CHOICE_LABELS: Record<number, string> = {
  0: "Not handled",
  2: "Partially handled",
  3: "Systematized",
};

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

function buildNotes(body: AnyRecord): string {
  const score = Number.isFinite(body.score) ? body.score : "?";
  const band = str(body.band) || "—";
  const weakest = Array.isArray(body.weakest_areas) ? body.weakest_areas.filter(Boolean) : [];
  const biz = str(body.business_type);
  const submitted = str(body.submitted_at) || new Date().toISOString();

  const answerLines = Array.isArray(body.answers)
    ? body.answers.map((a: AnyRecord, i: number) => {
        const label = CHOICE_LABELS[a?.value] ?? "—";
        return `${i + 1}. ${str(a?.question) || "Question"} — ${label}`;
      })
    : [];

  return [
    "AUTOMATION READINESS CHECKLIST",
    `Score: ${score}/36 — ${band}`,
    weakest.length ? `Start here: ${weakest.join(", ")}` : null,
    biz ? `Business type: ${biz}` : null,
    `Submitted: ${submitted}`,
    answerLines.length ? "\nAnswers:" : null,
    ...answerLines,
  ].filter((line) => line !== null).join("\n");
}

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) return; // email not configured — skip quietly
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: RESEND_FROM, to: [to], reply_to: REPLY_TO, subject, html }),
    });
    if (!res.ok) console.error("Resend send failed:", res.status, await res.text());
  } catch (err) {
    console.error("Resend send error:", err);
  }
}

async function addToResendAudience(email: string): Promise<void> {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) return;
  try {
    // Idempotent on email. first_name = source, matching the main-site convention.
    const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, first_name: "readiness-checklist", unsubscribed: false }),
    });
    if (!res.ok) console.error("Resend audience add failed:", res.status, await res.text());
  } catch (err) {
    console.error("Resend audience add error:", err);
  }
}

function resultsEmailHtml(firstName: string | null, score: number | string, band: string, weakest: string[]): string {
  const hi = firstName ? `Hi ${esc(firstName)},` : "Hi,";
  const focus = weakest.length
    ? `<p style="margin:0 0 8px;font:600 12px/1.4 'Geist Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:#a1a1aa">Start here — your biggest opportunities</p>
       <ul style="margin:0 0 24px;padding-left:18px;color:#d4d4d8;font:400 15px/1.6 Arial,sans-serif">
       ${weakest.map((w) => `<li style="margin:0 0 6px">${esc(w)}</li>`).join("")}</ul>`
    : "";
  return `
  <div style="background:#000;padding:32px 20px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:520px;margin:0 auto;background:#0a0a0a;border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:32px">
      <div style="font:400 20px 'Geist Mono',monospace;letter-spacing:.1em;color:#fff;margin:0 0 24px">[P]</div>
      <p style="color:#fafafa;font-size:16px;margin:0 0 16px">${hi}</p>
      <p style="color:#d4d4d8;font-size:15px;line-height:1.6;margin:0 0 24px">Here's your Automation Readiness score.</p>
      <div style="text-align:center;padding:24px;background:#000;border:1px solid rgba(168,85,247,.28);border-radius:10px;margin:0 0 24px">
        <div style="font:800 56px Arial,sans-serif;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;background-clip:text;color:#a855f7;-webkit-text-fill-color:transparent">${esc(score)}<span style="font-size:22px;color:#71717a;-webkit-text-fill-color:#71717a">/36</span></div>
        <div style="display:inline-block;margin-top:12px;padding:6px 16px;border-radius:999px;background:rgba(168,85,247,.14);border:1px solid rgba(168,85,247,.3);color:#d8b4fe;font:600 13px 'Geist Mono',monospace;text-transform:uppercase">${esc(band)}</div>
      </div>
      ${focus}
      <a href="${esc(BOOKING_URL)}" style="display:block;text-align:center;background:linear-gradient(to right,#9333ea,#db2777);color:#fff;text-decoration:none;font:600 13px Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:16px;border-radius:0">Book a free discovery call →</a>
      <p style="color:#71717a;font-size:12px;line-height:1.5;margin:24px 0 0">Pentridge Media · AI Workflow Automation</p>
    </div>
  </div>`;
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

    const { firstName, lastName } = splitName(str(body.name));
    const company = str(body.business_type);
    const notes = buildNotes(body);
    const now = new Date().toISOString();

    // Admin key required — contacts/tags are RLS-gated to org members.
    const insforge = createAdminClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      apiKey: Deno.env.get("API_KEY")!,
    });

    const existing = await findContact(insforge, email);
    let contact = existing;
    let created = false;

    if (existing) {
      // Re-took the checklist — prepend the latest result, keep known fields.
      const mergedNotes = [notes, existing.notes].filter(Boolean).join("\n\n---\n\n");
      const { data, error } = await insforge.database
        .from("contacts")
        .update({
          first_name: existing.first_name || firstName,
          last_name: existing.last_name || lastName,
          company: existing.company || company,
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
          company,
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

    const tag = await ensureTag(insforge, SOURCE_TAG);
    if (tag?.id && contact?.id) {
      await tagContact(insforge, contact.id, tag.id);
    }

    if (contact?.id) {
      const { error: activityError } = await insforge.database
        .from("activity_logs")
        .insert([{
          workspace_id: WORKSPACE_ID,
          contact_id: contact.id,
          action: "readiness_checklist_submitted",
          entity_type: "contact",
          entity_id: contact.id,
          details: {
            email,
            score: body.score,
            band: body.band,
            weakest_areas: body.weakest_areas,
            business_type: company,
          },
          metadata: { source: "automation-checklist", createdByFunction: true },
        }]);
      // Activity log is best-effort — don't fail the lead capture over it.
      if (activityError) console.error("activity_logs insert failed:", activityError);
    }

    // Add to the Pentridge broadcast audience so we can email them updates.
    await addToResendAudience(email);

    // Emails are best-effort — never block or fail the lead capture on them.
    const weakest = Array.isArray(body.weakest_areas) ? body.weakest_areas.filter(Boolean) : [];
    await sendEmail(
      email,
      "Your Automation Readiness score",
      resultsEmailHtml(firstName, body.score ?? "?", str(body.band) || "—", weakest),
    );
    if (NOTIFY_EMAIL) {
      const fullName = [firstName, lastName].filter(Boolean).join(" ") || "(no name)";
      await sendEmail(
        NOTIFY_EMAIL,
        `New readiness lead: ${fullName} — ${body.score ?? "?"}/36`,
        `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p><strong>New Automation Readiness lead</strong></p>
          <p>Name: ${esc(fullName)}<br>Email: ${esc(email)}<br>Business: ${esc(company || "—")}<br>
          Score: ${esc(body.score ?? "?")}/36 — ${esc(str(body.band) || "—")}<br>
          Start here: ${esc(weakest.join(", ") || "—")}</p>
          <p>Saved to Pentridge Media CRM, tagged ${esc(SOURCE_TAG)}.</p>
        </div>`,
      );
    }

    return json({ received: true, contactId: contact?.id, created });
  } catch (err) {
    console.error("Checklist lead error:", err);
    return json({ error: "Submission failed" }, 400);
  }
}
