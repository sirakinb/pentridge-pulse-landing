import React from 'react';

const caseStudyUrls = {
  law: 'https://pentridge-white-law-case-study-kped7suow-app-build-26.vercel.app',
  property: 'https://pentridge-jackson-rental-homes-case-study-exgi6st95.vercel.app',
};

const CaseStudyPage = ({ type }) => (
  <main className="bg-black min-h-screen pt-20">
    <iframe
      src={caseStudyUrls[type]}
      title={type === 'law' ? 'Michigan law firm case study' : 'Property management case study'}
      className="block w-full border-0"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    />
  </main>
);

export default CaseStudyPage;
