const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Weekly schedule - default working hours for each day
  weeklySchedule: {
    Monday: { 
      enabled: { type: Boolean, default: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Tuesday: { 
      enabled: { type: Boolean, default: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Wednesday: { 
      enabled: { type: Boolean, default: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Thursday: { 
      enabled: { type: Boolean, default: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Friday: { 
      enabled: { type: Boolean, default: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Saturday: { 
      enabled: { type: Boolean, default: false },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    Sunday: { 
      enabled: { type: Boolean, default: false },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    }
  },
  // Specific dates marked as available (override weekly schedule)
  availableDates: [{
    type: String // Format: YYYY-MM-DD
  }],
  // Specific dates that are blocked (vacation, holidays, etc.)
  blockedDates: [{
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    reason: { type: String, default: 'Unavailable' }
  }],
  // Booked time slots (to prevent double booking)
  bookedSlots: [{
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:MM AM/PM
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
availabilitySchema.index({ provider: 1 });

// Method to check if a specific date and time is available
availabilitySchema.methods.isSlotAvailable = function(dateStr, timeStr) {
  // Check if date is blocked
  const isBlocked = this.blockedDates.some(b => b.date === dateStr);
  if (isBlocked) return false;
  
  // Check if slot is already booked
  const isBooked = this.bookedSlots.some(s => s.date === dateStr && s.time === timeStr);
  if (isBooked) return false;
  
  // Check if date is in available dates or falls on an enabled day
  const date = new Date(dateStr + 'T00:00:00');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[date.getDay()];
  
  // If there are specific available dates, check those first
  if (this.availableDates.length > 0) {
    return this.availableDates.includes(dateStr);
  }
  
  // Otherwise, check the weekly schedule
  return this.weeklySchedule[dayName]?.enabled || false;
};

// Method to get available time slots for a specific date
availabilitySchema.methods.getAvailableSlots = function(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[date.getDay()];
  
  // Check if date is blocked
  const isBlocked = this.blockedDates.some(b => b.date === dateStr);
  if (isBlocked) return [];
  
  // Get schedule for this day
  const daySchedule = this.weeklySchedule[dayName];
  if (!daySchedule || !daySchedule.enabled) return [];
  
  // Generate time slots
  const slots = [];
  const startHour = parseInt(daySchedule.start.split(':')[0]);
  const endHour = parseInt(daySchedule.end.split(':')[0]);
  
  for (let hour = startHour; hour < endHour; hour++) {
    const timeStr = hour < 12 
      ? `${hour === 0 ? 12 : hour}:00 AM`
      : `${hour === 12 ? 12 : hour - 12}:00 PM`;
    
    // Check if this slot is booked
    const isBooked = this.bookedSlots.some(s => s.date === dateStr && s.time === timeStr);
    
    slots.push({
      time: timeStr,
      available: !isBooked
    });
  }
  
  return slots;
};

module.exports = mongoose.model('Availability', availabilitySchema);

