const express = require('express');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings for current user (customer or provider)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    
    // Build query based on user type
    let query = {};
    if (req.user.userType === 'provider') {
      query.provider = req.user._id;
    } else {
      query.customer = req.user._id;
    }
    
    if (status && status !== 'All Bookings') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'fullName email phone')
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings.map(booking => ({
        id: booking._id,
        service: booking.serviceName,
        provider: booking.providerName,
        customer: booking.customer?.fullName || 'Customer',
        customerEmail: booking.customer?.email,
        customerPhone: booking.customer?.phone,
        customerInitials: booking.customer?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C',
        date: booking.displayDate,
        time: booking.time,
        location: booking.location,
        status: booking.status,
        price: booking.pricing?.total || 0,
        hasReview: booking.hasReview,
        canCancel: ['Upcoming', 'Pending', 'Confirmed'].includes(booking.status),
        canReschedule: ['Upcoming', 'Pending', 'Confirmed'].includes(booking.status),
        canReview: booking.status === 'Completed' && !booking.hasReview,
        createdAt: booking.createdAt
      }))
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/provider
// @desc    Get all bookings for current provider
// @access  Private (Provider only)
router.get('/provider', protect, async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = { provider: req.user._id };
    if (status && status !== 'All Bookings') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'fullName email phone')
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings.map(booking => ({
        id: booking._id,
        service: booking.serviceName,
        customer: booking.customer?.fullName || 'Customer',
        customerEmail: booking.customer?.email,
        customerPhone: booking.customer?.phone,
        customerInitials: booking.customer?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C',
        date: booking.displayDate,
        time: booking.time,
        location: booking.location,
        status: booking.status,
        price: booking.pricing?.total || 0,
        hasReview: booking.hasReview,
        createdAt: booking.createdAt
      }))
    });
  } catch (error) {
    console.error('Get provider bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: booking._id,
        service: booking.serviceName,
        provider: booking.providerName,
        date: booking.displayDate,
        time: booking.time,
        duration: booking.duration,
        location: booking.location,
        status: booking.status,
        pricing: booking.pricing,
        notes: booking.notes,
        hasReview: booking.hasReview,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      serviceImage,
      providerId,
      providerName,
      date,
      displayDate,
      time,
      duration,
      location,
      pricing,
      notes
    } = req.body;

    const booking = await Booking.create({
      customer: req.user._id,
      service: serviceId,
      serviceName,
      serviceImage,
      provider: providerId,
      providerName,
      date: new Date(date),
      displayDate,
      time,
      duration: duration || '1 hour',
      location,
      pricing: {
        serviceCost: pricing.serviceCost,
        platformFee: pricing.platformFee || 0,
        tax: pricing.tax || 0,
        total: pricing.total
      },
      notes: notes || '',
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: booking._id,
        service: booking.serviceName,
        provider: booking.providerName,
        date: booking.displayDate,
        time: booking.time,
        location: booking.location,
        status: booking.status,
        pricing: booking.pricing
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/reschedule
// @desc    Reschedule a booking
// @access  Private
router.put('/:id/reschedule', protect, async (req, res) => {
  try {
    const { date, displayDate, time } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (!booking.canReschedule()) {
      return res.status(400).json({
        success: false,
        message: 'This booking cannot be rescheduled'
      });
    }

    booking.date = new Date(date);
    booking.displayDate = displayDate;
    booking.time = time;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking rescheduled successfully',
      data: {
        id: booking._id,
        date: booking.displayDate,
        time: booking.time
      }
    });
  } catch (error) {
    console.error('Reschedule booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const { reason } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      customer: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (!booking.canCancel()) {
      return res.status(400).json({
        success: false,
        message: 'This booking cannot be cancelled'
      });
    }

    booking.status = 'Cancelled';
    booking.cancellationReason = reason || '';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (for providers/admin)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Upcoming', 'Confirmed', 'Completed', 'Cancelled', 'Pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      data: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/accept
// @desc    Accept a pending booking (Provider only)
// @access  Private
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify the provider owns this booking
    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to accept this booking'
      });
    }

    if (booking.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be accepted'
      });
    }

    booking.status = 'Confirmed';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking accepted successfully',
      data: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Accept booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/decline
// @desc    Decline a pending booking (Provider only)
// @access  Private
router.put('/:id/decline', protect, async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify the provider owns this booking
    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to decline this booking'
      });
    }

    if (booking.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be declined'
      });
    }

    booking.status = 'Cancelled';
    booking.cancellationReason = reason || 'Declined by provider';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking declined',
      data: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Decline booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/complete
// @desc    Mark a booking as completed (Provider only)
// @access  Private
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify the provider owns this booking
    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (booking.status !== 'Confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed bookings can be marked as completed'
      });
    }

    booking.status = 'Completed';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking marked as completed',
      data: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Complete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/provider/stats
// @desc    Get booking stats for provider dashboard
// @access  Private (Provider only)
router.get('/provider/stats', protect, async (req, res) => {
  try {
    const providerId = req.user._id;

    // Get total bookings count
    const totalBookings = await Booking.countDocuments({ provider: providerId });

    // Get pending bookings count
    const pendingBookings = await Booking.countDocuments({ 
      provider: providerId, 
      status: 'Pending' 
    });

    // Get completed bookings count
    const completedBookings = await Booking.countDocuments({ 
      provider: providerId, 
      status: 'Completed' 
    });

    // Calculate total revenue from completed bookings
    const completedBookingsData = await Booking.find({ 
      provider: providerId, 
      status: 'Completed' 
    });
    
    const totalRevenue = completedBookingsData.reduce((sum, booking) => {
      return sum + (booking.pricing?.total || 0);
    }, 0);

    // Get this month's earnings
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthBookings = await Booking.find({
      provider: providerId,
      status: 'Completed',
      createdAt: { $gte: startOfMonth }
    });

    const thisMonthEarnings = thisMonthBookings.reduce((sum, booking) => {
      return sum + (booking.pricing?.total || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalRevenue,
        thisMonthEarnings
      }
    });
  } catch (error) {
    console.error('Get provider stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

