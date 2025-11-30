const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuth');
const {
  getDashboard,
  getUsers,
  getUserById,
  updateUserStatus,
  getServices,
  approveService,
  rejectService,
  getBookings,
  getAnalytics
} = require('../controllers/adminController');

// All admin routes require admin authentication
router.use(adminAuth);

// Dashboard
router.get('/dashboard', getDashboard);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/status', updateUserStatus);

// Service management
router.get('/services', getServices);
router.put('/services/:id/approve', approveService);
router.put('/services/:id/reject', rejectService);

// Booking management
router.get('/bookings', getBookings);

// Analytics
router.get('/analytics', getAnalytics);

module.exports = router;

