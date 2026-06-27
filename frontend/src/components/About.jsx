import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Award, Clock, Quote } from 'lucide-react';
import PageHeader from './PageHeader';

const About = () => {
  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "1,090+", label: "Total Cars" },
    { value: "2,590+", label: "Happy Customers" },
    { value: "5", label: "Total Branches" }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Corporate Executive",
      text: "Five Star Enterprises has been our go-to fleet provider in Ranchi for the past two years. Their chauffeur services are highly professional, on-time, and extremely reliable."
    },
    {
      name: "Anjali Gupta",
      role: "Leisure Traveler",
      text: "Renting a self-drive Thar for our Patratu Valley weekend trip was incredibly easy. The vehicle was sanitised and delivered right to our location. Highly recommended!"
    },
    {
      name: "Vikram Singh",
      role: "Event Organizer",
      text: "We booked Volvo buses and multiple luxury Mercedes cars for a large wedding in Ranchi. Five Star Enterprises managed the logistics flawlessly. Amazing service!"
    }
  ];

  // Letter by letter spring variants ("coming from air")
  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: -40,
      scale: 1.4,
      rotate: 8,
      filter: "blur(4px)"
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

  return (
    <div className="bg-white text-gray-800 min-h-screen text-left pb-16">
      <PageHeader title="About Us" breadcrumbs={[{ label: "About" }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 border-l-8 border-[#e2383a] pl-4 leading-none">
              Welcome to <br />
              <motion.span 
                variants={letterContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                className="inline-flex flex-wrap text-[#e2383a] mt-2"
              >
                {"FIVE STAR ENTERPRISES".split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                      <motion.span 
                        key={charIndex}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordIndex < "FIVE STAR ENTERPRISES".split(" ").length - 1 && (
                      <span className="inline-block w-[0.25em]">&nbsp;</span>
                    )}
                  </span>
                ))}
              </motion.span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold">
              Formerly known as The Car Club. We believe that traveling should be comfortable, affordable, and hassle-free.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              We provide a wide range of high-quality rental cars, from luxury sedans to budget-friendly options, ensuring that you find the perfect vehicle for your journey. With a commitment to excellence, we strive to offer seamless booking experiences, well-maintained cars, and top-notch customer service. Whether you're heading for a business trip, a family vacation, or just a weekend getaway, we have the right car to suit your needs.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#1a1c1e] text-white rounded-3xl p-8 sm:p-10 border border-gray-800 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#e2383a]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2383a]/20 border border-[#e2383a]/30 text-[#e2383a] text-[10px] font-black uppercase tracking-wider">
                  ★ Corporate HQ
                </span>
                
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Ranchi Head Office
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Smart City, Ranchi, Jharkhand</p>
                </div>

                <div className="space-y-4 border-t border-b border-white/10 py-6 text-xs text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-[#e2383a] font-bold uppercase tracking-wider block w-20">Address:</span>
                    <span className="flex-grow">Sector 2, HEC Area, Near Vidhan Sabha, Smart City, Ranchi, Jharkhand - 834004</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#e2383a] font-bold uppercase tracking-wider block w-20">Hotline:</span>
                    <span className="flex-grow font-black text-white">+91 9939753351</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#e2383a] font-bold uppercase tracking-wider block w-20">Email:</span>
                    <span className="flex-grow">info@thecarclub.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#e2383a] font-bold uppercase tracking-wider block w-20">Hours:</span>
                    <span className="flex-grow">24/7 Operations Support Desk</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://maps.google.com/?q=Smart+City,Ranchi,Jharkhand"
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 text-center py-3 bg-[#e2383a] hover:bg-[#c92f31] text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300 shadow-md"
                  >
                    View on Maps
                  </a>
                  <a 
                    href="tel:+919939753351"
                    className="flex-grow text-center py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300"
                  >
                    Call Helpline
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats (Peach BG) */}
        <div className="bg-[#fbeeeea6] p-8 sm:p-12 rounded-2xl border border-red-100">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="space-y-1"
              >
                <h4 className="text-3xl sm:text-5xl font-black text-[#e2383a] tracking-tight">{s.value}</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services features highlights */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { icon: <Shield size={24} />, num: "01", title: "Fully Verified", desc: "All cars are routinely inspected, sanitised, and fully insured for passenger safety." },
            { icon: <Award size={24} />, num: "02", title: "Best Rate Guarantee", desc: "No hidden charges. We offer transparent pricing structures matching your exact trip parameters." },
            { icon: <Clock size={24} />, num: "03", title: "24/7 Dispatch Desk", desc: "Our dispatch and support team is active round the clock to coordinate pickups and roadside assistance." }
          ].map((box, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="relative p-8 bg-white border border-gray-205 rounded-3xl space-y-5 text-left shadow-lg hover:shadow-xl hover:border-[#e2383a]/40 transition duration-300 overflow-hidden group"
            >
              {/* Giant background number */}
              <span className="absolute right-6 top-4 text-5xl font-black text-gray-100 select-none group-hover:text-red-50/50 transition duration-300">
                {box.num}
              </span>
              
              {/* Glowing Icon container */}
              <div className="w-12 h-12 flex items-center justify-center bg-red-50 text-[#e2383a] rounded-2xl border border-red-100 group-hover:bg-[#e2383a] group-hover:text-white transition duration-300">
                {box.icon}
              </div>
              
              <div className="space-y-2 relative z-10">
                <h4 className="font-black text-sm uppercase tracking-wider text-gray-900">
                  {box.title}
                </h4>
                <div className="w-8 h-1 bg-[#e2383a] rounded" />
                <p className="text-xs text-gray-500 leading-relaxed pt-1">
                  {box.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="space-y-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="space-y-3"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#e2383a] font-black">Happy Clients</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">Client Testimonials</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => {
              const initials = t.name.split(" ").map(n => n[0]).join("");
              const bgColors = ["bg-blue-600", "bg-emerald-600", "bg-purple-600"];
              return (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="p-8 bg-gray-50 border border-gray-200 rounded-3xl text-left space-y-6 relative flex flex-col justify-between shadow-lg hover:border-[#e2383a]/40 hover:bg-white transition duration-300"
                >
                  <Quote className="absolute top-6 right-8 text-gray-200/50 pointer-events-none" size={48} />
                  
                  {/* Stars rating */}
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={11} fill="currentColor" className="text-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed italic relative z-10">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    {/* User avatar initials */}
                    <div className={`w-10 h-10 rounded-full ${bgColors[i % 3]} text-white flex items-center justify-center font-black text-xs shadow-md`}>
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-gray-900 uppercase">{t.name}</h4>
                      <p className="text-[10px] text-[#e2383a] uppercase tracking-widest font-bold mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
