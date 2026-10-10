import { createClient } from 'npm:@insforge/sdk';

// Records an outbound click from the Pentridge links page (links.pentridgemedia.com).
// Called via navigator.sendBeacon with a text/plain body containing JSON, so it
// never triggers a CORS preflight and survives the page navigation.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, 2048) : null;
}

export default async function (req: Request): Promise<Response> {
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
    // Beacon bodies arrive as text; parse leniently.
    const raw = await req.text();
    let body: Record<string, any> = {};
    try { body = JSON.parse(raw || "{}"); } catch { body = {}; }

    const linkId = str(body.link_id);
    if (!linkId) {
      return new Response(JSON.stringify({ error: "link_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      anonKey: Deno.env.get("ANON_KEY")!,
    });

    await insforge.database.from("link_clicks").insert([{
      link_id: linkId,
      link_label: str(body.link_label),
      destination_url: str(body.destination_url),
      referrer: str(body.referrer),
      utm_source: str(body.utm_source),
      utm_medium: str(body.utm_medium),
      utm_campaign: str(body.utm_campaign),
      user_agent: str(req.headers.get("user-agent")),
    }]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("link-click error:", err);
    // Never surface an error to the beacon — the redirect already happened.
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
