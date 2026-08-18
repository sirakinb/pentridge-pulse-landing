import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const navLinks = [
  { label: 'Products', to: '/labs' },
  { label: 'Content House', to: '/content-house' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateTestimonialNames = () => {
      const label = Array.from(document.querySelectorAll('p')).find((element) => element.textContent?.trim() === '10 / What They Say');
      const section = label?.closest('section');
      const cards = section?.querySelectorAll('.glass-card');
      const update = (card, name, company) => {
        const nameElement = card?.querySelector('[class~="text-white/90"]');
        if (!nameElement) return;
        nameElement.textContent = name;
        nameElement.style.color = '#ffffff';
        nameElement.style.fontSize = '0.875rem';
        nameElement.style.fontFamily = 'inherit';
        let companyElement = card.querySelector('[data-testimonial-company]');
        if (!companyElement) {
          companyElement = document.createElement('p');
          companyElement.dataset.testimonialCompany = 'true';
          nameElement.parentElement?.appendChild(companyElement);
        }
        companyElement.textContent = company;
        companyElement.className = 'font-mono text-xs text-purple-400/70 mt-1';
      };
      update(cards?.[2], 'Alexis Holstead', 'White Law PLLC');
      update(cards?.[3], 'D.O.', 'LogoSeed');
    };
    const timer = window.setTimeout(updateTestimonialNames, 100);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const handleServices = (e) => { if (location.pathname === '/') { e.preventDefault(); document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' }); } setIsOpen(false); };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5"><div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"><Link to="/" className="font-mono text-white text-lg tracking-wider" onClick={scrollToTop}>[P]</Link><div className="hidden md:flex items-center gap-8"><Link to="/#what-we-do" className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors" onClick={handleServices}>Services</Link>{navLinks.map(link=><Link key={link.label} to={link.to} className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors" onClick={scrollToTop}>{link.label}</Link>)}</div><button onClick={()=>setIsOpen(!isOpen)} className="md:hidden text-white/70 hover:text-white transition-colors">{isOpen?<X size={24}/>:<Menu size={24}/>}</button></div>{isOpen&&<div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5"><div className="max-w-7xl mx-auto px-6 py-6 space-y-4"><Link to="/#what-we-do" className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-2" onClick={handleServices}>Services</Link>{navLinks.map(link=><Link key={link.label} to={link.to} className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-2" onClick={()=>{setIsOpen(false);scrollToTop();}}>{link.label}</Link>)}</div></div>}</nav>;
};

export default Navbar;
