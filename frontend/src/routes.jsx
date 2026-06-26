import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load helper with retry logic
const lazyLoadComponent = (importFunc) => {
  return lazy(() =>
    importFunc().catch(() => {
      console.error('Failed to load chunk, reloading...');
      return importFunc();
    })
  );
};

// Lazy load components with retry
const Login = lazyLoadComponent(() => import('./components/Login'));
const Profile = lazyLoadComponent(() => import('./components/Profile'));
const LandingPage = lazyLoadComponent(() => import('./components/LandingPage'));
const About = lazyLoadComponent(() => import('./components/About'));
const Services = lazyLoadComponent(() => import('./components/Services'));
const Cars = lazyLoadComponent(() => import('./components/Cars'));
const Blog = lazyLoadComponent(() => import('./components/Blog'));
const Contact = lazyLoadComponent(() => import('./components/Contact'));
const Cart = lazyLoadComponent(() => import('./components/Cart'));
const MyBookings = lazyLoadComponent(() => import('./components/MyBookings'));
const OTPVerification = lazyLoadComponent(() => import('./components/OTPVerification'));
const Privacy = lazyLoadComponent(() => import('./components/PrivacyPolicy'));
const Terms = lazyLoadComponent(() => import('./components/TermsOfService'));

// Loading spinner for routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e2383a]"></div>
  </div>
);

const AppRoutes = ({ user, onLoginSuccess, updateUser }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/my-bookings" element={<MyBookings user={user} />} />
        
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/profile" replace />
            ) : (
              <Login onLoginSuccess={onLoginSuccess} />
            )
          }
        />
        
        <Route
          path="/otp-verification"
          element={
            user ? (
              <Navigate to="/profile" replace />
            ) : (
              <OTPVerification />
            )
          }
        />
        
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} updateUser={updateUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/dashboard"
          element={
            user ? (
              <Profile user={user} updateUser={updateUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
