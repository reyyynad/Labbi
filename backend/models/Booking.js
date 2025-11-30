const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  providerName: {
    type: String,
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceImage: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  },
  displayDate: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '1 hour'
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Confirmed', 'Completed', 'Cancelled', 'Pending'],
    default: 'Pending'
  },
  pricing: {
    serviceCost: { type: Number, required: true },
    platformFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  notes: {
    type: String,
    default: ''
  },
  hasReview: {
    type: Boolean,
    default: false
  },
  cancellationReason: {
    type: String,
    default: ''
  },
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

// Virtual for formatted price
bookingSchema.virtual('formattedPrice').get(function() {
  return `SR${this.pricing.total.toFixed(2)}`;
});

// Method to check if booking can be cancelled
bookingSchema.methods.canCancel = function() {
  return ['Upcoming', 'Pending', 'Confirmed'].includes(this.status);
};

// Method to check if booking can be rescheduled
bookingSchema.methods.canReschedule = function() {
  return ['Upcoming', 'Pending', 'Confirmed'].includes(this.status);
};

// Method to check if booking can be reviewed
bookingSchema.methods.canReview = function() {
  return this.status === 'Completed' && !this.hasReview;
};

module.exports = mongoose.model('Booking', bookingSchema);

