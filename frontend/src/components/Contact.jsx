import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const response = await axios.post('/api/contact/send', form);
      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your enquiry has been received. Our executive will contact you shortly.'
        });
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          contactType: 'general'
        });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || 'Failed to submit enquiry. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Contact Us" breadcrumbs={[{ label: "Contact" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info cards */}
          <motion.div 
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-85px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#e2383a]">
                Office Coordinates
              </h3>
              
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e2383a] border border-red-100 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-900">Main Branch</h5>
                    <p className="text-xs text-gray-600 mt-1">Smart City, Ranchi, Jharkhand</p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e2383a] border border-red-100 flex items-center justify-center flex-shrink-0">
                    <FaPhone size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-900">Call Support</h5>
                    <p className="text-xs text-gray-600 mt-1">Mobile: +91 9939753351</p>
                    <p className="text-xs text-gray-600">Landline: 0651-3150347</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e2383a] border border-red-100 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-900">Electronic Mail</h5>
                    <p className="text-xs text-gray-600 mt-1">info@thecarclub.in</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Whatsapp quick chat */}
            <a
              href="https://wa.me/919939753351"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/70 transition rounded-2xl shadow-sm"
            >
              <div className="flex gap-3 items-center">
                <FaWhatsapp className="text-emerald-600 text-2xl" />
                <div className="text-left">
                  <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">WhatsApp Enquiry</h4>
                  <p className="text-[10px] text-gray-500">Chat directly with our booking agent</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-emerald-600">
                Chat Now
              </span>
            </a>

          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-85px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 text-left space-y-6 shadow-sm">
              
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-600">
                  Send Booking Enquiry
                </h3>
                <p className="text-xs text-gray-500">Fill out fields and submit</p>
              </div>

              {submitStatus.message && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  submitStatus.success 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Wedding fleet query"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Enquiry Classification</label>
                    <select
                      name="contactType"
                      value={form.contactType}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a]"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="business">Corporate / Business Accounts</option>
                      <option value="support">Customer Support & Help Desk</option>
                      <option value="feedback">Feedback & Reviews</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Your Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Provide details about your query..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#e2383a] focus:border-[#e2383a] resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#e2383a] hover:bg-black text-white font-black uppercase text-xs tracking-widest rounded-lg transition disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? 'Submitting query...' : 'Submit Inquiry'}
                </button>
              </form>

            </div>
          </motion.div>

        </div>

        {/* Embedded Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
        >
          <iframe 
            title="Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17540.064205947336!2d85.26364976251467!3d23.296946071994874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f51ffa6c78f097%3A0xdfd32351791ac42e!2sDhurwa%2C%20Ranchi%2C%20Jharkhand!5e1!3m2!1sen!2sin!4v1737111020311!5m2!1sen!2sin" 
            width="100%" 
            height="280" 
            style={{ border: 0, minHeight: '220px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
