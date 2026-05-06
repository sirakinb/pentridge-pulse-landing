import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const products = [
  {
    name: 'AlignoPM',
    tagline: 'AI-Native Project Management',
    description:
      'Stop managing tasks. Start getting work done. AI breaks down your projects, plans your sprints, and keeps your team focused on what actually moves the needle.',
    features: [
      'AI task breakdown from plain English',
      'AI sprint planning from your backlog',
      'Built-in time tracking & focus mode',
      'Client & project hierarchy',
    ],
    logo: '/aligno-icon.png',
    badge: null,
    iconSize: 'h-10',
    url: 'https://aligno-project-management.vercel.app/landing',
    gradient: 'from-purple-500 to-violet-600',
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    name: 'AlignoCRM',
    tagline: 'AI-Native Pipeline & Workflow Automation',
    description:
      'Turn every lead into the next right follow-up. One focused place to manage pipeline, automate follow-up, and use AI without losing operator control.',
    features: [
      'Visual deal pipeline tracking',
      'Automated workflow triggers',
      'AI-assisted follow-up with approval gates',
      'Full audit trails on every automation',
    ],
    logo: '/aligno-icon.png',
    badge: 'CRM',
    iconSize: 'h-10',
    url: 'https://crm-app-build-26.vercel.app/',
    gradient: 'from-violet-500 to-pink-600',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    name: 'Voiyce',
    tagline: 'Write at the Speed of Thought',
    description:
      'Captures your voice and instantly turns it into perfectly formatted text in any app. No more typing. Accelerate your productivity.',
    features: [
      'Intelligent transcription with context',
      'Native macOS — works in any text field',
      '3x faster than typing',
      'Learns your vocabulary over time',
    ],
    logo: '/voiyce-icon.png',
    iconSize: 'h-10',
    url: 'https://voiyce.us/',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  {
    name: 'DropCard',
    tagline: 'Your Networking. Upgraded.',
    description:
      'Instantly exchange contact info, remember who you meet, and keep your network organized. AI-powered card scanning, selfie contact memory, and NFC tap-to-share.',
    features: [
      'AI-powered business card capture',
      'Selfie contact memory',
      'Multiple profiles for different contexts',
      'NFC physical card support',
    ],
    logo: '/dropcard-icon.png',
    iconSize: 'h-16',
    url: 'https://www.dropcard.app/',
    gradient: 'from-blue-500 to-purple-600',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
];

const audiences = [
  'Solopreneurs',
  'Coaches',
  'Consultants',
  'Creators',
  'Agencies',
];

const INSFORGE_URL = 'https://3nm75tby.us-east.insforge.app';

const Labs = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  const handleCheckout = async (tier) => {
    setCheckoutLoading(tier);
    try {
      const res = await fetch(`${INSFORGE_URL}/functions/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, period: isAnnual ? 'annual' : 'monthly' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags
        title="Pentridge Labs | Product Suite for Modern Businesses"
        description="Software tools built for solopreneurs, freelancers, coaches, consultants, creators, and agencies. AlignoPM, AlignoCRM, Voiyce, and DropCard."
        keywords="Pentridge Labs, AlignoPM, AlignoCRM, Voiyce, DropCard, project management, CRM, voice to text, digital business card, solopreneur tools"
        canonicalUrl="https://pentridgemedia.com/labs"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              Pentridge Labs
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-[#fafafa] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Software
              </span>{' '}
              that works
              <br />
              as hard as you do
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10">
              Tools built for the people building businesses. Manage projects, close deals, capture ideas, and grow your network — all from one product suite.
            </p>

            {/* Audience list */}
            <p className="font-mono text-sm tracking-wider text-white/30">
              {audiences.join(' · ')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              The Suite
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[#fafafa]">
              Four products. One mission.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                {...stagger}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: `0 0 0px ${product.glow}`,
                }}
                whileHover={{
                  boxShadow: `0 0 40px ${product.glow}`,
                }}
              >
                {/* Icon + Name */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <img src={product.logo} alt={product.name} className={`${product.iconSize} w-auto object-contain`} />
                      {product.badge && (
                        <span className="absolute -bottom-1 -right-2 text-[9px] font-bold text-white font-mono tracking-wider">{product.badge}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-white/40 font-mono">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform" />
                </div>

                {/* Description */}
                <p className="text-white/50 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/40"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient} flex-shrink-0`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Visit link */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <span className="text-sm font-mono text-white/30 group-hover:text-white/60 transition-colors duration-300 flex items-center gap-2">
                    Visit {product.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              Pricing
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[#fafafa] mb-4">
              One subscription.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Every tool.
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Access the entire Pentridge Labs suite with a single plan. No per-tool fees.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
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

          <p className="text-center text-white/30 text-sm font-mono mb-8">
            Already using Voiyce or DropCard? Upgrade to Labs for the full suite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Standard Plan */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8"
            >
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Standard</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{isAnnual ? '$16' : '$20'}</span>
                <span className="text-white/40 ml-1">/month</span>
                {isAnnual && <p className="text-xs text-purple-400 mt-1">Save 20% vs monthly</p>}
              </div>
              <p className="text-white/50 text-sm mb-8">Everything you need to run your business with the full Labs suite.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Full access to AlignoPM & AlignoCRM',
                  'Voiyce — 10,000 words/month',
                  'DropCard — unlimited profiles',
                  'AI task breakdown & sprint planning',
                  'Pipeline & deal tracking',
                  'Workflow automations',
                  'Time tracking & focus mode',
                  'Community support',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('standard')}
                disabled={checkoutLoading === 'standard'}
                className="block w-full text-center backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-6 py-3 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
              >
                {checkoutLoading === 'standard' ? 'Redirecting...' : 'Get Started'}
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl border border-purple-500/30 bg-white/[0.03] backdrop-blur-sm p-8"
              style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)' }}
            >
              <span className="absolute -top-3 left-8 font-mono text-xs tracking-wider uppercase bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                Popular
              </span>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Pro</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{isAnnual ? '$40' : '$50'}</span>
                <span className="text-white/40 ml-1">/month</span>
                {isAnnual && <p className="text-xs text-purple-400 mt-1">Save 20% vs monthly</p>}
              </div>
              <p className="text-white/50 text-sm mb-8">For operators who need unlimited power across every tool.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Standard',
                  'Voiyce — unlimited dictation',
                  'DropCard — NFC physical card included',
                  'AI-assisted CRM follow-up & approval gates',
                  'Client & team collaboration',
                  'Priority support',
                  'Early access to new Labs products',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('pro')}
                disabled={checkoutLoading === 'pro'}
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-wait"
              >
                {checkoutLoading === 'pro' ? 'Redirecting...' : 'Get Started'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Labs;
