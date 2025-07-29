import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FuturisticBackLink from '../components/FuturisticBackLink';
import { scrollToTop } from '../utils/scrollToTop';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

const PrivacyPolicy = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const metaConfig = getMetaConfig('privacy');

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <FuturisticBackLink />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8"
        >
          PRIVACY POLICY
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg space-y-6"
        >
          <p>
            Protecting your private information is our priority. This Statement of Privacy applies to Pentridge Media and governs data collection and usage. The Pentridge Media website is an information and service site. By using the Pentridge Media website, you consent to the data practices described in this statement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Collection of your Personal Information</h2>
          <p>
            Pentridge Media may collect personally identifiable information, such as your name, email address, phone number, and other relevant information related to our digital solutions services. Pentridge Media may also collect anonymous demographic information, which is not unique to you, such as your age, city, and state. We may gather additional personal or non-personal information in the future.
          </p>
          <p>
            Information about your computer hardware and software may be automatically collected by Pentridge Media. This information can include: your IP address, browser type, domain names, access times, and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Pentridge Media website.
          </p>
          <p>
            Pentridge Media encourages you to review the privacy statements of websites you choose to link to from Pentridge Media so that you can understand how those websites collect, use, and share your information. Pentridge Media is not responsible for the privacy statements or other content on websites outside of the Pentridge Media website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of your Personal Information</h2>
          <p>
            Pentridge Media collects and uses your personal information to operate its website(s) and deliver the services you have requested.
          </p>
          <p>
            Pentridge Media may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered.
          </p>
          <p>
            Pentridge Media does not sell, rent, or lease its customer lists to third parties. No information will be shared with third parties or affiliates for marketing/promotional purposes. Pentridge Media may send you email or postal mail, provide customer support, or arrange for deliveries.
          </p>
          <p>
            Pentridge Media may keep track of the websites and pages our users visit within Pentridge Media, in order to determine what Pentridge Media services are the most popular. This data is used to deliver customized content and advertising within Pentridge Media to customers whose behavior indicates that they are interested in a particular subject area.
          </p>
          <p>
            Pentridge Media will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on Pentridge Media or the site; (b) protect and defend the rights or property of Pentridge Media; and, (c) act under exigent circumstances to protect the personal safety of users of Pentridge Media, or the public.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Security of your Personal Information</h2>
          <p>
            Pentridge Media secures your personal information from unauthorized access, use, or disclosure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to this Statement</h2>
          <p>
            Pentridge Media will occasionally update this Statement of Privacy to reflect company and customer feedback. Pentridge Media encourages you to periodically review this Statement to be informed of how Pentridge Media is protecting your information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Pentridge Media<br />
            Akinyemi Bajulaiye<br />
            1034 S. 53rd Street,<br />
            Philadelphia, PA 19143<br />
            Email: info@pentridgemedia.com
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PrivacyPolicy;