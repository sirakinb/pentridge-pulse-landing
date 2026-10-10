import { createClient } from 'npm:@insforge/sdk';

// Returns aggregated click stats for the links page. Gated by STATS_KEY so the
// numbers aren't public. Reads via a SECURITY DEFINER db function (get_link_stats).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: Record<string, any>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export default async function (req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const key = typeof body.key === "string" ? body.key : "";
    const expected = Deno.env.get("STATS_KEY") || "";
    if (!expected || key !== expected) {
      return json({ error: "Unauthorized" }, 401);
    }

    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_BASE_URL")!,
      anonKey: Deno.env.get("ANON_KEY")!,
    });

    const { data, error } = await insforge.database.rpc("get_link_stats");
    if (error) throw error;

    return json({ ok: true, stats: data });
  } catch (err) {
    console.error("link-stats error:", err);
    return json({ error: "Failed to load stats" }, 400);
  }
}
