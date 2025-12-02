const express = require('express');
const Availability = require('../models/Availability');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/availability/my
// @desc    Get current provider's availability
// @access  Private (Provider only)
router.get('/my', protect, async (req, res) => {
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
router.put('/', protect, async (req, res) => {
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
      // No availability set - return indicator so frontend knows
      return res.status(200).json({
        success: true,
        data: {
          hasAvailability: false,
          weeklySchedule: {
            Monday: { enabled: false, start: '09:00', end: '17:00' },
            Tuesday: { enabled: false, start: '09:00', end: '17:00' },
            Wednesday: { enabled: false, start: '09:00', end: '17:00' },
            Thursday: { enabled: false, start: '09:00', end: '17:00' },
            Friday: { enabled: false, start: '09:00', end: '17:00' },
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
        hasAvailability: true,
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
    
    // If no availability record, return empty - provider must set availability
    if (!availability) {
      return res.status(200).json({
        success: true,
        hasAvailability: false,
        data: []
      });
    }
    
    const slots = availability.getAvailableSlots(date);
    
    res.status(200).json({
      success: true,
      hasAvailability: true,
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
router.post('/book-slot', protect, async (req, res) => {
  try {
    const { providerId, date, time, bookingId, duration } = req.body;
    
    let availability = await Availability.findOne({ provider: providerId });
    
    if (!availability) {
      availability = new Availability({ provider: providerId });
    }
    
    // Calculate how many slots to book based on duration
    const durationHours = parseInt(duration) || 1;
    
    // Parse the start time
    const parseTime = (timeStr) => {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return null;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3].toUpperCase();
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return hours;
    };
    
    const formatTime = (hour) => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
      return `${displayHour}:00 ${period}`;
    };
    
    const startHour = parseTime(time);
    
    if (startHour !== null) {
      // Book multiple consecutive slots based on duration
      for (let i = 0; i < durationHours; i++) {
        const slotTime = formatTime(startHour + i);
        // Check if slot is not already booked
        const isAlreadyBooked = availability.bookedSlots.some(
          s => s.date === date && s.time === slotTime
        );
        if (!isAlreadyBooked) {
          availability.bookedSlots.push({ date, time: slotTime, bookingId });
        }
      }
    } else {
      // Fallback: just book the single slot if time parsing fails
      availability.bookedSlots.push({ date, time, bookingId });
    }
    
    await availability.save();
    
    res.status(200).json({
      success: true,
      message: `${durationHours} slot(s) booked successfully`
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
router.delete('/free-slot', protect, async (req, res) => {
  try {
    const { providerId, date, time, duration } = req.body;
    
    const availability = await Availability.findOne({ provider: providerId });
    
    if (availability) {
      // Calculate how many slots to free based on duration
      const durationHours = parseInt(duration) || 1;
      
      // Parse the start time
      const parseTime = (timeStr) => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return null;
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours;
      };
      
      const formatTime = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:00 ${period}`;
      };
      
      const startHour = parseTime(time);
      
      if (startHour !== null && durationHours > 1) {
        // Free multiple consecutive slots based on duration
        const timesToFree = [];
        for (let i = 0; i < durationHours; i++) {
          timesToFree.push(formatTime(startHour + i));
        }
        
        availability.bookedSlots = availability.bookedSlots.filter(
          s => !(s.date === date && timesToFree.includes(s.time))
        );
      } else {
        // Free single slot
        availability.bookedSlots = availability.bookedSlots.filter(
          s => !(s.date === date && s.time === time)
        );
      }
      
      await availability.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Slot(s) freed successfully'
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

