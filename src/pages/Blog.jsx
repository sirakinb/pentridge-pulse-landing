import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to AI Business Automation",
      excerpt: "Transform your business operations with AI automation. Learn implementation strategies, calculate ROI, and discover the tools that will revolutionize your workflow.",
      author: "Pentridge Team",
      date: "2025-01-15",
      readTime: "25 min read",
      category: "AI Technology",
      featured: true,
      tags: ["AI", "Business Automation", "ROI", "Implementation"],
      url: "/ai-business-automation-guide"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Latest Insights</p>
          <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize mb-6">
            AI & Business Blog
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Stay ahead of the curve with insights on AI technology, automation,
            and business growth strategies.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div {...fadeUp} className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 h-4 w-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors font-mono text-sm"
            />
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && (
          <motion.div {...fadeUp} className="mb-16">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-6">Featured Article</p>
            <Link to={featuredPost.url} className="block group">
              <div className="glass-card-purple rounded-2xl p-8 md:p-12 relative overflow-hidden hover:border-purple-500/40 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-purple-400/30 text-purple-400 rounded-full">
                    {featuredPost.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize mt-6 mb-4 group-hover:text-purple-300 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-6 max-w-2xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-white/30 font-mono text-xs mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/30 bg-white/5 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="btn-outline inline-flex items-center gap-2 text-sm">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {searchTerm && (
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-6">
              Search Results ({filteredPosts.length})
            </p>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/40 mb-4">No articles found matching your criteria.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-outline inline-flex items-center gap-2 text-sm"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={post.url} className="block group">
                      <div className="bg-white/[0.07] border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-purple-400/30 text-purple-400 rounded-full self-start mb-4">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] mb-4">
                          <span>{post.readTime}</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <span className="text-purple-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Coming Soon */}
        <motion.div {...fadeUp} className="text-center mt-16">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-10">
            <h3 className="font-display text-xl text-[#fafafa] capitalize mb-3">
              More Articles Coming Soon
            </h3>
            <p className="text-white/40 text-sm">
              We're working on new content covering AI implementation, case studies, and industry insights.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
