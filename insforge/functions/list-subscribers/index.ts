import { createAdminClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
};

export default async function(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Require API key for admin access
  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("ADMIN_API_KEY");
  if (!apiKey || apiKey !== expectedKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const insforge = createAdminClient({
      // Gated by ADMIN_API_KEY above.
      baseUrl: Deno.env.get("INSFORGE_BASE_URL"),
      apiKey: Deno.env.get("API_KEY"),
    });

    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // filter by status
    const search = url.searchParams.get("search"); // search by email

    let query = insforge.database
      .from("pentridge_subscriptions")
      .select("id, email, tier, billing_period, status, current_period_start, current_period_end, stripe_customer_id, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.ilike("email", `%${search}%`);
    }

    const { data: subscribers, error } = await query;

    if (error) {
      console.error("List subscribers error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Calculate stats
    const active = (subscribers || []).filter(s => s.status === "active");
    const monthly = active.filter(s => s.billing_period === "monthly");
    const yearly = active.filter(s => s.billing_period === "yearly");

    // Rough MRR: assume $20/mo for monthly, $200/yr = $16.67/mo for yearly
    const monthlyMRR = monthly.length * 20;
    const yearlyMRR = yearly.length * (200 / 12);
    const totalMRR = Math.round((monthlyMRR + yearlyMRR) * 100) / 100;

    return new Response(
      JSON.stringify({
        subscribers: subscribers || [],
        stats: {
          total: (subscribers || []).length,
          active: active.length,
          mrr: totalMRR,
          monthly_count: monthly.length,
          yearly_count: yearly.length,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("List subscribers error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}


