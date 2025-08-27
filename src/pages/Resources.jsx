import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  ArrowRight,
  ExternalLink,
  Users,
  FileText,
  Video
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
            AI Resources & Guides
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access our comprehensive library of AI guides, case studies, and educational content 
            to accelerate your business automation journey.
          </p>
        </motion.div>

        {/* Main Resources Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* AI Business Automation Guide */}
          <Card className="h-full hover:shadow-xl transition-shadow border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-600 text-white">
                  <FileText className="w-3 h-3 mr-1" />
                  Complete Guide
                </Badge>
                <Badge variant="secondary">45 min read</Badge>
              </div>
              <CardTitle className="text-xl text-gray-900">Complete Guide to AI Business Automation</CardTitle>
              <CardDescription className="text-gray-600">
                Everything you need to know about implementing AI automation in your business
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="secondary" className="text-xs">AI Automation</Badge>
                <Badge variant="secondary" className="text-xs">Implementation</Badge>
                <Badge variant="secondary" className="text-xs">Strategy</Badge>
              </div>
              <Link to="/ai-business-automation-guide">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI Process Automation Examples Hub */}
          <Card className="h-full hover:shadow-xl transition-shadow border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-green-600 text-white">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Resource Hub
                </Badge>
                <Badge variant="secondary">50+ Examples</Badge>
              </div>
              <CardTitle className="text-xl text-gray-900">AI Process Automation Examples</CardTitle>
              <CardDescription className="text-gray-600">
                Browse use cases by function and industry to spark automation ideas
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="secondary" className="text-xs">Use Cases</Badge>
                <Badge variant="secondary" className="text-xs">Examples</Badge>
                <Badge variant="secondary" className="text-xs">Inspiration</Badge>
              </div>
              <Link to="/resources/ai-process-automation-examples">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explore Examples
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI ROI Calculator */}
          <Card className="h-full hover:shadow-xl transition-shadow border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-orange-600 text-white">
                  <FileText className="w-3 h-3 mr-1" />
                  Interactive Tool
                </Badge>
                <Badge variant="secondary">Free</Badge>
              </div>
              <CardTitle className="text-xl text-gray-900">AI ROI Calculator</CardTitle>
              <CardDescription className="text-gray-600">
                Calculate potential time and cost savings from AI automation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="secondary" className="text-xs">ROI</Badge>
                <Badge variant="secondary" className="text-xs">Calculator</Badge>
                <Badge variant="secondary" className="text-xs">Planning</Badge>
              </div>
              <Link to="/roi-calculator">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Calculate ROI
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join Pentridge Club Community
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Get access to exclusive templates, tools, scripts, and hands-on resources. 
                Connect with other business owners implementing AI automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              More Resources Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on additional guides, case studies, and educational content.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>• Implementation Case Studies</span>
              <span>• Video Tutorials</span>
              <span>• Best Practice Guides</span>
              <span>• Industry-Specific Content</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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
