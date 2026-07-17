import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import ContentHouse from './pages/ContentHouse';
import AboutUs from './pages/AboutUs'; // Add this import
import Blog from './pages/Blog'; // Add this route
import Resources from './pages/Resources'; // Add this route
import AIVoiceAgents from './pages/AIVoiceAgents'; // Add this route
import AIBusinessAutomationGuide from './pages/AIBusinessAutomationGuide'; // Add this route
import PropertyManagementVoiceAICaseStudy from './pages/PropertyManagementVoiceAICaseStudy';
import AIProcessAutomationExamples from './pages/AIProcessAutomationExamples';
import Services from './pages/Services'; // Add services page
import ROICalculator from './pages/ROICalculator'; // Add ROI Calculator page
import Footer from './components/Footer'; // Add this import
import { AnimatePresence } from 'framer-motion';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SEOTest from './pages/SEOTest';
import SchemaMarkup from './components/SchemaMarkup';
import WallOfLove from './pages/WallOfLove';
import LawFirmAutomationPage from './pages/LawFirmAutomationPage';
import Labs from './pages/Labs';
import LabsAuth from './pages/LabsAuth';
import LabsWorkspace from './pages/LabsWorkspace';
import { LabsAuthProvider } from './contexts/LabsAuthContext';

const LabsLayout = () => (
  <LabsAuthProvider>
    <Outlet />
  </LabsAuthProvider>
);

export const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/wall-of-love';

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkup />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/content-house" element={<ContentHouse />} />
            <Route path="/wall-of-love" element={<WallOfLove />} />
            <Route path="/about" element={<AboutUs />} /> {/* Add this route */}
            <Route path="/blog" element={<Blog />} /> {/* Add this route */}
            <Route path="/resources" element={<Resources />} /> {/* Add this route */}
            <Route path="/services/ai-voice-agents" element={<AIVoiceAgents />} /> {/* Add this route */}
            <Route path="/ai-business-automation-guide" element={<AIBusinessAutomationGuide />} /> {/* Add this route */}
            <Route path="/case-studies/property-management-voice-ai" element={<PropertyManagementVoiceAICaseStudy />} />
            <Route path="/resources/ai-process-automation-examples" element={<AIProcessAutomationExamples />} />
            <Route path="/services" element={<Services />} /> {/* Add services route */}
            <Route path="/law-firm-automation/" element={<LawFirmAutomationPage pageId="hub" />} />
            <Route path="/law-firm-client-intake-automation/" element={<LawFirmAutomationPage pageId="intake" />} />
            <Route path="/law-firm-ai-receptionist/" element={<LawFirmAutomationPage pageId="aiReceptionist" />} />
            <Route path="/law-firm-crm-automation/" element={<LawFirmAutomationPage pageId="crm" />} />
            <Route path="/law-firm-document-collection-scheduling-automation/" element={<LawFirmAutomationPage pageId="documents" />} />
            <Route path="/law-firm-automation-workflow-video/" element={<LawFirmAutomationPage pageId="video" />} />
            <Route path="/law-firm-automation-readiness-checklist/" element={<LawFirmAutomationPage pageId="checklist" />} />
            <Route path="/roi-calculator" element={<ROICalculator />} /> {/* Add ROI Calculator route */}
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route element={<LabsLayout />}>
              <Route path="/labs" element={<Labs />} />
              <Route path="/labs/signup" element={<LabsAuth initialMode="signup" />} />
              <Route path="/labs/signin" element={<LabsAuth initialMode="signin" />} />
              <Route path="/labs/workspace" element={<LabsWorkspace />} />
            </Route>
            <Route path="/seo-test" element={<SEOTest />} />
            {/* ... other routes ... */}
          </Routes>
        </AnimatePresence>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
