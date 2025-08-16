import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from '../components/Navbar';
import { Calendar, Clock, User, Search, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog posts - in a real app, these would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to AI Business Automation",
      excerpt: "Transform your business operations with AI automation. Learn implementation strategies, calculate ROI, and discover the tools that will revolutionize your workflow in 2025.",
      author: "Pentridge Media Team",
      date: "2025-01-15",
      readTime: "25 min read",
      category: "AI Technology",
      image: "/background.png",
      featured: true,
      tags: ["AI", "Business Automation", "ROI", "Implementation", "Productivity"],
      url: "/ai-business-automation-guide"
    },
    {
      id: 2,
      title: "The Future of AI Voice Agents in Customer Service",
      excerpt: "Discover how AI voice technology is revolutionizing customer service and what it means for your business.",
      author: "Sarah Johnson",
      date: "2024-02-15",
      readTime: "5 min read",
      category: "AI Technology",
      image: "/background.png",
      featured: false,
      tags: ["AI", "Customer Service", "Voice Technology"]
    },
    {
      id: 3,
      title: "10 Ways AI Can Boost Your Marketing ROI",
      excerpt: "Learn proven strategies to leverage AI for better marketing outcomes and higher returns on investment.",
      author: "Michael Chen",
      date: "2024-02-10",
      readTime: "7 min read",
      category: "Marketing",
      image: "/background2.png",
      featured: false,
      tags: ["Marketing", "ROI", "AI Strategy"]
    },
    {
      id: 4,
      title: "Content Automation: A Complete Guide for 2024",
      excerpt: "Everything you need to know about automating your content creation process with AI tools.",
      author: "Emily Rodriguez",
      date: "2024-02-08",
      readTime: "6 min read",
      category: "Content Marketing",
      image: "/content automation.png",
      featured: false,
      tags: ["Content", "Automation", "Productivity"]
    },
    {
      id: 5,
      title: "Building Trust with AI-Powered Customer Interactions",
      excerpt: "How to implement AI solutions while maintaining authentic customer relationships.",
      author: "David Park",
      date: "2024-02-05",
      readTime: "4 min read",
      category: "Customer Experience",
      image: "/Social.png",
      featured: false,
      tags: ["Trust", "Customer Experience", "AI Ethics"]
    },
    {
      id: 6,
      title: "The ROI of AI Voice Agents: Real Business Results",
      excerpt: "Case studies and data showing the measurable impact of AI voice agents on business growth.",
      author: "Jennifer Liu",
      date: "2024-02-01",
      readTime: "8 min read",
      category: "Case Studies",
      image: "/productivity.png",
      featured: false,
      tags: ["ROI", "Case Studies", "Business Growth"]
    }
  ];

  const categories = [
    "All",
    "AI Technology",
    "Business Automation",
    "Marketing",
    "Content Marketing",
    "Customer Experience",
    "Case Studies"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            <TrendingUp className="w-3 h-3 mr-1" />
            Latest Insights
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI & Business Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay ahead of the curve with insights on AI technology, marketing automation, 
            and business growth strategies from industry experts.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchTerm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
                    {featuredPost.category}
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl mb-4 text-white">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-purple-100 mb-6">
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-purple-200 text-sm mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-purple-600"
                    onClick={() => window.location.href = featuredPost.url || '#'}
                  >
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                                        <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-purple-600 hover:text-purple-700"
                    onClick={() => {
                      if (post.id === 1) {
                        window.location.href = '/ai-business-automation-guide';
                      } else {
                        // Handle other blog posts
                        console.log('Navigate to:', post.title);
                      }
                    }}
                  >
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with AI Insights
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Get the latest articles on AI technology, business automation, and growth strategies 
                delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-white text-gray-900"
                />
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
