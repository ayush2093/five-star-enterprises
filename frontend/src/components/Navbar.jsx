import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaBars, FaTimes, FaStar, FaFolder, FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import logoImg from '../assets/logo.png';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const cartCount = getCartItemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/cars', label: 'Cars' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Contact Bar - Red background, white text */}
      <div className="bg-[#e2383a] text-white py-1.5 px-4 text-xs font-medium z-[101] relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a href="tel:9939753351" className="flex items-center gap-1.5 hover:underline">
              <FaPhone size={11} /> <span className="hidden xs:inline">9939753351</span><span className="xs:hidden">Call Us</span>
            </a>
            <a href="mailto:info@thecarclub.in" className="hidden sm:flex items-center gap-1.5 hover:underline">
              <FaEnvelope size={11} /> info@thecarclub.in
            </a>
          </div>
          <div className="flex gap-3">
            <a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition">
              <FaTwitter size={13} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition">
              <FaFacebook size={13} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition">
              <FaInstagram size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 bg-[#212529]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'relative bg-[#212529] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo (Left) */}
          <RouterLink to="/" className="flex items-center group flex-shrink-0">
            <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-lg flex items-center justify-center transition duration-300 group-hover:scale-105">
              <img 
                src={logoImg} 
                alt="Five Star Enterprises Logo" 
                className="h-10 sm:h-14 md:h-16 w-auto object-contain"
              />
            </div>
          </RouterLink>

          {/* Navigation Links (Center) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <RouterLink
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-black transition-all ${
                    active 
                      ? 'text-[#e2383a] border-b-2 border-[#e2383a]' 
                      : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-500'
                  }`}
                >
                  {item.label}
                </RouterLink>
              );
            })}
          </div>

          {/* Action Buttons (Right) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* My Bookings */}
            <RouterLink
              to="/my-bookings"
              className={`p-2.5 rounded-full border transition-all ${
                isActive('/my-bookings')
                  ? 'bg-[#e2383a] border-[#e2383a] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title="My Bookings"
            >
              <FaFolder size={15} />
            </RouterLink>

            {/* Cart */}
            <RouterLink
              to="/cart"
              className={`relative p-2.5 rounded-full border transition-all ${
                isActive('/cart')
                  ? 'bg-[#e2383a] border-[#e2383a] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Cart"
            >
              <FaShoppingCart size={15} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e2383a] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#212529]">
                  {cartCount}
                </span>
              )}
            </RouterLink>

            {/* Profile / Login */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <RouterLink to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/20 flex items-center justify-center overflow-hidden">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <FiUser className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-300 hidden xl:inline">
                    {user.firstName || 'Guest'}
                  </span>
                </RouterLink>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-white transition"
                  title="Logout"
                >
                  <FiLogOut size={15} />
                </button>
              </div>
            ) : (
              <RouterLink
                to="/login"
                className="px-5 py-2 rounded-lg bg-[#e2383a] hover:bg-white text-white hover:text-black text-[10px] uppercase font-black tracking-wider transition-all"
              >
                Sign In
              </RouterLink>
            )}
          </div>

          {/* Mobile Toggle & Mini Cart */}
          <div className="flex lg:hidden items-center gap-3">
            <RouterLink to="/cart" className="relative p-2 text-gray-300 hover:text-white">
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e2383a] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </RouterLink>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 bg-[#212529]/98 z-[99] lg:hidden flex flex-col p-5 border-b border-white/10 shadow-xl overflow-y-auto"
            style={{ top: isScrolled ? '58px' : '88px', maxHeight: 'calc(100vh - 88px)' }}
          >
            <div className="flex flex-col gap-5 text-center">
              {navItems.map((item) => (
                <RouterLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-black tracking-wider uppercase transition ${
                    isActive(item.path) ? 'text-[#e2383a]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </RouterLink>
              ))}

              <RouterLink
                key="/my-bookings"
                to="/my-bookings"
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-black tracking-wider uppercase transition ${
                  isActive('/my-bookings') ? 'text-[#e2383a]' : 'text-gray-300 hover:text-white'
                }`}
              >
                My Bookings
              </RouterLink>

              {user ? (
                <div className="flex flex-col gap-4 border-t border-white/10 pt-4 mt-2">
                  <RouterLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-black text-gray-300 hover:text-white tracking-wider uppercase"
                  >
                    Profile
                  </RouterLink>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                    className="text-lg font-black text-[#e2383a] hover:text-red-400 tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <FiLogOut /> Log Out
                  </button>
                </div>
              ) : (
                <RouterLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-3 rounded-lg bg-[#e2383a] text-white font-black uppercase text-xs tracking-widest self-center mt-2"
                >
                  Sign In
                </RouterLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
