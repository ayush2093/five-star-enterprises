import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Car, Users, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

const Services = () => {
  const navigate = useNavigate();

  const serviceList = [
    {
      title: "Self-Drive Car Rentals",
      desc: "Enjoy the freedom of the road with our self-drive car rental service. Choose from a variety of luxury, SUV, sedan, and economy cars to match your travel needs.",
      icon: <Compass size={18} />,
      category: "FREEDOM OF DRIVING",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Chauffeur-Driven Rentals",
      desc: "Relax and travel stress-free with our professional chauffeur service. Ideal for business trips, weddings, and special occasions, ensuring a comfortable and luxurious ride.",
      icon: <Users size={18} />,
      category: "EXECUTIVE LUXURY",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Airport & City Transfers",
      desc: "Book a hassle-free ride with our airport and city transfer service. Get picked up and dropped off at your desired location on time and in comfort.",
      icon: <Car size={18} />,
      category: "ON-TIME GUARANTEE",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Luxury & Event Car Rentals",
      desc: "Make a statement with our luxury car rental service for weddings, parties, and corporate events. Choose from high-end vehicles like Mercedes, BMW, and Audi.",
      icon: <Star size={18} />,
      category: "VIP PROTOCOL",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen text-left pb-16">
      <PageHeader title="Our Services" breadcrumbs={[{ label: "Services" }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">

        {/* Services Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {serviceList.map((service, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#e2383a]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Header with floating badge */}
              <div className="aspect-[16/9] overflow-hidden relative border-b border-gray-150 bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                  {service.category}
                </span>
                
                {/* Floating Icon Container */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-[#e2383a] text-white flex items-center justify-center shadow-lg border border-white/10">
                  {service.icon}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-black text-lg uppercase text-gray-900 group-hover:text-[#e2383a] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-150 flex justify-end">
                  <button
                    onClick={() => navigate('/cars')}
                    className="px-6 py-3 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    Choose Car
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chauffeur recruitment banner (Red Banner) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-950 p-8 sm:p-12 rounded-3xl text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-2xl border border-gray-850 relative overflow-hidden text-left"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#e2383a]/8 rounded-full blur-[90px] pointer-events-none" />
          <div className="md:col-span-8 space-y-2 text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2383a]/25 border border-[#e2383a]/30 text-[#e2383a] text-[10px] font-black uppercase tracking-wider mb-2">
              ★ Career & Partnerships
            </span>
            <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Do You Want To Earn With Us?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed pt-1">
              Join our elite driver network and partner with Five Star Enterprises for premium corporate, VIP, and wedding tour logistics.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end relative z-10 pt-2 md:pt-0">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 bg-[#e2383a] hover:bg-[#c92f31] text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300 shadow-lg active:scale-95"
            >
              Become a Driver
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Services;
