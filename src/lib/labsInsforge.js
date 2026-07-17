import { createClient } from '@insforge/sdk';

export const labsInsforge = createClient({
  baseUrl: import.meta.env.VITE_LABS_INSFORGE_URL,
  anonKey: import.meta.env.VITE_LABS_INSFORGE_ANON_KEY,
});
