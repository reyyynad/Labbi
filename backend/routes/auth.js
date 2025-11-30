const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      userType,
      phone,
      location,
      // Provider-specific fields
      category,
      bio,
      experience
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Build user data
    const userData = {
      fullName,
      email: email.toLowerCase(),
      password,
      userType: userType || 'customer',
      phone: phone || '',
      location: location || ''
    };

    // Add provider-specific profile data if registering as provider
    if (userType === 'provider') {
      userData.providerProfile = {
        bio: bio || '',
        category: category || '',
        experience: experience || '',
        title: `${category ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''} Specialist`,
        isVerified: false,
        isIdentityVerified: false,
        isBackgroundChecked: false,
        rating: 0,
        totalReviews: 0,
        totalBookings: 0,
        totalEarnings: 0,
        thisMonthEarnings: 0,
        responseRate: 100,
        completionRate: 100
      };
    }

    // Create user
    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: userType === 'provider' ? 'Provider registration successful' : 'Registration successful',
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
          phone: user.phone,
          location: user.location,
          initials: user.getInitials(),
          memberSince: user.getMemberSince(),
          providerProfile: user.providerProfile
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find user and include password for comparison
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      console.log(`Login failed: User not found for email ${normalizedEmail}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Login failed: Invalid password for email ${normalizedEmail}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log(`Login successful: ${normalizedEmail} (${user.userType})`);

    // Generate token
    const token = generateToken(user._id);

    // Build response data
    const responseData = {
      id: user._id,
      name: user.fullName, // For compatibility with frontend
      fullName: user.fullName,
      email: user.email,
      role: user.userType, // For compatibility with frontend (admin/customer/provider)
      userType: user.userType,
      phone: user.phone,
      location: user.location,
      initials: user.getInitials(),
      memberSince: user.getMemberSince(),
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      notifications: user.notifications
    };

    // Include provider profile if user is a provider
    if (user.userType === 'provider' && user.providerProfile) {
      responseData.providerProfile = user.providerProfile;
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: responseData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        location: user.location,
        initials: user.getInitials(),
        memberSince: user.getMemberSince(),
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        notifications: user.notifications,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }

    // In a real app, you would send an email here
    // For now, just return success
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/update-password
// @desc    Update password
// @access  Private
router.put('/update-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      data: { token }
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

