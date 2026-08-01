import { createClient } from '@insforge/sdk';

const baseUrl = import.meta.env.VITE_LABS_INSFORGE_URL;

// Pin edge-function calls to the API-gateway proxy path.
//
// By default the SDK derives a Deno subhosting URL (https://{appKey}.functions.insforge.app)
// and only falls back to `${baseUrl}/functions` when it sees a 404 from it. Deno Deploy Classic
// was sunset 2026-07-20, so that host now returns 404 DEPLOYMENT_NOT_FOUND *without any CORS
// headers*. In Node the SDK sees the 404 and falls back fine, but in the browser the response is
// CORS-blocked, so fetch rejects with an opaque TypeError — the SDK never observes a 404 and
// returns an error instead of falling back. That surfaced as "no subscription" plus dead
// checkout buttons on /labs/workspace.
export const labsInsforge = createClient({
  baseUrl,
  anonKey: import.meta.env.VITE_LABS_INSFORGE_ANON_KEY,
  functionsUrl: `${baseUrl}/functions`,
});
