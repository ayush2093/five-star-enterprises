import React from 'react';
import { Star, Shield, Scale, AlertTriangle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

const TermsOfService = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen pb-16">
      <PageHeader title="Terms of Service" breadcrumbs={[{ label: "Terms" }]} />
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
              <FileText size={16} className="text-[#e2383a]" /> 1. Booking Terms
            </h3>
            <p>
              By reserving a vehicle with Five Star Enterprises, you agree to provide accurate customer and trip details. For self-drive bookings, the driver must possess a valid driver's license matching national/local requirements at the time of pickup.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <Shield size={16} className="text-[#e2383a]" /> 2. Vehicle Usage
            </h3>
            <p>
              Vehicles must be driven in compliance with local speed limits, cargo weights, and road safety regulations. Use of vehicles for racing, commercial haulage, or transporting prohibited substances is strictly forbidden.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#e2383a]" /> 3. Cancellations & Refunds
            </h3>
            <p>
              Cancellations made 24 hours prior to the scheduled pickup time will qualify for a full refund. Refunds for cancellations after this period will be subject to a standard processing fee.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-gray-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
              <Star size={16} className="text-[#e2383a]" /> 4. Liability Limitation
            </h3>
            <p>
              Five Star Enterprises is not responsible for secondary losses resulting from scheduling delays, flight cancellations, or mechanical disruptions during chauffeur rides.
            </p>
          </section>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsOfService;