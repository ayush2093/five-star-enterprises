import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Briefcase, Sparkles, Filter, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import PageHeader from './PageHeader';

const Cars = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    'All',
    'Hatchback',
    'Sedan',
    'SUV',
    'MUV',
    'Luxury',
    'Premium Sedan',
    'Bus Services'
  ];

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/cars');
      if (response.data && response.data.success) {
        setCars(response.data.cars);
      } else {
        setError('Failed to load fleet data.');
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = selectedCategory === 'All'
    ? cars
    : cars.filter(car => {
        const cat = car.category.toLowerCase();
        const sel = selectedCategory.toLowerCase();
        
        // Exact or flexible matches
        if (sel === 'hatchback' || sel === 'hatch back') {
          return cat.includes('hatch');
        }
        if (sel === 'premium sedan') {
          return cat.includes('premium') || cat.includes('luxury');
        }
        if (sel === 'luxury') {
          return cat.includes('luxury') || cat.includes('premium');
        }
        return cat.includes(sel.split(' ')[0]) || cat.includes(sel);
      });

  const handleBookNow = (car) => {
    const bookingItem = {
      carModel: `${car.brand} ${car.name}`,
      category: car.category,
      price: car.price,
      quantity: 1,
      customization: {
        paintColor: 'Obsidian Black',
        interiorStyle: 'Carbon Black',
        amenities: [],
        chauffeurOption: car.category.includes('Bus') ? 'Chauffeur-Driven' : 'Self-Drive'
      }
    };
    addToCart(bookingItem);
    navigate('/cart');
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Our Fleet" breadcrumbs={[{ label: "Cars" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">

        {/* Filter Tabs with horizontal scroll and Apple-style sliding pill */}
        <div className="border-b border-gray-100 pb-5 text-left">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mb-2">
            <Filter size={14} className="text-gray-400 mr-2 flex-shrink-0 hidden md:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#e2383a] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid (Spacious 3-column layout) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader className="w-8 h-8 text-[#e2383a] animate-spin" />
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Premium Fleet...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-md font-bold text-gray-800 uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchCars}
              className="px-6 py-3 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-xs tracking-wider rounded-lg transition"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-md font-bold text-gray-500 uppercase tracking-wider">No cars found in this category.</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (
                <motion.div
                  key={car._id || `${car.brand}-${car.name}`}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -5 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: -5 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 85,
                    damping: 15
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#e2383a]/40 hover:bg-white hover:shadow-2xl transition-all duration-300 text-left relative group"
                >
                  <div className="space-y-5">
                    {/* Real car image with zoom effect and floating badge */}
                    <div className="aspect-[16/10] bg-gray-150 rounded-2xl overflow-hidden border border-gray-200 relative group/img">
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.name}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/img:scale-108 transition duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                        {car.category}
                      </span>
                    </div>

                    {/* Stars + Title block */}
                    <div className="space-y-1.5">
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#e2383a] font-black block">{car.brand}</span>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight truncate">{car.name}</h3>
                    </div>
                  </div>

                  {/* Spacious Specifications Grid */}
                  <div className="space-y-4 border-t border-b border-gray-150 py-5 text-xs text-gray-600 grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#e2383a] flex-shrink-0">
                        <Users size={13} />
                      </div>
                      <span>{car.seats} Passenger Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#e2383a] flex-shrink-0">
                        <Briefcase size={13} />
                      </div>
                      <span>{car.bags} Luggage Bags</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 border-t border-gray-100 pt-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#e2383a] flex-shrink-0">
                        <Sparkles size={13} />
                      </div>
                      <span className="font-bold text-gray-800">Transmission: {car.type || 'Automatic'}</span>
                    </div>
                  </div>

                  {/* Rate + CTA Button */}
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase block font-black tracking-widest">Rate / Day</span>
                      <span className="text-2xl font-black text-gray-900">₹{car.price}</span>
                    </div>
                    <button
                      onClick={() => handleBookNow(car)}
                      className="px-6 py-3.5 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      Book Fleet
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Cars;
