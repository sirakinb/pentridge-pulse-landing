import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import ContentHouse from './pages/ContentHouse';
import AboutUs from './pages/AboutUs'; // Add this import
import Footer from './components/Footer'; // Add this import
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookingOptions from './components/BookingOptions';
import { AnimatePresence } from 'framer-motion';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/content-house" element={<ContentHouse />} />
              <Route path="/about" element={<AboutUs />} /> {/* Add this route */}
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* ... other routes ... */}
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
