import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, FileText } from 'lucide-react';
import axios from 'axios';
import PageHeader from './PageHeader';

const MyBookings = ({ user }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // 1. Fetch Local Bookings
      let localBookings = [];
      const localBookingsRaw = localStorage.getItem('fivestar_completed_bookings');
      if (localBookingsRaw) {
        localBookings = JSON.parse(localBookingsRaw);
      }

      // 2. Fetch DB Bookings (if logged in)
      let dbBookings = [];
      if (user) {
        try {
          const response = await axios.get('/api/orders/my-orders');
          if (response.data.success) {
            dbBookings = response.data.orders;
          }
        } catch (dbErr) {
          console.error('Failed to retrieve DB bookings:', dbErr.message);
        }
      }

      // Combine and filter unique orders by orderId
      const allBookings = [...dbBookings, ...localBookings];
      const uniqueBookingsMap = new Map();
      allBookings.forEach(b => {
        if (b && b.orderId) {
          uniqueBookingsMap.set(b.orderId, b);
        }
      });

      setBookings(Array.from(uniqueBookingsMap.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="My Bookings" breadcrumbs={[{ label: "Bookings" }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e2383a] mx-auto mb-4"></div>
            <p className="text-xs uppercase tracking-widest">Retrieving booking schedules...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-gray-50 border border-gray-250 border-dashed rounded-2xl p-16 text-center text-gray-500 space-y-4 shadow-sm">
            <span className="text-5xl">📅</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">No bookings found</h3>
            <p className="text-[10px] max-w-xs mx-auto">You have not placed any car reservations yet.</p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/cars')}
                className="px-8 py-3 bg-[#e2383a] text-white font-black uppercase text-[10px] tracking-widest rounded-lg hover:bg-black transition shadow-md"
              >
                Browse Fleet Cars
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="space-y-6"
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking.orderId}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 hover:border-gray-300 transition shadow-sm text-left"
              >
                {/* Header card info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 border border-emerald-250 px-2.5 py-1 rounded-full">
                      {booking.orderStatus || 'Confirmed'}
                    </span>
                    <p className="text-[10px] text-gray-500 pt-1 font-medium">Booking ID: {booking.orderId}</p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Total Paid</span>
                    <span className="text-2xl font-black text-[#e2383a]">₹{booking.totalAmount}</span>
                  </div>
                </div>

                {/* Details layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500">
                  {/* Left Column: Trip logs */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#e2383a]" /> Journey Details
                    </h4>
                    <div className="space-y-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <div className="truncate">
                        <span className="text-[9px] text-gray-400 uppercase block font-bold">Pick-up Location</span>
                        <span className="text-gray-900 text-xs font-semibold">{booking.tripDetails.pickupLocation}</span>
                      </div>
                      <div className="truncate mt-2">
                        <span className="text-[9px] text-gray-400 uppercase block font-bold">Drop-off Location</span>
                        <span className="text-gray-900 text-xs font-semibold">{booking.tripDetails.dropoffLocation}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-150 mt-2 text-[10px] uppercase font-bold text-gray-500">
                        <div>
                          <span>Date:</span> <span className="text-gray-900 block mt-0.5 font-semibold">{new Date(booking.tripDetails.pickupDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span>Time:</span> <span className="text-gray-900 block mt-0.5 font-semibold">{booking.tripDetails.pickupTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Cars and passenger details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} className="text-[#e2383a]" /> Configured Fleet & Client
                      </h4>
                      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 shadow-sm">
                        {booking.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs border-b border-gray-150 pb-2 last:border-b-0 last:pb-0">
                            <div>
                              <span className="text-gray-900 font-bold block">{item.name}</span>
                              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">{item.customization?.chauffeurOption || 'Self-Drive'}</span>
                            </div>
                            <span className="text-[#e2383a] font-bold">₹{item.price}</span>
                          </div>
                        ))}
                        <div className="pt-2 text-[10px] text-gray-600 space-y-1 border-t border-gray-100 mt-2">
                          <span className="block"><span className="font-bold text-gray-500">Passenger Name:</span> {booking.customerDetails.name}</span>
                          <span className="block"><span className="font-bold text-gray-500">Phone:</span> {booking.customerDetails.phone}</span>
                          <span className="block"><span className="font-bold text-gray-500">Email:</span> {booking.customerDetails.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;
