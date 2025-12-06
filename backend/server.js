require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const serviceRoutes = require('./routes/services');
const adminRoutes = require('./routes/admin');
const availabilityRoutes = require('./routes/availability');

const app = express();

// Middleware
// CORS configuration - allow both localhost and production domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://labbi.vercel.app',
  process.env.FRONTEND_URL // Allow custom frontend URL from environment
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (origin.includes('.vercel.app')) {
      // Allow all Vercel preview deployments
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Increase body size limit to 50MB for base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/availability', availabilityRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Labbi API is running successfully!',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      bookings: '/api/bookings',
      reviews: '/api/reviews',
      services: '/api/services',
      admin: '/api/admin'
    },
    emailConfig: {
      smtpUser: process.env.SMTP_USER ? '✅ Configured' : '❌ Not configured',
      smtpPass: process.env.SMTP_PASS ? '✅ Configured (' + process.env.SMTP_PASS.length + ' chars)' : '❌ Not configured',
      smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com (default)',
      smtpPort: process.env.SMTP_PORT || '587 (default)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5001;

// Start server immediately
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Connect Database in background (non-blocking)
connectDB()
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('MongoDB Connection Failed:', err.message);
    console.error('Warning: Database connection failed. Some features may not work.');
    // Don't exit - allow server to run without DB for development
  });
