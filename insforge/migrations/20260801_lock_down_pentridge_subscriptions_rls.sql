-- Lock down RLS on pentridge_subscriptions (Pentridge-Labs project, appkey 3nm75tby)
--
-- Problem
-- -------
-- The table had two permissive SELECT policies:
--
--   select_own_subscription  SELECT  USING (auth.uid() = user_id)
--   select_by_email          SELECT  USING (true)          <-- leak
--
-- Because policies are OR'd, `select_by_email` made every row readable by
-- anyone holding the public anon key — which ships in the frontend JS bundle.
-- Verified: an unauthenticated request with only that public key returned every
-- subscriber's email and stripe_customer_id.
--
-- It existed because the edge functions needed cross-user lookups (claiming a
-- subscription bought before signup, the DropCard entitlement check). Those
-- functions have been moved to the project admin key (API_KEY), which is
-- BYPASSRLS, so the permissive policy is no longer load-bearing.
--
-- Deploy order matters: the edge functions were switched to the admin key and
-- deployed BEFORE this migration ran, so there was no window where the
-- subscription lookups were broken.
--
-- Note there are deliberately still no INSERT/UPDATE/DELETE policies. All
-- writes come from edge functions using the admin key. Clients must never be
-- able to write their own entitlement rows.

DROP POLICY IF EXISTS select_by_email ON public.pentridge_subscriptions;

-- Leaves exactly one policy: select_own_subscription USING (auth.uid() = user_id)
