import { createClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export default async function(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userToken = authHeader.replace("Bearer ", "");
    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      edgeFunctionToken: userToken,
    });

    const { data: userData } = await insforge.auth.getCurrentUser();
    if (!userData?.user?.id) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let { data: subscription } = await insforge.database
      .from("pentridge_subscriptions")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Fallback: subscriptions purchased before the account existed have
    // user_id null but a verified email — claim and backfill on first check
    if (!subscription && userData.user.email) {
      const { data: byEmailRows } = await insforge.database
        .from("pentridge_subscriptions")
        .select("*")
        .eq("email", userData.user.email.toLowerCase())
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(5);

      const unclaimed = (byEmailRows || []).find(
        (row) => !row.user_id || row.user_id === userData.user.id
      );

      if (unclaimed) {
        subscription = unclaimed;
        if (!unclaimed.user_id) {
          await insforge.database
            .from("pentridge_subscriptions")
            .update({ user_id: userData.user.id, updated_at: new Date().toISOString() })
            .eq("id", unclaimed.id);
        }
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
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
