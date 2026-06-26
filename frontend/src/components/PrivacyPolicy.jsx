import React from 'react';
import { Star, Shield, Lock, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Privacy Policy" breadcrumbs={[{ label: "Privacy" }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-sm text-gray-600 leading-relaxed bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm text-left"
        >
          
          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <Lock size={16} className="text-[#e2383a]" /> 1. Information Collection
            </h3>
            <p>
              We collect information that you provide directly to us when creating bookings, saving custom vehicle specs, or submitting contact inquiries. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-gray-500">
              <li>Customer Details: Name, email, phone number.</li>
              <li>Trip Parameters: Pickup and drop-off coordinates, date, timing, and travel selections.</li>
              <li>Saved Specs: Custom paint layers, seat selections, and amenities combinations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <Eye size={16} className="text-[#e2383a]" /> 2. How We Use Information
            </h3>
            <p>
              Your data is utilized solely to process booking reservations, maintain customized specifications under your browser's local cache or profile, optimize journey suggestions, and coordinate chauffeur operations.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} className="text-[#e2383a]" /> 3. Data Safety & Protection
            </h3>
            <p>
              We enforce strict encryption protocols to safeguard passenger records and billing payloads. Payment transfers are secured directly through our verified integrations, and we never store raw credit card numbers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <Star size={16} className="text-[#e2383a]" /> 4. Contacts
            </h3>
            <p>
              For concerns regarding customer records or account deletion, reach out to our privacy coordinator at <a href="mailto:info@thecarclub.in" className="text-[#e2383a] underline font-semibold">info@thecarclub.in</a>.
            </p>
          </section>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;