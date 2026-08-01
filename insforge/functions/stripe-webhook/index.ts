import { createAdminClient } from 'npm:@insforge/sdk';

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

// A rejected write must not look like success. These calls previously ignored
// their result, so an RLS denial still returned 200 to Stripe and the event was
// never retried. Throwing here surfaces it and lets Stripe redeliver.
function assertWritten(label: string, res: { error?: unknown } | null | undefined) {
  const err = res?.error;
  if (err) {
    const msg = (err as { message?: string })?.message ?? String(err);
    throw new Error(`${label} failed: ${msg}`);
  }
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

    // Must be the admin key: RLS on pentridge_subscriptions has no INSERT or
    // UPDATE policy, so under the anon key every write here was rejected with
    // "new row violates row-level security policy" — and because the results
    // were never checked, Stripe still got a 200 and the customer silently
    // never got provisioned.
    const insforge = createAdminClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      apiKey: Deno.env.get("API_KEY")!,
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

        assertWritten("checkout.session.completed upsert", await insforge.database.from("pentridge_subscriptions").upsert({
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
        }, { onConflict: "stripe_subscription_id" }));

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const status = subscription.status === "active" ? "active"
          : subscription.status === "past_due" ? "past_due"
          : subscription.status === "trialing" ? "trialing"
          : "canceled";

        const firstItem = subscription.items?.data?.[0];
        const productId = firstItem?.price?.product;
        const priceId = firstItem?.price?.id;
        const tier = TIER_MAP[productId] || "standard";
        const billingPeriod = PERIOD_MAP[priceId]
          || (firstItem?.price?.recurring?.interval === "year" ? "annual" : "monthly");

        // Newer Stripe API versions moved period fields from the subscription
        // object onto its items — read both so renewals never throw
        const periodStart = subscription.current_period_start ?? firstItem?.current_period_start;
        const periodEnd = subscription.current_period_end ?? firstItem?.current_period_end;

        const updates: Record<string, string> = {
          tier,
          billing_period: billingPeriod,
          status,
          updated_at: new Date().toISOString(),
        };
        if (periodStart) updates.current_period_start = new Date(periodStart * 1000).toISOString();
        if (periodEnd) updates.current_period_end = new Date(periodEnd * 1000).toISOString();

        assertWritten("customer.subscription.updated", await insforge.database
          .from("pentridge_subscriptions")
          .update(updates)
          .eq("stripe_subscription_id", subscriptionId));

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        assertWritten("customer.subscription.deleted", await insforge.database
          .from("pentridge_subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id));

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
