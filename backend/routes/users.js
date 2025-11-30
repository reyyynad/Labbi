const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if user is a provider
    if (user.userType === 'provider') {
      // Get provider-specific stats
      const totalServices = await Service.countDocuments({ provider: req.user._id });
      const totalBookings = await Booking.countDocuments({ provider: req.user._id });
      const completedBookings = await Booking.find({ provider: req.user._id, status: 'Completed' });
      const totalEarnings = completedBookings.reduce((sum, booking) => sum + (booking.pricing?.total || 0), 0);
      
      // Get this month's earnings
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const thisMonthBookings = completedBookings.filter(b => new Date(b.createdAt) >= startOfMonth);
      const thisMonthEarnings = thisMonthBookings.reduce((sum, booking) => sum + (booking.pricing?.total || 0), 0);

      // Get reviews stats
      const reviews = await Review.find({ provider: req.user._id });
      const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      // Get recent bookings for provider
      const recentBookings = await Booking.find({ provider: req.user._id })
        .populate('customer', 'fullName')
        .sort({ createdAt: -1 })
        .limit(3);

      return res.status(200).json({
        success: true,
        data: {
          profile: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            location: user.location,
            initials: user.getInitials(),
            memberSince: user.getMemberSince(),
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            userType: user.userType,
            providerProfile: user.providerProfile
          },
          stats: {
            totalServices,
            totalBookings,
            totalReviews: reviews.length,
            rating: Math.round(avgRating * 10) / 10,
            totalEarnings: Math.round(totalEarnings),
            thisMonthEarnings: Math.round(thisMonthEarnings)
          },
          recentBookings: recentBookings.map(booking => ({
            id: booking._id,
            service: booking.serviceName,
            customer: booking.customer?.fullName || 'Customer',
            date: booking.displayDate,
            status: booking.status,
            price: booking.pricing?.total || 0
          }))
        }
      });
    }

    // Customer profile
    const totalBookings = await Booking.countDocuments({ customer: req.user._id });
    const bookings = await Booking.find({ customer: req.user._id });
    const totalSpent = bookings.reduce((sum, booking) => sum + (booking.pricing?.total || 0), 0);
    const favoriteServices = user.favoriteServices?.length || 0;

    // Get recent bookings
    const recentBookings = await Booking.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: {
        profile: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          location: user.location,
          initials: user.getInitials(),
          memberSince: user.getMemberSince(),
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          userType: user.userType
        },
        stats: {
          totalBookings,
          totalSpent: Math.round(totalSpent),
          favoriteServices
        },
        recentBookings: recentBookings.map(booking => ({
          id: booking._id,
          service: booking.serviceName,
          provider: booking.providerName,
          date: booking.displayDate,
          status: booking.status,
          price: booking.pricing?.total || 0
        }))
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { fullName, email, phone, location, bio, title, experience, category } = req.body;

    // Check if email is being changed and already exists
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    const updatedFields = {};
    if (fullName) updatedFields.fullName = fullName;
    if (email) updatedFields.email = email.toLowerCase();
    if (phone !== undefined) updatedFields.phone = phone;
    if (location !== undefined) updatedFields.location = location;

    // Handle provider-specific fields
    const user = await User.findById(req.user._id);
    if (user.userType === 'provider') {
      if (bio !== undefined) updatedFields['providerProfile.bio'] = bio;
      if (title !== undefined) updatedFields['providerProfile.title'] = title;
      if (experience !== undefined) updatedFields['providerProfile.experience'] = experience;
      if (category !== undefined) updatedFields['providerProfile.category'] = category;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    const responseData = {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      location: updatedUser.location,
      initials: updatedUser.getInitials()
    };

    // Include provider profile in response if provider
    if (updatedUser.userType === 'provider') {
      responseData.providerProfile = updatedUser.providerProfile;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: responseData
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/users/notifications
// @desc    Update notification preferences
// @access  Private
router.put('/notifications', protect, async (req, res) => {
  try {
    const { email, sms, marketing } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'notifications.email': email !== undefined ? email : true,
          'notifications.sms': sms !== undefined ? sms : true,
          'notifications.marketing': marketing !== undefined ? marketing : false
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Notification preferences updated',
      data: user.notifications
    });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', protect, async (req, res) => {
  try {
    // Delete user's bookings
    await Booking.deleteMany({ customer: req.user._id });

    // Delete user
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

