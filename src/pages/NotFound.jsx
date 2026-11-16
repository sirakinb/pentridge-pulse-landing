import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => (
  <main className="bg-black text-white min-h-screen">
    <Navbar />
    <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">404</p>
      <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] mb-6">This page doesn’t exist.</h1>
      <p className="text-white/60 leading-relaxed mb-10">
        The link may be old or mistyped. Here are the pages most people are looking for.
      </p>
      <ul className="space-y-3">
        <li><Link className="text-purple-300 hover:text-white" to="/">Home</Link></li>
        <li><Link className="text-purple-300 hover:text-white" to="/services">Services</Link></li>
        <li><Link className="text-purple-300 hover:text-white" to="/resources">Resources and case studies</Link></li>
        <li><Link className="text-purple-300 hover:text-white" to="/contact">Contact</Link></li>
      </ul>
    </div>
  </main>
);

export default NotFound;
