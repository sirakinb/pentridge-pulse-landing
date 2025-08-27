import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
            <BookOpen className="w-3 h-3 mr-1" />
            Free Resources
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Resources Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access our comprehensive library of AI automation resources to accelerate 
            your business growth and implementation.
          </p>
        </motion.div>

        {/* Main Resource Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-3xl text-gray-900">AI Process Automation Examples (50+ Use Cases)</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Browse use cases by function and industry to spark automation ideas for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <Badge className="bg-purple-600 text-white px-3 py-1 text-sm">
                  Resource Hub
                </Badge>
                <Badge variant="secondary" className="ml-2 px-3 py-1 text-sm">
                  Use Cases
                </Badge>
                <Badge variant="secondary" className="ml-2 px-3 py-1 text-sm">
                  Automation
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Discover 50+ practical AI automation examples organized by industry and function. 
                From marketing automation to customer service, sales processes to operations - 
                find inspiration for your next automation project.
              </p>

              <Link to="/resources/ai-process-automation-examples">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explore Use Cases
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources Coming Soon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              More Resources Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on additional guides, templates, and tools to help you implement AI automation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>• Implementation Guides</span>
              <span>• ROI Calculators</span>
              <span>• Best Practice Templates</span>
              <span>• Video Tutorials</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need Personalized Guidance?
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Our AI experts are ready to help you implement the right solutions for your business. 
                Schedule a free consultation to get started.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
              >
                Schedule Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
