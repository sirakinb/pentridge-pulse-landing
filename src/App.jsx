import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import ContentHouse from './pages/ContentHouse';
import AboutUs from './pages/AboutUs'; // Add this import
import Blog from './pages/Blog'; // Add this route
import Resources from './pages/Resources'; // Add this route
import AIVoiceAgents from './pages/AIVoiceAgents'; // Add this route
import AIBusinessAutomationGuide from './pages/AIBusinessAutomationGuide'; // Add this route
import Services from './pages/Services'; // Add services page
import Footer from './components/Footer'; // Add this import
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookingOptions from './components/BookingOptions';
import { AnimatePresence } from 'framer-motion';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SEOTest from './pages/SEOTest';
import SchemaMarkup from './components/SchemaMarkup';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <SchemaMarkup />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/content-house" element={<ContentHouse />} />
              <Route path="/about" element={<AboutUs />} /> {/* Add this route */}
              <Route path="/blog" element={<Blog />} /> {/* Add this route */}
              <Route path="/resources" element={<Resources />} /> {/* Add this route */}
              <Route path="/services/ai-voice-agents" element={<AIVoiceAgents />} /> {/* Add this route */}
              <Route path="/ai-business-automation-guide" element={<AIBusinessAutomationGuide />} /> {/* Add this route */}
              <Route path="/services" element={<Services />} /> {/* Add services route */}
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/seo-test" element={<SEOTest />} />
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
