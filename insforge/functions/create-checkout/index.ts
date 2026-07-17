import { createClient } from 'npm:@insforge/sdk';

const PRICE_IDS: Record<string, Record<string, string>> = {
  standard: {
    monthly: "price_1TUfVjCHgVkAnNskVeyDAULc",
    annual: "price_1TUfVnCHgVkAnNskGrwMhq2G",
  },
  pro: {
    monthly: "price_1TUfVoCHgVkAnNskWdNv2Zz1",
    annual: "price_1TUfVqCHgVkAnNskGEp6FyWc",
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
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
    const { tier, period } = await req.json();

    if (!PRICE_IDS[tier]?.[period]) {
      return new Response(JSON.stringify({ error: "Invalid tier or period" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const priceId = PRICE_IDS[tier][period];
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")!;

    // If user is authenticated, pre-fill their email
    let customerEmail: string | undefined;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const userToken = authHeader.replace("Bearer ", "");
      const insforge = createClient({
        baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
        edgeFunctionToken: userToken,
      });
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (userData?.user?.email) {
        customerEmail = userData.user.email;
      }
    }

    const params = new URLSearchParams();
    params.append("mode", "subscription");
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("allow_promotion_codes", "true");
    params.append("success_url", "https://pentridgemedia.com/labs?checkout=success");
    params.append("cancel_url", "https://pentridgemedia.com/labs?checkout=canceled");
    if (customerEmail) {
      params.append("customer_email", customerEmail);
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (session.error) {
      return new Response(JSON.stringify({ error: session.error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
