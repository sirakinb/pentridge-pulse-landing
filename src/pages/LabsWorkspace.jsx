import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Loader2, Lock, LogOut, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { labsInsforge } from '../lib/labsInsforge';
import { useLabsAuth } from '../contexts/LabsAuthContext';

const products = [
  {
    name: 'AlignoPM',
    tagline: 'AI-Native Project Management',
    logo: '/aligno-icon.png',
    badge: null,
    url: 'https://aligno-project-management.vercel.app/landing',
    gradient: 'from-purple-500 to-violet-600',
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    name: 'AlignoCRM',
    tagline: 'AI-Native Pipeline & Workflow Automation',
    logo: '/aligno-icon.png',
    badge: 'CRM',
    url: 'https://crm-app-build-26.vercel.app/',
    gradient: 'from-violet-500 to-pink-600',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    name: 'Voiyce',
    tagline: 'Write at the Speed of Thought',
    logo: '/voiyce-icon.png',
    badge: null,
    url: 'https://voiyce.us/',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  {
    name: 'DropCard',
    tagline: 'Your Networking. Upgraded.',
    logo: '/dropcard-icon.png',
    badge: null,
    url: 'https://www.dropcard.app/',
    gradient: 'from-blue-500 to-purple-600',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
];

const appUrlWithEmail = (url, email) => {
  if (!email) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}email=${encodeURIComponent(email)}`;
};

const LabsWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, signOut } = useLabsAuth();

  const params = new URLSearchParams(location.search);
  const checkoutResult = params.get('checkout'); // success | canceled | null
  const requestedPlan = params.get('plan'); // standard | pro
  const requestedPeriod = params.get('period'); // monthly | annual

  const [sub, setSub] = useState(null); // null = loading
  const [subError, setSubError] = useState(false);
  const [isAnnual, setIsAnnual] = useState(requestedPeriod !== 'monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [waitingForActivation, setWaitingForActivation] = useState(checkoutResult === 'success');
  const autoCheckoutFired = useRef(false);
  const pollCount = useRef(0);

  const fetchSubscription = useCallback(async () => {
    const { data, error } = await labsInsforge.functions.invoke('check-subscription', { method: 'GET' });
    if (error || !data) {
      setSubError(true);
      setSub({ has_subscription: false });
      return { has_subscription: false };
    }
    setSubError(false);
    setSub(data);
    return data;
  }, []);

  // Redirect to sign-in when unauthenticated (preserve plan/checkout params)
  useEffect(() => {
    if (!loading && !user) {
      navigate(`/labs/signin${location.search}`, { replace: true });
    }
  }, [loading, user, navigate, location.search]);

  // Initial subscription fetch
  useEffect(() => {
    if (!loading && user) {
      fetchSubscription();
    }
  }, [loading, user, fetchSubscription]);

  // After Stripe success, poll until the webhook lands
  useEffect(() => {
    if (!waitingForActivation || !user) return;
    if (sub?.has_subscription) {
      setWaitingForActivation(false);
      return;
    }
    if (sub === null) return; // wait for first fetch
    if (pollCount.current >= 12) {
      setWaitingForActivation(false);
      return;
    }
    const t = setTimeout(async () => {
      pollCount.current += 1;
      await fetchSubscription();
    }, 2500);
    return () => clearTimeout(t);
  }, [waitingForActivation, user, sub, fetchSubscription]);

  const startCheckout = useCallback(async (tier, period) => {
    setCheckoutLoading(tier);
    const { data, error } = await labsInsforge.functions.invoke('create-checkout', {
      body: { tier, period },
    });
    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error('Checkout error:', error || data?.error);
      setCheckoutLoading(null);
    }
  }, []);

  // Auto-launch checkout when arriving from marketing pricing with a chosen plan
  useEffect(() => {
    if (
      !autoCheckoutFired.current &&
      user &&
      sub !== null &&
      !sub.has_subscription &&
      !subError &&
      !checkoutResult &&
      (requestedPlan === 'standard' || requestedPlan === 'pro')
    ) {
      autoCheckoutFired.current = true;
      startCheckout(requestedPlan, requestedPeriod === 'annual' ? 'annual' : 'monthly');
    }
  }, [user, sub, subError, checkoutResult, requestedPlan, requestedPeriod, startCheckout]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/labs');
  };

  const subscribed = sub?.has_subscription === true;
  const firstName = (user?.profile?.name || user?.email || '').split(/[\s@]/)[0];

  if (loading || !user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags
        title="Your Workspace | Pentridge Labs"
        description="Your Pentridge Labs workspace — launch AlignoPM, AlignoCRM, Voiyce, and DropCard."
        canonicalUrl="https://www.pentridgemedia.com/labs/workspace"
      />
      <Navbar />

      <section className="relative pt-28 pb-24 overflow-hidden min-h-screen">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
                Pentridge Labs Workspace
              </p>
              <h1 className="font-display text-3xl md:text-5xl text-[#fafafa]">
                {firstName ? `Welcome, ${firstName}.` : 'Welcome.'}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm text-white/40 font-mono">{user.email}</span>
                {subscribed && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-1 text-xs font-mono uppercase tracking-wider text-purple-300">
                    <Sparkles className="w-3 h-3" />
                    {sub.tier || 'Active'}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors font-mono mt-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>

          {/* Post-checkout activation banner */}
          {waitingForActivation && !subscribed && (
            <div className="mb-10 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-6 py-5 flex items-center gap-4">
              <Loader2 className="w-5 h-5 animate-spin text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Payment received — activating your subscription…</p>
                <p className="text-sm text-white/50">This usually takes a few seconds.</p>
              </div>
            </div>
          )}
          {checkoutResult === 'success' && !waitingForActivation && !subscribed && (
            <div className="mb-10 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-5">
              <p className="text-white font-medium">Payment received — activation is taking longer than usual.</p>
              <p className="text-sm text-white/50">Refresh this page in a minute. If it still shows locked, contact us and we'll sort it out.</p>
            </div>
          )}
          {subscribed && checkoutResult === 'success' && (
            <div className="mb-10 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-6 py-5 flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">You're in. Your entire suite is unlocked.</p>
                <p className="text-sm text-white/50">
                  Sign in to each app with <span className="text-purple-300">{user.email}</span> — that's how your subscription is recognized.
                </p>
              </div>
            </div>
          )}
          {subError && (
            <div className="mb-10 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5">
              <p className="text-white font-medium">Couldn't load your subscription status.</p>
              <button onClick={fetchSubscription} className="text-sm text-red-300 hover:text-red-200 underline mt-1">
                Try again
              </button>
            </div>
          )}

          {/* App grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            {products.map((product) => {
              const unlocked = subscribed;
              const Tile = unlocked ? 'a' : 'div';
              return (
                <Tile
                  key={product.name}
                  {...(unlocked
                    ? {
                        href: appUrlWithEmail(product.url, user.email),
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                  className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
                    unlocked
                      ? 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] cursor-pointer'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                  style={unlocked ? { boxShadow: `0 0 0px ${product.glow}` } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-4 ${unlocked ? '' : 'opacity-40'}`}>
                      <div className="relative flex-shrink-0">
                        <img src={product.logo} alt={product.name} className="h-10 w-auto object-contain" />
                        {product.badge && (
                          <span className="absolute -bottom-1 -right-2 text-[8px] font-bold text-white font-mono tracking-wider">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                        <p className="text-xs text-white/40 font-mono">{product.tagline}</p>
                      </div>
                    </div>
                    {unlocked ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-mono text-white/40 group-hover:text-white/80 transition-colors">
                        Open <ArrowUpRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <Lock className="w-4 h-4 text-white/20" />
                    )}
                  </div>
                </Tile>
              );
            })}
          </div>

          {/* Pricing (only when locked) */}
          {sub !== null && !subscribed && !waitingForActivation && (
            <div>
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-4xl text-[#fafafa] mb-3">
                  Unlock the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    entire suite
                  </span>
                </h2>
                <p className="text-white/50 text-sm max-w-md mx-auto">
                  One subscription unlocks all four tools. No per-tool fees.
                </p>
              </div>

              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
                  <button
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-white/10 text-white' : 'text-white/40'}`}
                    onClick={() => setIsAnnual(false)}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isAnnual ? 'bg-white/10 text-white' : 'text-white/40'}`}
                    onClick={() => setIsAnnual(true)}
                  >
                    Annual <span className="text-xs text-purple-400 ml-1">Save 20%</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Standard</p>
                  <div className="mb-5">
                    <span className="text-3xl font-bold text-white">{isAnnual ? '$16' : '$20'}</span>
                    <span className="text-white/40 ml-1">/month</span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {['Full access to AlignoPM & AlignoCRM', 'Voiyce — 10,000 words/month', 'DropCard — unlimited profiles', 'Community support'].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/50">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => startCheckout('standard', isAnnual ? 'annual' : 'monthly')}
                    disabled={checkoutLoading !== null}
                    className="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-6 py-3 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {checkoutLoading === 'standard' ? 'Redirecting…' : 'Choose Standard'}
                  </button>
                </div>

                <div
                  className="relative rounded-2xl border border-purple-500/30 bg-white/[0.03] p-7"
                  style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)' }}
                >
                  <span className="absolute -top-3 left-7 font-mono text-xs tracking-wider uppercase bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                    Popular
                  </span>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Pro</p>
                  <div className="mb-5">
                    <span className="text-3xl font-bold text-white">{isAnnual ? '$40' : '$50'}</span>
                    <span className="text-white/40 ml-1">/month</span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {['Everything in Standard', 'Voiyce — unlimited dictation', 'Priority support', 'Early access to new Labs products'].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/50">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => startCheckout('pro', isAnnual ? 'annual' : 'monthly')}
                    disabled={checkoutLoading !== null}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full px-6 py-3 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {checkoutLoading === 'pro' ? 'Redirecting…' : 'Choose Pro'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Subscribed helper note */}
          {subscribed && (
            <p className="text-center text-sm text-white/30">
              Sign in to each app with <span className="text-white/50">{user.email}</span> to unlock it. Questions?{' '}
              <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact us</a>.
            </p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default LabsWorkspace;
