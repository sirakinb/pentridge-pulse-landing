import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import { 
  Download, 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  Calculator,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = {
    guides: [
      {
        id: 1,
        title: "Complete Guide to AI Voice Agents",
        description: "Everything you need to know about implementing AI voice technology in your business.",
        type: "PDF Guide",
        pages: "45 pages",
        downloadUrl: "#",
        image: "/proposal.png",
        featured: true,
        tags: ["AI", "Voice Technology", "Implementation"]
      },
      {
        id: 2,
        title: "Marketing Automation Playbook",
        description: "Step-by-step strategies for automating your marketing processes with AI.",
        type: "PDF Guide",
        pages: "32 pages",
        downloadUrl: "#",
        image: "/content automation.png",
        featured: false,
        tags: ["Marketing", "Automation", "Strategy"]
      },
      {
        id: 3,
        title: "Customer Service AI Implementation",
        description: "Best practices for integrating AI into your customer service operations.",
        type: "PDF Guide",
        pages: "28 pages",
        downloadUrl: "#",
        image: "/Social.png",
        featured: false,
        tags: ["Customer Service", "AI", "Best Practices"]
      }
    ],
    usecases: [
      {
        id: 11,
        title: "AI Process Automation Examples (50+ Use Cases)",
        description: "Browse use cases by function and industry to spark automation ideas.",
        type: "Resource Hub",
        accessUrl: "/resources/ai-process-automation-examples",
        image: "/proposal.png",
        tags: ["Use Cases", "Automation", "Small Business"]
      }
    ],
    templates: [
      {
        id: 4,
        title: "AI ROI Calculator",
        description: "Calculate the potential return on investment for AI voice agents in your business.",
        type: "Excel Template",
        downloadUrl: "#",
        image: "/productivity.png",
        tags: ["ROI", "Calculator", "Business Planning"]
      },
      {
        id: 5,
        title: "Customer Journey Mapping Template",
        description: "Map out your customer touchpoints and identify AI automation opportunities.",
        type: "PowerPoint Template",
        downloadUrl: "#",
        image: "/background.png",
        tags: ["Customer Journey", "Mapping", "Strategy"]
      },
      {
        id: 6,
        title: "AI Implementation Checklist",
        description: "Comprehensive checklist to ensure successful AI deployment in your organization.",
        type: "PDF Checklist",
        downloadUrl: "#",
        image: "/background2.png",
        tags: ["Implementation", "Checklist", "Planning"]
      }
    ],
    webinars: [
      {
        id: 7,
        title: "The Future of AI in Customer Service",
        description: "Join industry experts as they discuss emerging trends and technologies.",
        type: "Recorded Webinar",
        duration: "45 minutes",
        watchUrl: "#",
        image: "/Social.png",
        tags: ["Webinar", "Future Trends", "Expert Panel"]
      },
      {
        id: 8,
        title: "Building Your First AI Voice Agent",
        description: "Live demonstration of setting up and configuring AI voice technology.",
        type: "Live Demo",
        duration: "30 minutes",
        watchUrl: "#",
        image: "/content automation.png",
        tags: ["Demo", "Hands-on", "Tutorial"]
      }
    ],
    tools: [
      {
        id: 9,
        title: "AI Readiness Assessment",
        description: "Evaluate your organization's readiness for AI implementation.",
        type: "Online Assessment",
        estimatedTime: "10 minutes",
        accessUrl: "#",
        image: "/productivity.png",
        tags: ["Assessment", "Readiness", "Evaluation"]
      },
      {
        id: 10,
        title: "Voice Agent Script Generator",
        description: "Generate custom conversation scripts for your AI voice agents.",
        type: "Online Tool",
        estimatedTime: "5 minutes",
        accessUrl: "#",
        image: "/proposal.png",
        tags: ["Script Generator", "Voice Agents", "Customization"]
      }
    ]
  };

  const allResources = [
    ...resources.guides,
    ...resources.usecases,
    ...resources.templates,
    ...resources.webinars,
    ...resources.tools
  ];

  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredResource = resources.guides.find(guide => guide.featured);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'PDF Guide':
      case 'PDF Checklist':
        return <FileText className="h-5 w-5" />;
      case 'Excel Template':
        return <Calculator className="h-5 w-5" />;
      case 'PowerPoint Template':
        return <BookOpen className="h-5 w-5" />;
      case 'Recorded Webinar':
      case 'Live Demo':
        return <Video className="h-5 w-5" />;
      case 'Online Assessment':
      case 'Online Tool':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const ResourceCard = ({ resource, showFeatured = false }) => (
    <Card className={`h-full hover:shadow-lg transition-shadow cursor-pointer group ${showFeatured ? 'border-purple-200' : ''}`}>
      <div className="relative overflow-hidden">
        <img 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showFeatured && (
          <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
          {getResourceIcon(resource.type)}
          <span className="ml-1">{resource.type}</span>
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
          {resource.title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {resource.pages && <span>{resource.pages}</span>}
            {resource.duration && <span>{resource.duration}</span>}
            {resource.estimatedTime && <span>{resource.estimatedTime}</span>}
          </div>
          <Button 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              if (resource.downloadUrl) window.open(resource.downloadUrl, '_blank');
              if (resource.watchUrl) window.open(resource.watchUrl, '_blank');
              if (resource.accessUrl) {
                if (resource.accessUrl.startsWith('/')) {
                  window.location.href = resource.accessUrl;
                } else {
                  window.open(resource.accessUrl, '_blank');
                }
              }
            }}
          >
            {resource.downloadUrl && (
              <>
                <Download className="w-3 h-3 mr-1" />
                Download
              </>
            )}
            {resource.watchUrl && (
              <>
                <Video className="w-3 h-3 mr-1" />
                Watch
              </>
            )}
            {resource.accessUrl && (
              <>
                <ExternalLink className="w-3 h-3 mr-1" />
                Open
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
            Access our comprehensive library of guides, templates, tools, and webinars to accelerate 
            your AI implementation and business growth.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Featured Resource */}
        {featuredResource && !searchTerm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resource</h2>
            <div className="max-w-2xl mx-auto">
              <ResourceCard resource={featuredResource} showFeatured={true} />
            </div>
          </motion.div>
        )}

        {/* Resources Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {searchTerm ? (
            // Search Results
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results ({filteredResources.length})
              </h2>
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No resources found matching your search.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <ResourceCard resource={resource} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Tabbed Resources
            <Tabs defaultValue="guides" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="usecases">Use Cases</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="webinars">Webinars</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="guides">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.guides.filter(guide => !guide.featured).map((guide, index) => (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={guide} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="usecases">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.usecases.map((hub, index) => (
                    <motion.div
                      key={hub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={hub} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={template} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="webinars">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.webinars.map((webinar, index) => (
                    <motion.div
                      key={webinar.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={webinar} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tools">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={tool} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
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
