import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, Award, Clock, Users, Star, 
  MapPin, Calendar, Phone, User, MessageSquare,
  Facebook, Instagram, Linkedin, Mail
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import directorImage from '../assets/diksha_singh.jpg';
import maaTaraImage from '../assets/maa_tara.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Letter by letter spring variants ("coming from air")
  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: -35,
      scale: 1.3,
      rotate: 6,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 95, 
        damping: 11 
      }
    }
  };
  
  // Quick Search/Enquiry State
  const [enquiry, setEnquiry] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    dropoffDate: '',
    name: '',
    phone: ''
  });

  const handleEnquiryChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiry.pickup || !enquiry.dropoff || !enquiry.pickupDate || !enquiry.name || !enquiry.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Create a temporary booking object and add it to cart
    const quickBooking = {
      id: 'quick_' + Date.now(),
      carModel: 'Executive Sedan (Standard)',
      category: 'Sedan Cars',
      price: 2200, // Base price
      quantity: 1,
      customization: {
        paintColor: 'Obsidian Black',
        interiorStyle: 'Caramel Leather',
        amenities: ['Wi-Fi'],
        chauffeurOption: 'Chauffeur-Driven'
      },
      pickupLocation: enquiry.pickup,
      dropoffLocation: enquiry.dropoff,
      pickupDate: enquiry.pickupDate,
      dropoffDate: enquiry.dropoffDate,
      customerDetails: {
        name: enquiry.name,
        email: 'guest@fivestar.com',
        phone: enquiry.phone
      }
    };

    addToCart(quickBooking);
    navigate('/cart');
  };

  const services = [
    {
      title: "Self-Drive Car Rentals",
      desc: "Enjoy the freedom of the road with our self-drive car rental service. Choose from a variety of luxury, SUV, sedan, and economy cars to match your travel needs."
    },
    {
      title: "Chauffeur-Driven Rentals",
      desc: "Relax and travel stress-free with our professional chauffeur service. Ideal for business trips, weddings, and special occasions, ensuring a comfortable and luxurious ride."
    },
    {
      title: "Airport & City Transfers",
      desc: "Book a hassle-free ride with our airport and city transfer service. Get picked up and dropped off at your desired location on time and in comfort."
    },
    {
      title: "Luxury & Event Car Rentals",
      desc: "Make a statement with our luxury car rental service for weddings, parties, and corporate events. Choose from high-end vehicles like Mercedes, BMW, and Audi."
    }
  ];

  const clientLogos = [
    { name: "Tata Steel", logo: "https://thecarclub.in/admin/uploads/client/17385759371.jpg" },
    { name: "Adani", logo: "https://thecarclub.in/admin/uploads/client/17385759452.jpg" },
    { name: "Dalmia Bharat", logo: "https://thecarclub.in/admin/uploads/client/17385759523.jpg" },
    { name: "Amity University", logo: "https://thecarclub.in/admin/uploads/client/17385759584.jpg" },
    { name: "Asian Paints", logo: "https://thecarclub.in/admin/uploads/client/17385759675.jpg" },
    { name: "Aditya Birla Hindalco", logo: "https://thecarclub.in/admin/uploads/client/17385759756.jpg" },
    { name: "Zee News", logo: "https://thecarclub.in/admin/uploads/client/17385759837.jpg" },
    { name: "Press Trust of India", logo: "https://thecarclub.in/admin/uploads/client/17385759918.jpg" },
    { name: "Room to Read", logo: "https://thecarclub.in/admin/uploads/client/17385760019.jpg" },
    { name: "Path", logo: "https://thecarclub.in/admin/uploads/client/173857600810.jpg" },
    { name: "Jhpiego", logo: "https://thecarclub.in/admin/uploads/client/173857601511.jpg" },
    { name: "National Rural Health Mission", logo: "https://thecarclub.in/admin/uploads/client/173857602312.jpg" },
    { name: "JSLPS", logo: "https://thecarclub.in/admin/uploads/client/173857603013.jpg" },
    { name: "Ekjut", logo: "https://thecarclub.in/admin/uploads/client/173857603814.jpg" },
    { name: "Fairmined", logo: "https://thecarclub.in/admin/uploads/client/173857604915.jpg" },
    { name: "Govt of Jharkhand", logo: "https://thecarclub.in/admin/uploads/client/173857605616.jpg" },
    { name: "UNICEF", logo: "https://thecarclub.in/admin/uploads/client/173857606817.jpg" },
    { name: "L&T", logo: "https://thecarclub.in/admin/uploads/client/173857607618.jpg" },
    { name: "CMPDI", logo: "https://thecarclub.in/admin/uploads/client/173857609319.jpg" },
    { name: "CCL", logo: "https://thecarclub.in/admin/uploads/client/173857610020.jpg" }
  ];

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "1,090+", label: "Total Cars" },
    { value: "2,590+", label: "Happy Customers" },
    { value: "5", label: "Total Branches" }
  ];

  const testimonials = [
    {
      quote: "Renting a car from Five Star Enterprises was effortless! The booking process was quick, and the car was in excellent condition. Highly recommended!",
      author: "Amit Sharma",
      title: "Smooth & Hassle-Free Experience!"
    },
    {
      quote: "I was amazed by the affordability and the quality of customer service. The driver was highly professional and knew all the routes in Ranchi very well.",
      author: "Pooja Kumari",
      title: "Highly Professional Drivers!"
    },
    {
      quote: "Best car rental service in Jharkhand. Well-maintained cars, reasonable rates, and completely transparent booking flow. Will definitely book again.",
      author: "Rajesh Mahto",
      title: "Transparent & Well Maintained!"
    }
  ];

  return (
    <div className="bg-white text-gray-800">

      {/* HERO SECTION WITH BG BANNER & LAYOUT */}
      <section className="relative min-h-screen sm:min-h-[85vh] flex items-center justify-center py-12 sm:py-16 px-4 bg-[#1a1c1e] border-b border-gray-200 overflow-hidden">
        {/* Background Image with smooth entrance zoom-out */}
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920')` }}
        />
        {/* Abstract light background overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/95 via-white/98 to-gray-50/95 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Booking Enquiry Form (Red background box - Left) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 75, damping: 14, delay: 0.1 }}
              className="bg-[#e2383a] text-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6"
            >
              <div className="text-left border-b border-white/20 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wider">Booking Enquiry</h2>
                <p className="text-xs text-white/80">Enquiry For Reserve Your Perfect Car</p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                      <MapPin size={10} /> Pick-up Location
                    </label>
                    <input
                      type="text"
                      name="pickup"
                      value={enquiry.pickup}
                      onChange={handleEnquiryChange}
                      placeholder="City, Airport, Station..."
                      className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                      <MapPin size={10} /> Drop-off Location
                    </label>
                    <input
                      type="text"
                      name="dropoff"
                      value={enquiry.dropoff}
                      onChange={handleEnquiryChange}
                      placeholder="Destination Address..."
                      className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                      <Calendar size={10} /> Pick-up Date
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={enquiry.pickupDate}
                      onChange={handleEnquiryChange}
                      className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                      <Calendar size={10} /> Drop-off Date
                    </label>
                    <input
                      type="date"
                      name="dropoffDate"
                      value={enquiry.dropoffDate}
                      onChange={handleEnquiryChange}
                      className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                    <User size={10} /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={enquiry.name}
                    onChange={handleEnquiryChange}
                    placeholder="Enter Your Name"
                    className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-white/90 font-bold flex items-center gap-1">
                    <Phone size={10} /> Contact No *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={enquiry.phone}
                    onChange={handleEnquiryChange}
                    placeholder="Enter Your Mobile No"
                    className="w-full bg-white border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-gray-900 hover:bg-black text-white font-black uppercase text-xs tracking-widest transition-all shadow-md mt-4"
                >
                  Enquiry Now
                </button>
              </form>
            </motion.div>
          </div>

          {/* Hero text & Ideal Journey section (Right) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1
                }
              }
            }}
            className="lg:col-span-7 space-y-8 text-left order-1 lg:order-2 lg:pl-6"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2383a]/10 border border-[#e2383a]/20 text-[#e2383a] text-xs font-black uppercase tracking-widest shadow-sm"
            >
              <Star size={11} fill="currentColor" /> Rent a Car For Your Ideal Journey
            </motion.div>
            
            <motion.h1 
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none text-gray-900 flex flex-wrap"
            >
              <span className="text-[#e2383a] w-full block">
                {"Welcome to Five Star".split(" ").map((word, wordIndex) => (
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
                    {wordIndex < "Welcome to Five Star".split(" ").length - 1 && (
                      <span className="inline-block w-[0.25em]">&nbsp;</span>
                    )}
                  </span>
                ))}
              </span>
              <span className="text-gray-900 w-full mt-2 sm:mt-3 block">
                <span className="inline-block whitespace-nowrap">
                  {"Enterprises".split("").map((char, index) => (
                    <motion.span 
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Find the perfect ride for your journey. Five Star Enterprises offers affordable, reliable, and premium car rentals at your fingertips. Rent now with Ranchi's best fleet network.
            </motion.p>

            {/* Ideal Journey Steps */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="pt-6 border-t border-gray-200"
            >
              <h3 className="text-md font-black uppercase tracking-wider text-gray-900 mb-4">Rent a Car for Your Ideal Journey</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 mx-auto flex items-center justify-center bg-red-50 text-[#e2383a] rounded-lg mb-2"><MapPin size={18} /></div>
                  <h4 className="text-[10px] font-bold uppercase text-gray-800">Choose Pickup Location</h4>
                </div>
                <div className="text-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 mx-auto flex items-center justify-center bg-red-50 text-[#e2383a] rounded-lg mb-2"><Award size={18} /></div>
                  <h4 className="text-[10px] font-bold uppercase text-gray-800">Select the Best Deal</h4>
                </div>
                <div className="text-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 mx-auto flex items-center justify-center bg-red-50 text-[#e2383a] rounded-lg mb-2"><Shield size={18} /></div>
                  <h4 className="text-[10px] font-bold uppercase text-gray-800">Reserve Your Rental Car</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex gap-4 pt-4"
            >
              <Link
                to="/cars"
                className="px-8 py-3.5 rounded-lg bg-[#e2383a] text-white text-xs font-black uppercase tracking-wider hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                Choose Your Car <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DEVOTIONAL BLESSINGS SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#2d0b0c] via-[#1a0607] to-[#0a0203] text-white relative overflow-hidden border-t-4 border-amber-500 border-b border-white/5">
        {/* Decorative light overlays */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Big Image of Maa Tara */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[340px] xs:max-w-[380px] md:max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-black relative group"
            >
              {/* Inner amber glowing border */}
              <div className="absolute inset-0 border-2 border-amber-300/30 rounded-2xl pointer-events-none z-10 m-1" />
              <img 
                src={maaTaraImage} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-1000 ease-out" 
                alt="Maa Tara Blessings" 
              />
            </motion.div>
          </div>
          
          {/* Right Column: Devotional Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7 space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest">
              🙏🏻 शुभ यात्रा • DIVINE BLESSINGS 🙏🏻
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white">
              Jai Maa <span className="text-amber-400">Tara</span>
            </h2>
            
            <div className="h-1 w-20 bg-amber-500 mx-auto md:mx-0 rounded-full" />
            
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base font-semibold">
              At Five Star Enterprises, we believe every journey is sacred. Before our vehicles hit the road, we dedicate them and seek the supreme protection and divine grace of Maa Tara.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-medium">
              We pray for the absolute safety, happiness, and well-being of all our travelers. May her divine blessing guide every mile you travel with us and bring peace and prosperity to your destination.
            </p>
            
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto md:mx-0">
              <p className="text-amber-300/90 font-serif italic text-sm sm:text-base text-center">
                "जय माँ तारा - सबका कल्याण हो, सबकी यात्रा सुखद और सुरक्षित हो।"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION (Peach background) */}
      <section className="bg-brand-peach py-16 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="space-y-1"
              >
                <h4 className="text-4xl sm:text-5xl font-black text-[#e2383a] tracking-tight">{s.value}</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLIENTS SECTION (White background) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#e2383a] font-black">Trusted Fleet Provider</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-gray-900">Our Corporate Clients</h2>
          </div>
          
          <div className="relative w-full overflow-hidden py-6 sm:py-10 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="animate-marquee flex items-center gap-4 sm:gap-8">
              {clientLogos.map((client, idx) => (
                <div key={'marquee-1-' + idx} className="h-24 sm:h-32 md:h-40 w-40 sm:w-60 md:w-80 flex-shrink-0 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white border border-gray-100 rounded-xl hover:shadow-md transition duration-300">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    title={client.name} 
                    className="max-h-full max-w-full object-contain transition duration-300" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
              {/* Duplicate the array to create the infinite scroll effect */}
              {clientLogos.map((client, idx) => (
                <div key={'marquee-2-' + idx} className="h-24 sm:h-32 md:h-40 w-40 sm:w-60 md:w-80 flex-shrink-0 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white border border-gray-100 rounded-xl hover:shadow-md transition duration-300">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    title={client.name} 
                    className="max-h-full max-w-full object-contain transition duration-300" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ABOUT US (White background) */}
      <section id="about" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 text-left space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 border-l-8 border-[#e2383a] pl-4 leading-none">
            Welcome to <br />
            <motion.span 
              variants={letterContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="inline-flex flex-wrap text-[#e2383a] mt-2"
            >
              {"Five Star Enterprises".split(" ").map((word, wordIndex) => (
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
                  {wordIndex < "Five Star Enterprises".split(" ").length - 1 && (
                    <span className="inline-block w-[0.25em]">&nbsp;</span>
                  )}
                </span>
              ))}
            </motion.span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-md leading-relaxed">
            At Five Star Enterprises, we believe that traveling should be comfortable, affordable, and hassle-free. We provide a wide range of high-quality rental cars, from luxury sedans to budget-friendly options, ensuring that you find the perfect vehicle for your journey.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            With a commitment to excellence, we strive to offer seamless booking experiences, well-maintained cars, and top-notch customer service. Whether you're heading for a business trip, a family vacation, or just a weekend getaway, we have the right car to suit your needs.
          </p>
          <div className="pt-4 grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Shield size={18} />, title: "Fully Insured", text: "Drive with absolute peace of mind." },
              { icon: <Award size={18} />, title: "Best Price", text: "Guaranteed premium rates." },
              { icon: <Clock size={18} />, title: "24/7 Service", text: "Round the clock backup support." }
            ].map((box, i) => (
              <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-left space-y-2">
                <div className="text-[#e2383a]">{box.icon}</div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-gray-900">{box.title}</h5>
                <p className="text-[10px] text-gray-500">{box.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative w-full"
        >
          <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-gray-800 text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e2383a]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2383a]/20 border border-[#e2383a]/30 text-[#e2383a] text-[10px] font-black uppercase tracking-wider">
                ★ Premium Experience
              </span>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Our Signature <br />
                <span className="text-[#e2383a]">Five Star Service</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Every journey is engineered to feel like first-class travel. Here is what we guarantee on every booking:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Elite Chauffeurs", desc: "Background verified, courteous, and highly experienced." },
                  { title: "Pristine Cabins", desc: "100% sanitized, fresh fragrance, and climate-controlled." },
                  { title: "Real-Time Tracking", desc: "Live GPS updates and secure ride sharing links." },
                  { title: "No Hidden Costs", desc: "Fixed quotes, transparent invoices, zero surcharges." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1 hover:border-[#e2383a]/50 hover:bg-white/10 transition duration-300">
                    <span className="text-sm font-bold uppercase tracking-wider text-[#e2383a] block">0{idx + 1}. {item.title}</span>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DIRECTOR SECTION */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200 relative overflow-hidden">
        {/* Decorative light circle */}
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#e2383a]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-5 flex flex-col items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white"
            >
              <img 
                src={directorImage} 
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-1000 ease-out" 
                alt="Diksha Singh" 
              />
            </motion.div>

            {/* Director Name & Title below photo in big text */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-center space-y-1 mt-1"
            >
              <h4 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-wide">
                Diksha Singh
              </h4>
              <p className="text-xs sm:text-sm font-black uppercase text-[#e2383a] tracking-widest">
                Founder & Director, Five Star Enterprises
              </p>
            </motion.div>
            
            {/* Social profiles */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <a 
                href="#" 
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-[#e2383a] hover:border-[#e2383a] rounded-full transition duration-300 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="#" 
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-[#e2383a] hover:border-[#e2383a] rounded-full transition duration-300 shadow-sm"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-[#e2383a] hover:border-[#e2383a] rounded-full transition duration-300 shadow-sm"
                title="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="mailto:info@thecarclub.in" 
                className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-[#e2383a] hover:border-[#e2383a] rounded-full transition duration-300 shadow-sm"
                title="Email"
              >
                <Mail size={16} />
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7 space-y-5 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2383a]/10 border border-[#e2383a]/20 text-[#e2383a] text-xs font-bold uppercase tracking-widest">
              Founder & Director's Vision
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase text-gray-900 leading-tight">
              Leading with <span className="text-[#e2383a]">Vision & Excellence</span>
            </h3>
            
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              At Five Star Enterprises, our mission is to redefine your transit experience. Under the vision of our founder & director, <strong className="text-gray-900 font-bold">Diksha Singh</strong>, we combine state-of-the-art vehicles, verified chauffeurs, and customized tour operations to make every mile you travel with us safe, premium, and memorable.
            </p>
            
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              "We don't just rent cars; we build long-term relationships based on trust, quality, and outstanding customer service. Welcome to Ranchi's premier mobility provider."
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES (Peach background) */}
      <section id="services" className="bg-brand-peach py-24 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2383a]/10 border border-[#e2383a]/20 text-[#e2383a] text-xs font-bold uppercase tracking-widest">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">Our Latest Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white border border-gray-100 rounded-2xl text-left space-y-4 shadow-sm hover:border-[#e2383a]/50 hover:scale-[1.02] transition-all group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-red-50 text-[#e2383a] rounded-lg group-hover:bg-[#e2383a] group-hover:text-white transition-all">
                  <Star size={16} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-sm uppercase tracking-wider text-gray-900 group-hover:text-[#e2383a] transition">
                    {s.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONY SECTION (Peach background) */}
      <section className="bg-brand-peach py-24 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2383a]/10 border border-[#e2383a]/20 text-[#e2383a] text-xs font-bold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">Happy Clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-6 bg-white border border-gray-100 rounded-2xl text-left shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#e2383a]/30 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex text-[#e2383a]"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">{t.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-[#e2383a] font-bold text-xs flex items-center justify-center"><User size={14} /></div>
                  <span className="text-xs font-bold text-gray-900">{t.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Earn with Us (Red background, white text) */}
      <section className="py-24 bg-[#e2383a] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Do You Want To Earn With Us? <br />
            <span>So Don't Be Late.</span>
          </h2>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Join the Five Star Enterprises network today. Contact our रांची office at 9939753351 to list your vehicle or set up business bookings.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 hover:bg-black text-white rounded-lg font-black uppercase tracking-widest text-xs transition-all shadow-xl"
            >
              Contact Us Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
