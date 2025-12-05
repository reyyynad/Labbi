const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [50, 'Description must be at least 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    validate: {
      validator: function(value) {
        // Allow predefined categories from SignupProvider or any custom category (non-empty string)
        const validCategories = [
          'home-services',
          'beauty',
          'education',
          'tech',
          'events',
          'health',
          'business',
          'other'
        ];
        // Allow enum values or any custom category (must be non-empty string)
        return validCategories.includes(value) || (typeof value === 'string' && value.trim().length > 0);
      },
      message: 'Category must be a valid predefined category or a custom category name'
    }
  },
  subcategory: {
    type: String,
    default: ''
  },
  pricingType: {
    type: String,
    enum: ['hourly', 'fixed', 'session'],
    default: 'hourly'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  sessionDuration: {
    type: Number,
    default: 1 // in hours
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending', 'Rejected'],
    default: 'Pending'
  },
  bookingsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  location: {
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

// Index for efficient queries
serviceSchema.index({ provider: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ status: 1 });

// Virtual for formatted price
serviceSchema.virtual('formattedPrice').get(function() {
  const suffix = this.pricingType === 'hourly' ? '/hr' : this.pricingType === 'session' ? '/session' : '';
  return `SR${this.price}${suffix}`;
});

// Virtual for price type label
serviceSchema.virtual('priceTypeLabel').get(function() {
  const labels = {
    hourly: 'hour',
    fixed: 'fixed',
    session: 'session'
  };
  return labels[this.pricingType] || 'hour';
});

// NOTE: Removed auto-populate middleware to avoid issues with queries by provider ID
// Populate provider explicitly when needed using .populate()

module.exports = mongoose.model('Service', serviceSchema);

