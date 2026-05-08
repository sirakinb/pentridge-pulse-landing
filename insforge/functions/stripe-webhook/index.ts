import { createClient } from 'npm:@insforge/sdk';

const TIER_MAP: Record<string, string> = {
  "prod_UT4IrJBI6HVhOm": "standard",
  "prod_UT4JEZhs4hfvdd": "pro",
};

const PERIOD_MAP: Record<string, string> = {
  "price_1TU8B2CHgVkAnNskCsB8X6bn": "monthly",
  "price_1TU8B3CHgVkAnNskHAblKGP2": "annual",
  "price_1TU8B4CHgVkAnNskCzq7ml57": "monthly",
  "price_1TU8B5CHgVkAnNskGNlKBrNg": "annual",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
};

export default async function(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const event = JSON.parse(body);

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      anonKey: Deno.env.get("ANON_KEY")!,
    });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")!;

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerEmail = session.customer_email || session.customer_details?.email;
        const stripeCustomerId = session.customer;
        const subscriptionId = session.subscription;

        if (!subscriptionId) break;

        const subRes = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
          headers: { Authorization: `Bearer ${stripeKey}` },
        });
        const subscription = await subRes.json();

        const productId = subscription.items.data[0]?.price?.product;
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = TIER_MAP[productId] || "standard";
        const billingPeriod = PERIOD_MAP[priceId] || "monthly";

        // Try to look up user by email, but don't fail if not found
        // (users may be on app-specific InsForge instances, not Pentridge Labs)
        let userId = null;
        try {
          const { data: profiles } = await insforge.database
            .from("auth_users_view")
            .select("id")
            .eq("email", customerEmail)
            .limit(1);
          userId = profiles?.[0]?.id || null;
        } catch {
          // User not on Pentridge Labs instance — that's fine
        }

        await insforge.database.from("pentridge_subscriptions").upsert({
          user_id: userId,
          email: customerEmail.toLowerCase(),
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          tier,
          billing_period: billingPeriod,
          status: "active",
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "stripe_subscription_id" });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const status = subscription.status === "active" ? "active"
          : subscription.status === "past_due" ? "past_due"
          : subscription.status === "trialing" ? "trialing"
          : "canceled";

        const productId = subscription.items.data[0]?.price?.product;
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = TIER_MAP[productId] || "standard";
        const billingPeriod = PERIOD_MAP[priceId] || "monthly";

        await insforge.database
          .from("pentridge_subscriptions")
          .update({
            tier,
            billing_period: billingPeriod,
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await insforge.database
          .from("pentridge_subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
