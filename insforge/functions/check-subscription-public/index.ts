import { createClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

    // Look up by email — first try email column directly, then fall back to auth user join
    let subscription = null;

    // Try direct email column lookup
    const { data: directMatch } = await insforge.database
      .from("pentridge_subscriptions")
      .select("tier, billing_period, status, current_period_end")
      .eq("email", email.toLowerCase().trim())
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (directMatch) {
      subscription = directMatch;
    } else {
      // Fall back to joining with auth users view
      const { data: joinMatch } = await insforge.database
        .from("pentridge_subscriptions")
        .select("tier, billing_period, status, current_period_end, auth_users_view!inner(email)")
        .eq("auth_users_view.email", email.toLowerCase().trim())
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (joinMatch) {
        subscription = joinMatch;
      }
    }

    return new Response(
      JSON.stringify({
        has_subscription: !!subscription,
        tier: subscription?.tier || null,
        billing_period: subscription?.billing_period || null,
        status: subscription?.status || null,
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
