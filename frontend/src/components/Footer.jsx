import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Brief */}
          <div className="space-y-6 text-left">
            <Link to="/" className="flex items-center group">
              <div className="bg-white rounded-xl p-2.5 shadow-lg flex items-center justify-center transition duration-300 group-hover:scale-105">
                <img 
                  src={logoImg} 
                  alt="Five Star Enterprises Logo" 
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Luxury, comfort, and hassle-free travel. Offering premium self-drive rentals, airport transfers, corporate plans, and custom chauffeur services in Ranchi and Jharkhand.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/919939753351"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-black mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#e2383a] transition">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#e2383a] transition">Our Services</Link>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-[#e2383a] transition">Best Price Guarantee</a>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#e2383a] transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#e2383a] transition">Privacy & Cookies Policy</Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-black mb-6">
              Support Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-[#e2383a] transition">Contact Us</Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#e2383a] transition">FAQ</a>
              </li>
              <li>
                <a href="#payment-options" className="hover:text-[#e2383a] transition">Payment Options</a>
              </li>
              <li>
                <a href="#tips" className="hover:text-[#e2383a] transition">Booking Tips</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#e2383a] transition">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-black mb-6">
              Meet Us !!
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#e2383a] mt-1 flex-shrink-0" />
                <span>Smart City, Ranchi, Jharkhand</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#e2383a] flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span>+91 9939753351</span>
                  <span className="text-xs text-gray-500">Landline: 0651-3150347</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#e2383a] flex-shrink-0" />
                <span>info@thecarclub.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Five Star Enterprises. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
