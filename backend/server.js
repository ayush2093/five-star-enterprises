import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import passport from './config/passport.js';

// Routes
import authRoutes from './routes/auth.js';
import designRoutes from './routes/designRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profile.js';
import carRoutes from './routes/carRoutes.js';

// ================== APP SETUP ==================
const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const useSecureCookies = isProduction || frontendUrl.startsWith('https://');

// ================== DATABASE ==================
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fivestarent')
  .then(() => console.log('✅ MongoDB Connected (fivestarent)'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ================== MIDDLEWARE ==================
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.set('trust proxy', 1);

// ================== CORS ==================
const allowedOrigins = [
  'http://localhost:5173',
  'https://fivestar-enterprises.vercel.app'
];

if (frontendUrl && !allowedOrigins.includes(frontendUrl)) {
  allowedOrigins.push(frontendUrl);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all during development/testing
      }
    },
    credentials: true
  })
);

// ================== SESSION ==================
app.use(
  session({
    name: 'fivestarent.sid',
    secret: process.env.SESSION_SECRET || 'five-star-enterprises-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/fivestarent',
      ttl: 24 * 60 * 60
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: useSecureCookies,
      sameSite: useSecureCookies ? 'none' : 'lax'
    }
  })
);

// ================== PASSPORT ==================
app.use(passport.initialize());
app.use(passport.session());

// ================== ROUTES ==================
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cars', carRoutes);

// ================== HEALTH & TEST ==================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Five Star Enterprises Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Test endpoint works!' });
});

app.get('/', (req, res) => {
  res.send('Welcome to Five Star Enterprises API');
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Payload too large',
      message: 'The request payload exceeds the maximum allowed size'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`\n🚀 Five Star Enterprises Server running on port ${PORT}`);
  console.log(`🔐 Google Auth → /api/auth/google`);
  console.log(`💳 Razorpay → /api/payment/create-order`);
  console.log(`🧪 Health → /api/health\n`);
});
