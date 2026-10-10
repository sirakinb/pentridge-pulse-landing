import { createClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-cal-secret",
};

type AnyRecord = Record<string, any>;

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

function pickFirstString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function getPayload(event: AnyRecord): AnyRecord {
  return event.payload && typeof event.payload === "object" ? event.payload : event;
}

function getAttendee(payload: AnyRecord): AnyRecord {
  const attendees = Array.isArray(payload.attendees) ? payload.attendees : [];
  return attendees.find((attendee) => attendee?.email) || attendees[0] || payload.attendee || {};
}

function getBookingId(event: AnyRecord, payload: AnyRecord): string | null {
  const value = event.id ?? payload.id ?? payload.uid ?? payload.bookingId ?? payload.bookingUid;
  return value === undefined || value === null ? null : String(value);
}

function getEventType(event: AnyRecord): string {
  return pickFirstString(event.type, event.triggerEvent, event.event) || "BOOKING_CREATED";
}

// Map a Cal.com booking to a CRM tag by which event type was booked.
// Add new event-type slugs here to tag them distinctly.
const EVENT_TAGS: Record<string, string> = {
  "30min": "Demo Call",
  "60-min-strategy-session": "Strategy Session",
};

function getBookingTag(payload: AnyRecord): string {
  const hay = [
    payload.eventType?.slug, payload.type, payload.eventTypeSlug, payload.slug,
    payload.title, payload.eventTitle,
  ].filter((v) => typeof v === "string").join(" ").toLowerCase();

  for (const [slug, tag] of Object.entries(EVENT_TAGS)) {
    if (hay.includes(slug)) return tag;
  }
  if (hay.includes("strategy")) return "Strategy Session";
  if (hay.includes("discovery") || hay.includes("demo") || hay.includes("30 min") || hay.includes("30min")) return "Demo Call";
  return "Cal.com Booking";
}

async function findContact(insforge: any, workspaceId: string, email: string) {
  const { data, error } = await insforge.database
    .from("contacts")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("email", email)
    .limit(1);

  if (error) throw error;
  return data?.[0] || null;
}

async function upsertContact(insforge: any, params: {
  workspaceId: string;
  email: string;
  name: string | null;
  phone: string | null;
  company: string | null;
  bookingUrl: string | null;
}) {
  const now = new Date().toISOString();
  const { firstName, lastName } = splitName(params.name);
  const existing = await findContact(insforge, params.workspaceId, params.email);

  const bookingNote = [
    "Booked a Cal.com appointment.",
    params.bookingUrl ? `Booking: ${params.bookingUrl}` : null,
  ].filter(Boolean).join("\n");

  if (existing) {
    const nextNotes = existing.notes?.includes("Booked a Cal.com appointment")
      ? existing.notes
      : [existing.notes, bookingNote].filter(Boolean).join("\n\n");

    const { data, error } = await insforge.database
      .from("contacts")
      .update({
        first_name: existing.first_name || firstName,
        last_name: existing.last_name || lastName,
        phone: existing.phone || params.phone,
        company: existing.company || params.company,
        status: "active",
        notes: nextNotes || existing.notes,
        updated_at: now,
      })
      .eq("id", existing.id)
      .select("*")
      .limit(1);

    if (error) throw error;
    return { contact: data?.[0] || existing, created: false };
  }

  const { data, error } = await insforge.database
    .from("contacts")
    .insert([{
      workspace_id: params.workspaceId,
      first_name: firstName,
      last_name: lastName,
      email: params.email,
      phone: params.phone,
      company: params.company,
      status: "active",
      notes: bookingNote,
      created_at: now,
      updated_at: now,
    }])
    .select("*")
    .limit(1);

  if (error) throw error;
  return { contact: data?.[0], created: true };
}

async function ensureTag(insforge: any, workspaceId: string, name: string) {
  const { data: existing, error: selectError } = await insforge.database
    .from("tags")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("name", name)
    .limit(1);

  if (selectError) throw selectError;
  if (existing?.[0]) return existing[0];

  const { data, error } = await insforge.database
    .from("tags")
    .insert([{ workspace_id: workspaceId, name, color: "#2563eb" }])
    .select("*")
    .limit(1);

  if (error) throw error;
  return data?.[0] || null;
}

