import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Clock, Trash2, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const MyTrips = ({ user }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // States for saved designs & bookings
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Saved Designs
      let localDesigns = [];
      const localDesignsRaw = localStorage.getItem('fivestar_saved_designs');
      if (localDesignsRaw) {
        localDesigns = JSON.parse(localDesignsRaw);
      }

      let dbDesigns = [];
      if (user) {
        const response = await axios.get('/api/designs/my-designs');
        if (response.data.success) {
          dbDesigns = response.data.designs;
        }
      }
      setSavedDesigns([...dbDesigns, ...localDesigns]);

      // 2. Fetch Bookings
      let localBookings = [];
      const localBookingsRaw = localStorage.getItem('fivestar_completed_bookings');
      if (localBookingsRaw) {
        localBookings = JSON.parse(localBookingsRaw);
      }

      let dbBookings = [];
      if (user) {
        const response = await axios.get('/api/orders/my-orders');
        if (response.data.success) {
          dbBookings = response.data.orders;
        }
      }
      setBookings([...dbBookings, ...localBookings]);

    } catch (error) {
      console.error('Failed to load trips data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete saved design
  const handleDeleteDesign = async (id) => {
    try {
      if (id.startsWith('guest_design_')) {
        // Guest local delete
        const list = savedDesigns.filter(d => d._id !== id);
        localStorage.setItem('fivestar_saved_designs', JSON.stringify(list.filter(d => d._id.startsWith('guest_design_'))));
        setSavedDesigns(list);
      } else {
        // Authenticated delete
        const response = await axios.delete(`/api/designs/${id}`);
        if (response.data.success) {
          setSavedDesigns(prev => prev.filter(d => d._id !== id));
        }
      }
    } catch (error) {
      console.error('Delete design failed:', error);
    }
  };

  const handleBookSavedItem = (design) => {
    const item = {
      carModel: design.customization.carModel,
      category: design.customization.category,
      price: design.price,
      quantity: 1,
      customization: design.customization
    };
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="bg-[#0a0a0b] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-black">
            <Star size={12} /> Dashboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            My Trips & Plans
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            View completed reservations, access saved configurations and load plans directly back into the cart.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 pb-0 text-xs font-black uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 px-6 border-b-2 transition ${
              activeTab === 'bookings' 
                ? 'border-[#D4AF37] text-white font-black' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            My Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('designs')}
            className={`pb-4 px-6 border-b-2 transition ${
              activeTab === 'designs' 
                ? 'border-[#D4AF37] text-white font-black' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            Saved Fleet Specs ({savedDesigns.length})
          </button>
        </div>

        {/* Content Panel */}
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-xs uppercase tracking-widest">Retrieving trip configurations...</p>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            
            {/* Bookings List */}
            {activeTab === 'bookings' && (
              bookings.length === 0 ? (
                <div className="bg-[#121214]/40 border border-white/5 border-dashed rounded-3xl p-16 text-center text-gray-500 space-y-4">
                  <span className="text-5xl">📅</span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">No bookings found</h3>
                  <p className="text-[10px] max-w-xs mx-auto">You have not completed any bookings yet. Create one through the cart checkout.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-[#121214] p-6 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            Confirmed
                          </span>
                          <p className="text-[10px] text-gray-500 mt-1">ID: {booking.orderId}</p>
                        </div>
                        <span className="text-xl font-black text-[#D4AF37]">₹{booking.totalAmount}</span>
                      </div>

                      <div className="space-y-3 bg-black/25 p-4 rounded-2xl border border-white/5 text-xs text-gray-400">
                        <div className="flex items-start gap-2">
                          <MapPin size={12} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                          <span className="truncate">From: {booking.tripDetails.pickupLocation}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="truncate">To: {booking.tripDetails.dropoffLocation}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] border-t border-white/5 pt-2 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {new Date(booking.tripDetails.pickupDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> {booking.tripDetails.pickupTime}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Configured Cars</span>
                        {booking.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-bold text-white">
                            <span>{item.name}</span>
                            <span className="text-gray-500">Qty: {item.quantity || 1}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )
            )}

            {/* Saved Designs List */}
            {activeTab === 'designs' && (
              savedDesigns.length === 0 ? (
                <div className="bg-[#121214]/40 border border-white/5 border-dashed rounded-3xl p-16 text-center text-gray-500 space-y-4">
                  <span className="text-5xl">❤️</span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">No configurations saved</h3>
                  <p className="text-[10px] max-w-xs mx-auto">Go to the Design Studio to save your tailored fleet specs.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedDesigns.map((design) => (
                    <div key={design._id} className="bg-[#121214] p-6 rounded-3xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/10 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-sm text-white uppercase truncate max-w-[180px]">{design.name}</h4>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest">{design.customization.carModel}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteDesign(design._id)}
                          className="text-gray-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="bg-black/25 p-3 rounded-xl border border-white/5 text-xs text-gray-400 space-y-1.5">
                        <div className="flex justify-between">
                          <span>Paint coating:</span>
                          <span className="text-white font-bold">{design.customization.paintColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Seat trim:</span>
                          <span className="text-white font-bold">{design.customization.interiorStyle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Driver plan:</span>
                          <span className="text-white font-bold">{design.customization.chauffeurOption}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-md font-black text-[#D4AF37]">₹{design.price}</span>
                        <button
                          onClick={() => handleBookSavedItem(design)}
                          className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-black font-black uppercase text-[9px] tracking-widest rounded-lg transition flex items-center gap-1"
                        >
                          Book Now <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyTrips;
