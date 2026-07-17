import { createClient } from 'npm:@insforge/sdk';

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
      return new Response(JSON.stringify({ has_subscription: false, tier: null, billing_period: null, status: null, current_period_end: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      anonKey: Deno.env.get("ANON_KEY")!,
    });

    const { data: subscription } = await insforge.database
      .from("pentridge_subscriptions")
      .select("tier, billing_period, status, current_period_end")
      .eq("email", email.toLowerCase().trim())
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const active = isCurrent(subscription);
    return new Response(
      JSON.stringify({
        has_subscription: active,
        tier: subscription?.tier || null,
        billing_period: subscription?.billing_period || null,
        status: active ? subscription?.status || null : subscription ? "expired" : null,
        current_period_end: subscription?.current_period_end || null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Check subscription public error:", err);
    return new Response(
      JSON.stringify({ has_subscription: false, tier: null, billing_period: null, status: null, current_period_end: null }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}

