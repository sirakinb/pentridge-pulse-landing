import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8">About Pentridge Media</h1>
        <div className="space-y-6 text-lg">
          <p>
            Pentridge Manor has come a long way since its inception in 2021 as a space for capturing stunning photos and videos. It has become a popular destination for photographers, videographers, artists and other creatives looking for a unique and instagram-youtube worthy location to shoot their content. From fashion and music videos to product launches, film productions, and social media campaigns, "the manor" has played host to different functions.
          </p>
          <p>
            With the evolution of technology and market demands, we recognized a way to provide more value to content creators who occupied our space. As a result, Pentridge Media was born. Pentridge Media emerged as an extension of our creative ecosystem, blending the physical space of content creation with digital media services for editing and content management. However, it didn't stop there. With the rise of ChatGPT and Generative AI, we recognized their potential in transforming the digital landscape. Therefore, we evolved further.
          </p>
          <p>
            Today, Pentridge Media offers a range of solutions tailored to the needs of modern businesses and creators. From cutting-edge AI and automation services to digital strategy, or simply renting out our space, we are committed to helping you achieve your goals. Join us on this exhilarating journey of content evolution and AI-driven automation, and let us help you bring your vision to life. Pentridge Media, where creativity meets technology.
          </p>
        </div>
        <div className="mt-12">
          <Link to="/" className="text-gold hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;