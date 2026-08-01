import { createClient, createAdminClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
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

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Identity is established with the caller's own token — never trust an
    // email supplied by the client.
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

    // Subscription rows are read/written with the admin key so that RLS on
    // pentridge_subscriptions can stay locked to `auth.uid() = user_id`.
    // The email-claim path below needs to see rows whose user_id is still
    // null, and the backfill needs UPDATE — neither is possible under the
    // caller's own token. Every query here is scoped to the *verified*
    // identity above, so this widens nothing the caller couldn't already see.
    const db = createAdminClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      apiKey: Deno.env.get("API_KEY")!,
    });

    let { data: subscription } = await db.database
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
      const { data: byEmailRows } = await db.database
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
          const { error: claimError } = await db.database
            .from("pentridge_subscriptions")
            .update({ user_id: userData.user.id, updated_at: new Date().toISOString() })
            .eq("id", unclaimed.id);
          // Non-fatal: access is already granted from `unclaimed`. Log it so a
          // silently failing backfill can't hide again the way it did under RLS.
          if (claimError) console.error("user_id backfill failed:", claimError);
        }
      }
    }

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
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
