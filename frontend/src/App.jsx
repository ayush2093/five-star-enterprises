import { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaPhone, FaWhatsapp } from 'react-icons/fa'; // <-- Import WhatsApp & Phone icons
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes';
import Footer from './components/Footer';

// Loading spinner for initial auth check
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0b] text-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Loading Five Star Enterprises</p>
  </div>
);

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/user');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (!authChecked) {
    return <PageLoader />;
  }

  return (
    <ErrorBoundary>
      <CartProvider>
        <div className="min-h-screen bg-[#0d0d0e] text-white selection:bg-[#D4AF37] selection:text-black">
          <Navbar user={user} onLogout={handleLogout} />
          <div className="pt-16">
            <Suspense fallback={<PageLoader />}>
              <AppRoutes 
                user={user} 
                onLoginSuccess={handleLoginSuccess} 
                updateUser={updateUser} 
              />
            </Suspense>
          </div>
          <Footer />

          {/* Global Floating Action Menu (WhatsApp & Call Helpline) */}
          <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-auto">
            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/919939753351"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-600 transition duration-300 relative group animate-bounce"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp size={22} />
              <span className="absolute right-full mr-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                WhatsApp Support
              </span>
            </a>
            
            {/* Phone Helpline Icon */}
            <a
              href="tel:9939753351"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e2383a] text-white flex items-center justify-center shadow-2xl hover:bg-black transition duration-300 relative group"
              title="Call Helpline"
            >
              <FaPhone size={18} />
              <span className="absolute right-full mr-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Call Support
              </span>
            </a>
          </div>
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
