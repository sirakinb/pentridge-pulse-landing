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
            <strong>Last updated: July 27, 2026.</strong> This Privacy Policy explains how Pentridge Media
            (“Pentridge,” “we,” “us,” or “our”) handles information when you use the Thought Social iOS
            application, the Pentridge website, or contact us for support.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our approach</h2>
          <p>
            Thought Social is not an advertising or data-broker product. We do not sell your personal
            information, rent it to marketers, or use it to track you across apps and websites. We collect
            and process only the information needed to provide the app, personalize your content workflow,
            manage subscriptions, protect the service, and respond to you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information Thought Social handles</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account information:</strong> your name, email address, and a unique account identifier
              when you create or use a Thought Social account.
            </li>
            <li>
              <strong>Content you provide:</strong> ideas, prompts, project topics, chat messages, links,
              profile preferences, scripts, captions, hashtags, calls to action, and other content you ask
              the app to organize or generate.
            </li>
            <li>
              <strong>Research information:</strong> search topics, public source links, and public TikTok
              captions, engagement counts, or transcripts used to provide the research features.
            </li>
            <li>
              <strong>Subscription information:</strong> product identifiers, purchase history, entitlement
              status, and a user identifier used to recognize whether Pro features are available. Apple
              processes your payment details; we do not receive your full card or bank information.
            </li>
            <li>
              <strong>Service and support information:</strong> information you include when contacting us,
              plus limited technical information such as IP address, browser type, access time, and security
              logs that may be generated when you use our website or online services.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Recordings, photos, and device permissions</h2>
          <p>
            Thought Social may request access to the camera, microphone, speech recognition, and photo
            library so you can record, caption, edit, and export videos. Your recorded video files remain on
            your device. Exports are saved to your Photos library only when you choose to export them. The
            app stores limited local file references and export metadata so the workflow can function, but
            it does not upload your personal video recordings to our servers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How we use information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authenticate your account and keep your projects separated from other users.</li>
            <li>Save your ideas, projects, preferences, and content history.</li>
            <li>Generate and personalize scripts, captions, research results, and other requested content.</li>
            <li>Provide recording, editing, export, subscription, and restore-purchase features.</li>
            <li>Operate, secure, troubleshoot, and improve the reliability of the service.</li>
            <li>Respond to support requests and comply with legal obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Service providers</h2>
          <p>
            We use service providers to operate specific parts of Thought Social. These currently include
            Auth0 for authentication, Convex for application data and backend functions, RevenueCat and
            Apple for subscription management, OpenAI for requested AI generation and processing, Tavily
            for web research, RapidAPI providers for public TikTok research, and Vercel for the Pentridge
            website. These providers process information only to deliver their services to us and are
            subject to their own privacy and security obligations.
          </p>
          <p>
            Content you submit to AI or research features may be sent to the applicable provider to complete
            your request. Do not submit sensitive personal information that is not needed for the content
            you are creating.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing and disclosure</h2>
          <p>
            We do not sell personal information or share it for cross-context behavioral advertising. We may
            share information with the service providers described above, when you direct us to do so, to
            protect users or the service, as part of a business transaction subject to appropriate
            safeguards, or when required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Retention and deletion</h2>
          <p>
            We retain account and app content while your account is active and as reasonably necessary to
            provide the service. We may retain limited purchase, fraud-prevention, security, backup, or legal
            records where required or permitted by law. Retention by Apple and other service providers is
            governed by their applicable policies.
          </p>
          <p>
            You can initiate deletion from <strong>Settings → Delete Account</strong> in Thought Social.
            This removes your stored Thought Social projects, ideas, messages, scripts, research references,
            preferences, recording references, and export records and signs you out. To request deletion of
            any remaining authentication or support record, email
            {' '}<a className="underline" href="mailto:info@pentridgemedia.com">info@pentridgemedia.com</a>.
            Deleting the app removes its local data but does not automatically cancel an Apple subscription;
            subscriptions can be managed in your Apple ID settings.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may decline camera, microphone, speech-recognition, or photo access in iOS Settings.</li>
            <li>You may edit or delete content within the app and initiate account deletion in Settings.</li>
            <li>You may manage or cancel subscriptions through your Apple ID subscription settings.</li>
            <li>You may contact us to ask about, correct, or request deletion of information associated with you.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children</h2>
          <p>
            Thought Social is not directed to children under 13, and we do not knowingly collect personal
            information from children under 13. Contact us if you believe a child has provided information
            to the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards designed to protect
            information. No internet service or storage system can be guaranteed to be completely secure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to this policy</h2>
          <p>
            We may update this policy as Thought Social or our legal obligations change. We will post the
            updated policy here and revise the date above. Material changes may also be communicated in the
            app or by another appropriate method.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact us</h2>
          <p>
            For privacy questions or requests, contact:
          </p>
          <p>
            Pentridge Media<br />
            Akinyemi Bajulaiye<br />
            1034 S. 53rd Street,<br />
            Philadelphia, PA 19143<br />
            Email: <a href="mailto:aki.b@pentridgemedia.com" className="text-violet-300 underline hover:text-violet-200">aki.b@pentridgemedia.com</a><br />
            Support requests are accepted 24 hours a day, 7 days a week. Response times may vary.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PrivacyPolicy;
