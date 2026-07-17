import { createClient } from 'npm:@insforge/sdk';

const TIER_MAP: Record<string, string> = {
  "prod_UTclIQnYOzE14k": "standard",
  "prod_UTclc7aMJNPWJo": "pro",
};

const PERIOD_MAP: Record<string, string> = {
  "price_1TUfVjCHgVkAnNskVeyDAULc": "monthly",
  "price_1TUfVnCHgVkAnNskGrwMhq2G": "annual",
  "price_1TUfVoCHgVkAnNskWdNv2Zz1": "monthly",
  "price_1TUfVqCHgVkAnNskGEp6FyWc": "annual",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
};

const SIGNATURE_TOLERANCE_SECONDS = 300;

async function verifyStripeSignature(payload: string, sigHeader: string | null, secret: string): Promise<boolean> {
  if (!sigHeader) return false;

  let timestamp = "";
  const signatures: string[] = [];
  for (const part of sigHeader.split(",")) {
    const [key, value] = part.split("=");
    if (key === "t") timestamp = value;
    if (key === "v1") signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${payload}`));
  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signatures.some((sig) => {
    if (sig.length !== expected.length) return false;
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) {
      mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    }
    return mismatch === 0;
  });
}

export default async function(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.text();

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set — rejecting webhook");
      return new Response(JSON.stringify({ error: "Webhook not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validSignature = await verifyStripeSignature(
      body,
      req.headers.get("Stripe-Signature"),
      webhookSecret,
    );
    if (!validSignature) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

        // Fetch line items from checkout session (works with restricted keys)
        const lineItemsRes = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items`,
          { headers: { Authorization: `Bearer ${stripeKey}` } },
        );
        const lineItems = await lineItemsRes.json();
        const firstItem = lineItems.data?.[0];

        const productId = firstItem?.price?.product;
        const priceId = firstItem?.price?.id;
        const interval = firstItem?.price?.recurring?.interval;
        const tier = TIER_MAP[productId] || "standard";
        const billingPeriod = interval === "year" ? "annual" : "monthly";

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

        const now = new Date();
        const periodEnd = new Date(now);
        if (interval === "year") {
          periodEnd.setFullYear(periodEnd.getFullYear() + 1);
        } else {
          periodEnd.setMonth(periodEnd.getMonth() + 1);
        }

        await insforge.database.from("pentridge_subscriptions").upsert({
          user_id: userId,
          email: customerEmail.toLowerCase(),
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          tier,
          billing_period: billingPeriod,
          status: "active",
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
          updated_at: now.toISOString(),
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
