import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, MapPin, Calendar, Clock, User, Phone, 
  Mail, CreditCard, Star, FileText, CheckCircle 
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import PageHeader from './PageHeader';

const Cart = ({ user }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();

  // Booking forms state
  const [tripForm, setTripForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    tripType: 'one-way',
    hoursNeeded: 0
  });

  const [customerForm, setCustomerForm] = useState({
    name: user?.firstName || '',
    phone: '',
    email: user?.email || ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleTripChange = (e) => {
    setTripForm({ ...tripForm, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (e) => {
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  };

  const cartTotal = getCartTotal();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!tripForm.pickupLocation || !tripForm.dropoffLocation || !tripForm.pickupDate || !tripForm.pickupTime) {
      alert('Please fill out all trip details.');
      return;
    }

    if (!customerForm.name || !customerForm.phone || !customerForm.email) {
      alert('Please fill out all contact details.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Setup Razorpay Mock / Real Order via backend
      const response = await axios.post('/api/payment/create-order', {
        amount: cartTotal
      });

      if (response.data.success) {
        const order = response.data.order;
        
        // 2. Submit booking to backend (works for guests too!)
        const bookingData = {
          items: cartItems.map(item => ({
            name: item.carModel,
            price: item.price,
            customization: item.customization
          })),
          totalAmount: cartTotal,
          customerDetails: customerForm,
          tripDetails: tripForm,
          paymentStatus: 'completed'
        };

        const bookingResponse = await axios.post('/api/orders', bookingData);

        if (bookingResponse.data.success) {
          const savedOrder = bookingResponse.data.order;

          // 3. Save booking to local storage (so guests can see it!)
          const guestBookings = localStorage.getItem('fivestar_completed_bookings');
          const list = guestBookings ? JSON.parse(guestBookings) : [];
          list.push(savedOrder);
          localStorage.setItem('fivestar_completed_bookings', JSON.stringify(list));

          // 4. Success state
          setBookingDetails(savedOrder);
          setBookingSuccess(true);
          clearCart();
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  if (bookingSuccess && bookingDetails) {
    return (
      <div className="bg-white text-gray-800 min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle size={32} />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#e2383a] font-black">
              Payment Completed
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">Booking Confirmed!</h2>
            <p className="text-xs text-gray-500 font-medium">Booking ID: {bookingDetails.orderId}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 text-left space-y-4 text-xs shadow-sm">
            <h4 className="font-bold uppercase tracking-wider text-gray-900 border-b border-gray-150 pb-2">Trip Receipt</h4>
            <div className="grid grid-cols-2 gap-2 text-gray-600">
              <span>Pickup:</span>
              <span className="text-gray-900 text-right truncate font-medium">{bookingDetails.tripDetails.pickupLocation}</span>
              <span>Dropoff:</span>
              <span className="text-gray-900 text-right truncate font-medium">{bookingDetails.tripDetails.dropoffLocation}</span>
              <span>Date / Time:</span>
              <span className="text-gray-900 text-right font-medium">
                {new Date(bookingDetails.tripDetails.pickupDate).toLocaleDateString()} at {bookingDetails.tripDetails.pickupTime}
              </span>
              <span>Client Name:</span>
              <span className="text-gray-900 text-right font-medium">{bookingDetails.customerDetails.name}</span>
              <span>Mobile No:</span>
              <span className="text-gray-900 text-right font-medium">{bookingDetails.customerDetails.phone}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-sm">
              <span>Total Paid:</span>
              <span className="text-[#e2383a]">₹{bookingDetails.totalAmount}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full py-3.5 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-xs tracking-widest rounded-lg transition shadow-md"
            >
              View My Bookings
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Booking Cart" breadcrumbs={[{ label: "Cart" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">

        {cartItems.length === 0 ? (
          <div className="bg-gray-50 border border-gray-300 border-dashed rounded-2xl p-16 text-center text-gray-500 space-y-4 shadow-sm">
            <span className="text-5xl">🛒</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Your cart is empty</h3>
            <p className="text-[10px] max-w-xs mx-auto">Head to the Cars page to pick a rental car or bus service.</p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/cars')}
                className="px-8 py-3 rounded-lg bg-[#e2383a] text-white font-black uppercase text-[10px] tracking-widest hover:bg-black transition shadow-md"
              >
                Browse Cars
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Details */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Trip Parameters */}
              <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 text-left space-y-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-250 pb-2">
                  <MapPin size={14} className="text-[#e2383a]" /> Trip Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Pickup Address *
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={tripForm.pickupLocation}
                      onChange={handleTripChange}
                      placeholder="Enter pickup address, airport, station..."
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Dropoff Address *
                    </label>
                    <input
                      type="text"
                      name="dropoffLocation"
                      value={tripForm.dropoffLocation}
                      onChange={handleTripChange}
                      placeholder="Enter dropoff location address..."
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={tripForm.pickupDate}
                      onChange={handleTripChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Pickup Time *
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={tripForm.pickupTime}
                      onChange={handleTripChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Trip Type
                    </label>
                    <select
                      name="tripType"
                      value={tripForm.tripType}
                      onChange={handleTripChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                    >
                      <option value="one-way">One-Way</option>
                      <option value="round-trip">Round-Trip</option>
                      <option value="hourly">Hourly Rental</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 text-left space-y-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-250 pb-2">
                  <User size={14} className="text-[#e2383a]" /> Passenger Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerForm.name}
                      onChange={handleCustomerChange}
                      placeholder="Name for booking"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerForm.phone}
                      onChange={handleCustomerChange}
                      placeholder="Mobile contact"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerForm.email}
                      onChange={handleCustomerChange}
                      placeholder="Email for confirmation"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Checkout Invoice */}
            <motion.div 
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 space-y-6"
            >
              
              <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 text-left space-y-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-250 pb-2">
                  <FileText size={14} className="text-[#e2383a]" /> Booking Bill
                </h3>

                {/* Items list */}
                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pt-4 first:pt-0">
                      <div className="space-y-1 pr-4">
                        <h4 className="font-bold text-xs text-gray-900 uppercase">{item.carModel}</h4>
                        <div className="flex flex-wrap gap-1 text-[9px] text-gray-500 uppercase tracking-widest">
                          <span>{item.customization.paintColor} Paint</span>
                          <span>•</span>
                          <span>{item.customization.interiorStyle} Seat</span>
                          <span>•</span>
                          <span>{item.customization.chauffeurOption}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <span className="text-xs font-bold text-[#e2383a] block">₹{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal:</span>
                    <span className="text-gray-800 font-bold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax & Fees:</span>
                    <span className="text-emerald-600 font-bold">Inclusive</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-black text-sm text-gray-950">
                    <span>Total Fare:</span>
                    <span className="text-[#e2383a]">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-xs tracking-widest rounded-lg transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <CreditCard size={14} />
                  {isProcessing ? 'Verifying payment...' : 'Confirm & Pay'}
                </button>
              </div>

            </motion.div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
