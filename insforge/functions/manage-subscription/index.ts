import { createAdminClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
};

export default async function(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("ADMIN_API_KEY");
  if (!apiKey || apiKey !== expectedKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { action, email, tier, billing_period } = await req.json();

    const insforge = createAdminClient({
      // Gated by ADMIN_API_KEY above.
      baseUrl: Deno.env.get("INSFORGE_BASE_URL"),
      apiKey: Deno.env.get("API_KEY"),
    });

    if (action === "comp") {
      // Grant complimentary access
      if (!email) {
        return new Response(JSON.stringify({ error: "Email required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check if already has subscription
      const { data: existing } = await insforge.database
        .from("pentridge_subscriptions")
        .select("id, status")
        .eq("email", email.toLowerCase().trim())
        .limit(1)
        .single();

      if (existing && existing.status === "active") {
        return new Response(JSON.stringify({ error: "Already has active subscription", subscription: existing }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create or reactivate
      if (existing) {
        const { data, error } = await insforge.database
          .from("pentridge_subscriptions")
          .update({
            status: "active",
            tier: tier || "standard",
            billing_period: billing_period || "comp",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, subscription: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await insforge.database
        .from("pentridge_subscriptions")
        .insert({
          email: email.toLowerCase().trim(),
          tier: tier || "standard",
          billing_period: billing_period || "comp",
          status: "active",
          current_period_start: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, subscription: data }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "revoke") {
      if (!email) {
        return new Response(JSON.stringify({ error: "Email required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await insforge.database
        .from("pentridge_subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("email", email.toLowerCase().trim())
        .eq("status", "active")
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, subscription: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action. Use 'comp' or 'revoke'" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Manage subscription error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}


