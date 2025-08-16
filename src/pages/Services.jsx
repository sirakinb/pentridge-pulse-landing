import React from 'react';
import ServicesSection from '../components/ServicesSection';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageSquare, FileText, Code } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <Navbar />
      
      {/* Hero Section */}
              <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
                Our AI-Powered Services
              </h1>
              <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-3xl mx-auto px-4">
                Transform your business with cutting-edge AI solutions designed to boost efficiency, 
                enhance customer experience, and drive growth.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            
            {/* AI Voice Agents */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-purple-400/30 backdrop-blur-xl border border-purple-300/50 text-white hover:bg-purple-400/40 transition-all duration-300" style={{backgroundColor: 'rgba(168, 85, 247, 0.3)', borderColor: 'rgba(196, 181, 253, 0.5)'}}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">AI Voice Agents</CardTitle>
                  <CardDescription className="text-purple-200">
                    24/7 AI phone answering service
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-purple-100 mb-6">
                    Never miss a call again with our intelligent AI voice agents that can handle 
                    customer inquiries, schedule appointments, and provide support around the clock.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                    onClick={() => window.location.href = '/services/ai-voice-agents'}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content House */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full bg-purple-400/30 backdrop-blur-xl border border-purple-300/50 text-white hover:bg-purple-400/40 transition-all duration-300" style={{backgroundColor: 'rgba(168, 85, 247, 0.3)', borderColor: 'rgba(196, 181, 253, 0.5)'}}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Content House</CardTitle>
                  <CardDescription className="text-blue-200">
                    AI-powered content creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-blue-100 mb-6">
                    Scale your content production with AI-driven tools that create engaging, 
                    SEO-optimized content for blogs, social media, and marketing campaigns.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    onClick={() => window.location.href = '/content-house'}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Business Automation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="h-full bg-purple-400/30 backdrop-blur-xl border border-purple-300/50 text-white hover:bg-purple-400/40 transition-all duration-300" style={{backgroundColor: 'rgba(168, 85, 247, 0.3)', borderColor: 'rgba(196, 181, 253, 0.5)'}}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">AI Business Automation</CardTitle>
                  <CardDescription className="text-green-200">
                    Transform operations with intelligent automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-green-100 mb-6">
                    Streamline your business processes with AI automation solutions that reduce costs, 
                    improve efficiency, and free up your team for high-value tasks.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-green-600"
                    onClick={() => window.location.href = '/ai-business-automation-guide'}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-purple-200 mb-8 px-4">
              Let's discuss how our AI solutions can help you achieve your business goals. 
              Schedule a consultation to explore the possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => window.location.href = '/ai-business-automation-guide'}
              >
                Read Our AI Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
