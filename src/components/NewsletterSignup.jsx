import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!smsConsent) return;
    const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, phone, sms_consent: smsConsent }) });
    if (!response.ok) return;
    setSubmitted(true); setEmail(''); setPhone(''); setSmsConsent(false);
  };
  return <div className="max-w-md mx-auto text-center border-t border-white/10 pt-10 mt-14"><p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">Stay in the loop</p>{submitted?<p className="text-white/70 text-sm font-mono">You’re subscribed.</p>:<form onSubmit={handleSubmit} className="flex flex-col gap-3"><div className="flex flex-col sm:flex-row gap-2"><input type="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="your@email.com" required className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"/><input type="tel" value={phone} onChange={event=>setPhone(event.target.value)} placeholder="(555) 555-5555" required className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"/></div><label className="flex items-start gap-2 text-left cursor-pointer"><input type="checkbox" checked={smsConsent} onChange={event=>setSmsConsent(event.target.checked)} required className="mt-0.5 accent-purple-500 shrink-0"/><span className="font-mono text-[11px] leading-relaxed text-white/40">By checking this box, you agree to receive SMS messages from Pentridge Media at the number provided. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See our <a href="/privacy" className="underline hover:text-white/60">Privacy Policy</a> and <a href="/terms" className="underline hover:text-white/60">Terms</a>.</span></label><button type="submit" className="btn-primary px-6 py-3 text-xs whitespace-nowrap mx-auto">Subscribe</button></form>}</div>;
};

export default NewsletterSignup;
