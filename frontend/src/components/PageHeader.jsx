import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const PageHeader = ({ title, breadcrumbs = [], bgImage }) => {
  // Stagger configurations for stars
  const starContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const starItemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    }
  };

  // Stagger configurations for brand title letters ("air by air" stagger)
  const brandContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const starEnterprisesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.45 // Starts right after "FIVE STAR" stagger completes
      }
    }
  };

  const brandLetterVariants = {
    hidden: { 
      opacity: 0, 
      y: -60,
      scale: 1.4,
      rotate: 12,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 90, 
        damping: 10 
      }
    }
  };

  // Default backgrounds mapped by title keywords
  const getBgImage = () => {
    if (bgImage) return bgImage;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('car') || lowerTitle.includes('fleet')) {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920'; // Clean car interior/steering
    }
    if (lowerTitle.includes('service')) {
      return 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920'; // Modern luxury car
    }
    if (lowerTitle.includes('contact') || lowerTitle.includes('connect')) {
      return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920'; // Corporate building
    }
    if (lowerTitle.includes('blog') || lowerTitle.includes('news')) {
      return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920'; // Open road travel
    }
    if (lowerTitle.includes('cart') || lowerTitle.includes('booking') || lowerTitle.includes('reservation')) {
      return 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920'; // Driving hands
    }
    return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920'; // Default scenic road
  };

  return (
    <section className="relative h-[48vh] sm:h-[58vh] min-h-[350px] sm:min-h-[420px] flex flex-col justify-between pt-16 pb-8 sm:pb-12 bg-[#1b1d20] overflow-hidden text-left border-b border-white/5">
      {/* Background Image with smooth entrance zoom-out */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${getBgImage()}')` }}
      />
      
      {/* Premium dark gradient and color overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/75 to-[#111215]/30 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e2383a]/8 rounded-full blur-[130px] pointer-events-none z-10" />
      <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-[#1089ff]/5 rounded-full blur-[80px] pointer-events-none z-10" />

      {/* 5 Stars Reveal (Top Left relative to content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-4">
        <motion.div 
          variants={starContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1"
        >
          {[...Array(5)].map((_, idx) => (
            <motion.div key={idx} variants={starItemVariants}>
              <Star size={11} className="text-[#e2383a]" fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Giant Centered Brand Header (Matches Screenshot style from thecarclub.in) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 text-center px-4 mt-4">
        {/* "FIVE STAR" (Red, bold, font-black) */}
        <motion.div 
          variants={brandContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#e2383a] uppercase font-sans"
        >
          {"FIVE STAR".split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((letter, letterIndex) => (
                <motion.span 
                  key={letterIndex} 
                  variants={brandLetterVariants}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex < "FIVE STAR".split(" ").length - 1 && (
                <span className="inline-block w-[0.25em]">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.div>
        
        {/* "ENTERPRISES" (White, giant size) */}
        <motion.div 
          variants={starEnterprisesContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase font-sans mt-0.5 sm:mt-1"
        >
          <span className="inline-block whitespace-nowrap">
            {"ENTERPRISES".split("").map((letter, idx) => (
              <motion.span 
                key={idx} 
                variants={brandLetterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </div>

      {/* Bottom Content Area: Breadcrumbs + Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-30 mt-auto">
        <div className="space-y-3">
          
          {/* Breadcrumbs List */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex items-center gap-1.5 text-[10px] sm:text-xs text-red-500 font-black uppercase tracking-wider"
          >
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={10} className="text-gray-500" />
                {crumb.path ? (
                  <Link to={crumb.path} className="text-gray-400 hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#e2383a]">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Page Title with red vertical accent bar */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-3xl xl:text-4xl font-black uppercase text-white tracking-tight border-l-4 sm:border-l-6 border-[#e2383a] pl-3 sm:pl-4"
            >
              {title}
            </motion.h1>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PageHeader;
