import React from 'react';
import { Star, Calendar, User, ArrowRight, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

const Blog = () => {
  const posts = [
    {
      title: "Complete Guide to Planning a Road Trip in Jharkhand",
      excerpt: "Jharkhand is filled with pristine waterfalls, lush valleys, and scenic highways. Learn how to prepare your vehicle and map routes for an unforgettable road trip.",
      date: "May 12, 2026",
      author: "Five Star Team",
      readTime: "5 min read",
      category: "Road Trips",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Why Opt for a Chauffeur-Driven Service for Corporate Travel?",
      excerpt: "Arrive stress-free and focus on your business goals. Discover why professional chauffeurs are the standard choice for elite business transfers in Ranchi.",
      date: "April 28, 2026",
      author: "Admin Desk",
      readTime: "4 min read",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Top 5 Safety Checks Before Renting a Self-Drive Car",
      excerpt: "Safety first! Here is a simple checklist of documents, tyre alignments, sanitisation standards, and tools to inspect before hitting the highway.",
      date: "March 15, 2026",
      author: "Operations Lead",
      readTime: "6 min read",
      category: "Rental Tips",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Our Blog" breadcrumbs={[{ label: "Blog" }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Blog Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {posts.map((post, i) => {
            const authorInitials = post.author.split(" ").map(n => n[0]).join("");
            const colors = ["bg-red-500", "bg-gray-800", "bg-[#e2383a]"];
            
            return (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#e2383a]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Graphic Image with Zoom & Floating Category */}
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative border-b border-gray-150">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-106 transition duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                    {post.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 text-left">
                    {/* Date, Author & Read Time metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#e2383a]" /> {post.date}</span>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} className="text-[#e2383a]" /> {post.readTime}</span>
                    </div>

                    <h3 className="font-black text-base uppercase text-gray-900 leading-snug group-hover:text-[#e2383a] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 pt-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                    {/* Author Badge */}
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${colors[i % 3]} text-white flex items-center justify-center font-black text-[10px] shadow-sm`}>
                        {authorInitials}
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] text-gray-400 font-bold uppercase leading-none">By</span>
                        <span className="text-[10px] text-gray-800 font-black uppercase mt-0.5 block">{post.author}</span>
                      </div>
                    </div>
                    
                    {/* Read More button */}
                    <div className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-[#e2383a] hover:text-black cursor-pointer transition group/btn">
                      <span>Read More</span> 
                      <ArrowRight size={10} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Newsletter Section (Fills empty space beautifully) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-gray-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden border border-gray-850 shadow-2xl text-left"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e2383a]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#1089ff]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2383a]/20 border border-[#e2383a]/30 text-[#e2383a] text-[10px] font-black uppercase tracking-wider">
              ★ Stay Updated
            </span>
            
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Subscribe to our <span className="text-[#e2383a]">Premium Newsletter</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
                Join our private newsletter circle. Receive weekly road-trip itineraries, exclusive discount coupon codes, safety checklists, and corporate fleet deals before anyone else.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e2383a]/80 focus:bg-white/10 transition duration-300"
                required
              />
              <button 
                type="submit"
                className="px-8 py-3.5 bg-[#e2383a] hover:bg-[#c92f31] text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Subscribe Now</span>
                <Send size={11} />
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Blog;
