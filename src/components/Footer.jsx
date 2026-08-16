import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const columns = [
  { heading: 'Resources', links: [{ label: 'Use Cases', to: '/resources/ai-process-automation-examples' }, { label: 'ROI Calculator', to: '/roi-calculator' }, { label: 'AI Guide', to: '/ai-business-automation-guide' }, { label: 'Blog', to: '/blog' }, { label: 'All Resources', to: '/resources' }] },
  { heading: 'Company', links: [{ label: 'About', to: '/about' }, { label: 'Content House', to: '/content-house' }, { label: 'Contact', to: '/contact' }, { label: 'Terms', to: '/terms' }, { label: 'Privacy', to: '/privacy' }] },
];

const Footer = () => {
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
  return <footer className="bg-black text-white border-t border-white/10"><div className="max-w-7xl mx-auto px-6 py-14"><div className="grid grid-cols-1 md:grid-cols-[1.5fr_repeat(2,1fr)] gap-10 mb-12"><div><div className="flex items-center gap-3 mb-4"><span className="font-mono text-xl tracking-wider">[P]</span><span className="font-mono text-sm text-white/50 tracking-wider uppercase">Pentridge</span></div><p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">We get your company AI-ready and deploy AI agents into your business operations.</p><div className="flex items-center gap-4"><a href="https://www.instagram.com/pentridgemedia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Instagram size={18}/></a><a href="https://www.youtube.com/@sirakinb" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Youtube size={18}/></a></div></div>{columns.map(column=><div key={column.heading}><p className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 mb-4">{column.heading}</p><ul className="space-y-3">{column.links.map(link=><li key={link.label}><Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors" onClick={scrollToTop}>{link.label}</Link></li>)}</ul></div>)}</div><div className="border-t border-white/10 pt-10 mb-10 max-w-2xl"><p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">Stay in the loop</p>{submitted?<p className="text-white/70 text-sm font-mono">You’re subscribed.</p>:<form onSubmit={handleSubmit} className="flex flex-col gap-3"><div className="flex flex-col sm:flex-row gap-2"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(555) 555-5555" required className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"/></div><label className="flex items-start gap-2 text-left cursor-pointer"><input type="checkbox" checked={smsConsent} onChange={e=>setSmsConsent(e.target.checked)} required className="mt-0.5 accent-purple-500 shrink-0"/><span className="font-mono text-[11px] leading-relaxed text-white/40">By checking this box, you agree to receive SMS messages from Pentridge Media at the number provided. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See our <Link to="/privacy" className="underline hover:text-white/60">Privacy Policy</Link> and <Link to="/terms" className="underline hover:text-white/60">Terms</Link>.</span></label><button type="submit" className="btn-primary px-6 py-3 text-xs whitespace-nowrap w-fit">Subscribe</button></form>}</div><div className="border-t border-white/10 pt-6"><p className="text-xs text-white/30 font-mono">&copy; 2026 Pentridge. All rights reserved.</p></div></div></footer>;
};

export default Footer;