async function tagContact(insforge: any, contactId: string, tagId: string) {
  const { error } = await insforge.database
    .from("contact_tags")
    .upsert([{ contact_id: contactId, tag_id: tagId }], { onConflict: "contact_id,tag_id" });

  if (error) throw error;
}

export default async function(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const expectedSecret = Deno.env.get("CAL_WEBHOOK_SECRET");
  if (expectedSecret) {
    const receivedSecret = req.headers.get("x-cal-secret")
      || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
      || new URL(req.url).searchParams.get("secret");
    if (receivedSecret !== expectedSecret) {
      return json({ error: "Unauthorized" }, 401);
    }
  }

  try {
    const event = await req.json();
    const payload = getPayload(event);
    const attendee = getAttendee(payload);
    const email = normalizeEmail(attendee.email ?? payload.email ?? payload.bookerEmail);

    if (!email) {
      return json({ error: "Booking payload is missing attendee email" }, 400);
    }

    const eventType = getEventType(event);
    if (!["BOOKING_CREATED", "booking.created"].includes(eventType)) {
      return json({ received: true, ignored: true, eventType });
    }

    const bookingId = getBookingId(event, payload);
    const workspaceId = Deno.env.get("CRM_WORKSPACE_ID") || "pentridge";
    const name = pickFirstString(attendee.name, payload.name, payload.title);
    const phone = pickFirstString(attendee.phoneNumber, attendee.phone, payload.phoneNumber, payload.phone);
    const company = pickFirstString(payload.company, payload.responses?.company?.value, payload.metadata?.company);
    const bookingUrl = pickFirstString(payload.bookingUrl, payload.rescheduleUrl, payload.meetingUrl);

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      anonKey: Deno.env.get("ANON_KEY")!,
    });

    if (bookingId) {
      const { data: existingEvent, error: existingError } = await insforge.database
        .from("cal_booking_events")
        .select("id, contact_id")
        .eq("cal_booking_id", bookingId)
        .limit(1);

      if (existingError) throw existingError;
      if (existingEvent?.[0]) {
        return json({ received: true, duplicate: true, contactId: existingEvent[0].contact_id });
      }
    }

    const { contact, created } = await upsertContact(insforge, {
      workspaceId,
      email,
      name,
      phone,
      company,
      bookingUrl,
    });

    const tag = await ensureTag(insforge, workspaceId, getBookingTag(payload));
    if (tag?.id && contact?.id) {
      await tagContact(insforge, contact.id, tag.id);
    }

    if (bookingId && contact?.id) {
      const { error: bookingError } = await insforge.database
        .from("cal_booking_events")
        .insert([{
          workspace_id: workspaceId,
          cal_booking_id: bookingId,
          contact_id: contact.id,
          event_type: eventType,
          attendee_email: email,
          attendee_name: name,
          starts_at: payload.startTime || payload.start || null,
          ends_at: payload.endTime || payload.end || null,
          booking_url: bookingUrl,
          raw_payload: event,
        }]);

      if (bookingError) throw bookingError;
    }

    if (contact?.id) {
      const { error: activityError } = await insforge.database
        .from("activity_logs")
        .insert([{
          workspace_id: workspaceId,
          contact_id: contact.id,
          action: "cal_booking_created",
          entity_type: "contact",
          entity_id: contact.id,
          details: {
            email,
            name,
            phone,
            company,
            bookingId,
            bookingUrl,
            startsAt: payload.startTime || payload.start || null,
          },
          metadata: {
            source: "cal.com",
            createdByWebhook: true,
          },
        }]);

      if (activityError) throw activityError;
    }

    return json({ received: true, contactId: contact?.id, created });
  } catch (err) {
    console.error("Cal booking webhook error:", err);
    return json({ error: "Webhook processing failed" }, 400);
  }
}
