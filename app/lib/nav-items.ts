import React from 'react';
import { Home, Info, Phone } from 'lucide-react'; // Import your icons

export interface NavItem {
  to: string;
  title: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { to: '/', title: 'Home', icon: <Home size={18} /> },
  { to: '/about', title: 'About', icon: <Info size={18} /> },
  { to: '/contact', title: 'Contact', icon: <Phone size={18} /> },
];