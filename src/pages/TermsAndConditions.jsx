import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FuturisticBackLink from '../components/FuturisticBackLink';
import { scrollToTop } from '../utils/scrollToTop';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

const TermsAndConditions = () => {
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

  const metaConfig = getMetaConfig('terms');

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
          TERMS OF SERVICE
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg space-y-6"
        >
          <p>
            Welcome to Pentridge! These terms and conditions outline the rules and regulations for the use of Pentridge's website, services, and SMS communication.
          </p>
          <p>
            Upon opting in to SMS messages from Pentridge, users will receive notifications and promotional messages. The messages will include appointment confirmations, reminders, and other relevant updates related to our services. Users can expect to receive these messages after they have booked an appointment with Pentridge and provided their consent through our opt-in form.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cancellation of SMS Service</h2>
          <p>
            You can cancel the SMS service at any time by texting "STOP." Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Help with Messaging Program</h2>
          <p>
            If you experience issues with the messaging program, reply with the keyword HELP for more assistance, or reach out directly to <a href="mailto:aki.b@pentridgemedia.com" className="text-violet-300 underline hover:text-violet-200">aki.b@pentridgemedia.com</a>.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Carrier Responsibility</h2>
          <p>
            Carriers are not liable for delayed or undelivered messages.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Message and Data Rates</h2>
          <p>
            Message and data rates may apply for messages sent to you from us and to us from you. You may receive messages daily, weekly, or as needed, to confirm appointments, provide reminders, or share relevant updates. For questions about your text plan or data plan, contact your wireless provider.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy Inquiries</h2>
          <p>
            For privacy-related inquiries, please refer to our <a href="/privacy" className="text-violet-300 underline hover:text-violet-200">Privacy Policy</a>.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Thought Social and Apple Standard EULA</h2>
          <p>
            Your use of Thought Social on Apple platforms is also subject to Apple's Standard Licensed Application End User License Agreement, which is incorporated into these Terms of Service by reference and is available on <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer" className="text-violet-300 underline hover:text-violet-200">Apple's website</a>.
          </p>
          <p className="mt-8">
            By accessing this website and using our services, you accept these terms and conditions in full. Do not continue to use Pentridge's website and services if you do not accept all of the terms and conditions stated on this page.
          </p>
          
          {/* Add the rest of the terms and conditions content here */}
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <p>
            If you have any questions about these terms and conditions, please contact us at:
          </p>
          <p>
            Pentridge<br />
            Akinyemi Bajulaiye<br />
            1034 S. 53rd Street, Philadelphia, PA 19143<br />
            Email: <a href="mailto:aki.b@pentridgemedia.com" className="text-violet-300 underline hover:text-violet-200">aki.b@pentridgemedia.com</a><br />
            Support requests are accepted 24 hours a day, 7 days a week. Response times may vary.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TermsAndConditions;
