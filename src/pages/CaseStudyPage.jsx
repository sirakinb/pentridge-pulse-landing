import React from 'react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';

const caseStudies = {
  law: {
    url: 'https://pentridge-white-law-case-study-kped7suow-app-build-26.vercel.app',
    title: 'Michigan Law Firm Intake and Workflow Automation | Pentridge',
    description: 'How Pentridge helped a Michigan-based full-service law firm structure intake, qualification, follow-up, booking, and the handoff from lead to client.',
    frameTitle: 'Michigan law firm case study',
  },
  property: {
    url: 'https://pentridge-jackson-rental-homes-case-study-exgi6st95.vercel.app',
    title: 'Property Management Voice Agent and Operations | Pentridge',
    description: 'How Pentridge helped a Philadelphia-based property management company answer inbound calls, qualify rental interest, and connect leasing operations.',
    frameTitle: 'Property management case study',
  },
};

const CaseStudyPage = ({ type }) => {
  const item = caseStudies[type];
  if (!item) return null;

  return (
    <main className="bg-black min-h-screen">
      <MetaTags title={item.title} description={item.description} />
      <Navbar />
      <iframe
        src={item.url}
        title={item.frameTitle}
        className="block w-full border-0 pt-20"
        style={{ minHeight: '100vh' }}
      />
    </main>
  );
};

export default CaseStudyPage;
