const express = require('express');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews by current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews.map(review => ({
        id: review._id,
        service: review.serviceName,
        provider: review.providerName,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt
      }))
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Find the booking
    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
    }

    if (booking.hasReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking'
      });
    }

    // Create review
    const review = await Review.create({
      booking: bookingId,
      customer: req.user._id,
      provider: booking.provider,
      providerName: booking.providerName,
      service: booking.service,
      serviceName: booking.serviceName,
      rating,
      comment
    });

    // Mark booking as reviewed
    booking.hasReview = true;
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: {
        id: review._id,
        service: review.serviceName,
        provider: review.providerName,
        rating: review.rating,
        comment: review.comment
      }
    });
  } catch (error) {
    console.error('Create review error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   GET /api/reviews/provider/:providerId
// @desc    Get all reviews for a provider
// @access  Public
router.get('/provider/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('customer', 'fullName')
      .sort({ createdAt: -1 })
      .lean();

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.status(200).json({
      success: true,
      count: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      data: reviews.map(review => ({
        id: review._id,
        service: review.serviceName,
        customerName: review.customer?.fullName || 'Anonymous',
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt
      }))
    });
  } catch (error) {
    console.error('Get provider reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

