import { createAdminClient } from 'npm:@insforge/sdk';

// SECURITY: this endpoint is intentionally unauthenticated so sibling apps can
// check entitlement by email, and it responds to any origin. That means anyone
// can probe whether a given email has a Pentridge Labs subscription and at
// what tier. Tier has to stay: apps have no plans of their own and inherit
// the subscriber's Labs tier, so it is load-bearing entitlement data. What
// the response does NOT carry is billing metadata — billing cadence, renewal
// date, ever-subscribed state, Stripe IDs or user id.
//
// A shared key would NOT fix the remaining exposure: the sibling apps call this
// from the browser (AlignoCRM's subscription-context.tsx is "use client"), so
// any key would ship in their JS bundle. The real fix is a per-app server-side
// proxy to check-subscription-by-email, the way DropCard already does it.


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Grace window covers renewal-webhook lag before treating a row as lapsed
const PERIOD_END_GRACE_MS = 3 * 24 * 60 * 60 * 1000;

function isCurrent(sub: { current_period_end?: string | null } | null): boolean {
  if (!sub) return false;
  if (!sub.current_period_end) return true;
  return new Date(sub.current_period_end).getTime() + PERIOD_END_GRACE_MS > Date.now();
}

export default async function(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ has_subscription: false, tier: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Admin key: a cross-user lookup by email cannot be expressed under the
    // caller-scoped RLS policy. This endpoint is unauthenticated by design —
    // see the SECURITY note at the top of this file.
    const insforge = createAdminClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      apiKey: Deno.env.get("API_KEY")!,
    });

    // current_period_end is still selected because isCurrent() needs it to
    // decide active-vs-expired — it is just no longer echoed to the caller.
    const { data: subscription } = await insforge.database
      .from("pentridge_subscriptions")
      .select("tier, status, current_period_end")
      .eq("email", email.toLowerCase().trim())
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Minimised response: entitlement only.
    //
    // `tier` is required, not optional. Tiers are a Pentridge Labs concept —
    // the individual apps have no plan structure of their own, they grant
    // whatever the subscriber's Labs tier entitles them to. So Standard vs Pro
    // is exactly what an app needs to apply the right limits (e.g. Voiyce's
    // 10k words/month on Standard vs unlimited dictation on Pro). Removing it
    // would silently collapse every app to a single behaviour.
    //
    // Dropped instead: billing_period, current_period_end, and the
    // active-vs-"expired" distinction. Those are billing metadata, not
    // entitlement — no app gates on them, and they are the parts that turn a
    // probe into a profile (renewal date, cadence, ever-subscribed).
    //
    // Anyone can still call this with any email, so it remains an oracle by
    // construction; that is inherent to the email-bridge design and is fixed
    // properly by a per-app server-side proxy, not by trimming fields.
    const active = isCurrent(subscription);
    return new Response(
      JSON.stringify({
        has_subscription: active,
        tier: active ? subscription?.tier ?? null : null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Check subscription public error:", err);
    return new Response(
      JSON.stringify({ has_subscription: false, tier: null }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}

