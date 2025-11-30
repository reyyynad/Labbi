const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password by default in queries
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  userType: {
    type: String,
    enum: ['customer', 'provider', 'admin'],
    default: 'customer'
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Suspended'],
    default: 'Active'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false }
  },
  favoriteServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  // Provider-specific fields
  providerProfile: {
    bio: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      enum: ['home-services', 'beauty', 'education', 'tech', 'events', 'health', 'business', 'other', ''],
      default: ''
    },
    experience: {
      type: String,
      enum: ['0-1', '1-3', '3-5', '5-10', '10+', ''],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isIdentityVerified: {
      type: Boolean,
      default: false
    },
    isBackgroundChecked: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    thisMonthEarnings: {
      type: Number,
      default: 0
    },
    responseRate: {
      type: Number,
      default: 100
    },
    completionRate: {
      type: Number,
      default: 100
    }
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

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user initials
userSchema.methods.getInitials = function() {
  const names = this.fullName.split(' ');
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return this.fullName.substring(0, 2).toUpperCase();
};

// Format member since date
userSchema.methods.getMemberSince = function() {
  const options = { year: 'numeric', month: 'long' };
  return this.createdAt.toLocaleDateString('en-US', options);
};

module.exports = mongoose.model('User', userSchema);

