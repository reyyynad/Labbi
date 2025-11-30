const { protect, authorize } = require('./auth');

// Admin-only authorization middleware
// Combines protect (JWT verification) + authorize (admin role check)
const adminAuth = [protect, authorize('admin')];

module.exports = { adminAuth };

