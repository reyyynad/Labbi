const express = require('express');
const Availability = require('../models/Availability');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/availability/my
// @desc    Get current provider's availability
// @access  Private (Provider only)
router.get('/my', protect, authorize('provider'), async (req, res) => {
  try {
    let availability = await Availability.findOne({ provider: req.user._id });
    
    // Create default availability if none exists
    if (!availability) {
      availability = await Availability.create({ provider: req.user._id });
    }
    
    res.status(200).json({
      success: true,
      data: {
        weeklySchedule: availability.weeklySchedule,
        availableDates: availability.availableDates,
        blockedDates: availability.blockedDates
      }
    });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/availability
// @desc    Update provider's availability
// @access  Private (Provider only)
router.put('/', protect, authorize('provider'), async (req, res) => {
  try {
    const { weeklySchedule, availableDates, blockedDates } = req.body;
    
    let availability = await Availability.findOne({ provider: req.user._id });
    
    if (!availability) {
      availability = new Availability({ provider: req.user._id });
    }
    
    if (weeklySchedule) {
      availability.weeklySchedule = weeklySchedule;
    }
    
    if (availableDates) {
      availability.availableDates = availableDates;
    }
    
    if (blockedDates) {
      availability.blockedDates = blockedDates;
    }
    
    availability.updatedAt = Date.now();
    await availability.save();
    
    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: {
        weeklySchedule: availability.weeklySchedule,
        availableDates: availability.availableDates,
        blockedDates: availability.blockedDates
      }
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/availability/provider/:providerId
// @desc    Get a provider's availability (for customers booking)
// @access  Public
router.get('/provider/:providerId', async (req, res) => {
  try {
    const availability = await Availability.findOne({ provider: req.params.providerId });
    
    if (!availability) {
      // Return default availability if none set
      return res.status(200).json({
        success: true,
        data: {
          weeklySchedule: {
            Monday: { enabled: true, start: '09:00', end: '17:00' },
            Tuesday: { enabled: true, start: '09:00', end: '17:00' },
            Wednesday: { enabled: true, start: '09:00', end: '17:00' },
            Thursday: { enabled: true, start: '09:00', end: '17:00' },
            Friday: { enabled: true, start: '09:00', end: '17:00' },
            Saturday: { enabled: false, start: '09:00', end: '17:00' },
            Sunday: { enabled: false, start: '09:00', end: '17:00' }
          },
          availableDates: [],
          blockedDates: [],
          bookedSlots: []
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        weeklySchedule: availability.weeklySchedule,
        availableDates: availability.availableDates,
        blockedDates: availability.blockedDates,
        bookedSlots: availability.bookedSlots.map(s => ({ date: s.date, time: s.time }))
      }
    });
  } catch (error) {
    console.error('Get provider availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/availability/slots/:providerId/:date
// @desc    Get available time slots for a specific date
// @access  Public
router.get('/slots/:providerId/:date', async (req, res) => {
  try {
    const { providerId, date } = req.params;
    
    let availability = await Availability.findOne({ provider: providerId });
    
    // If no availability record, create default slots
    if (!availability) {
      const dayOfWeek = new Date(date + 'T00:00:00').getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      if (isWeekend) {
        return res.status(200).json({
          success: true,
          data: []
        });
      }
      
      // Default 9 AM to 5 PM slots
      const slots = [];
      for (let hour = 9; hour < 17; hour++) {
        const timeStr = hour < 12 
          ? `${hour}:00 AM`
          : `${hour === 12 ? 12 : hour - 12}:00 PM`;
        slots.push({ time: timeStr, available: true });
      }
      
      return res.status(200).json({
        success: true,
        data: slots
      });
    }
    
    const slots = availability.getAvailableSlots(date);
    
    res.status(200).json({
      success: true,
      data: slots
    });
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/availability/book-slot
// @desc    Book a time slot (called when booking is created)
// @access  Private
router.post('/book-slot', protect, authorize('customer', 'provider'), async (req, res) => {
  try {
    const { providerId, date, time, bookingId } = req.body;
    
    let availability = await Availability.findOne({ provider: providerId });
    
    if (!availability) {
      availability = new Availability({ provider: providerId });
    }
    
    // Add the booked slot
    availability.bookedSlots.push({ date, time, bookingId });
    await availability.save();
    
    res.status(200).json({
      success: true,
      message: 'Slot booked successfully'
    });
  } catch (error) {
    console.error('Book slot error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/availability/free-slot
// @desc    Free a time slot (called when booking is cancelled)
// @access  Private
router.delete('/free-slot', protect, authorize('customer', 'provider'), async (req, res) => {
  try {
    const { providerId, date, time } = req.body;
    
    const availability = await Availability.findOne({ provider: providerId });
    
    if (availability) {
      availability.bookedSlots = availability.bookedSlots.filter(
        s => !(s.date === date && s.time === time)
      );
      await availability.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Slot freed successfully'
    });
  } catch (error) {
    console.error('Free slot error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

