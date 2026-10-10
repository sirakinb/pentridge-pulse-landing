import { createClient } from "https://esm.sh/@insforge/sdk@latest";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
      },
    });
  }

  try {
    const body = await req.text();
    const event = JSON.parse(body);

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_URL")!,
      serviceRoleKey: Deno.env.get("INSFORGE_SERVICE_ROLE_KEY")!,
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

        // Find InsForge user by email
        const { data: users } = await insforge.auth.admin.listUsers();
        const user = users?.users?.find((u: any) => u.email === customerEmail);

        if (!user) {
          console.error(`No InsForge user found for email: ${customerEmail}`);
          break;
        }

        await insforge.db.from("pentridge_subscriptions").upsert({
          user_id: user.id,
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

        await insforge.db
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
        await insforge.db
          .from("pentridge_subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
