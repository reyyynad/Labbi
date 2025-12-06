const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');

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

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    console.log(`\n[REGISTRATION] Sending verification email to: ${user.email}`);
    try {
      const emailResult = await sendVerificationEmail(user.email, user.fullName, verificationToken, user.userType);
      console.log(`[REGISTRATION] Email service result:`, emailResult);
    } catch (emailError) {
      console.error('[REGISTRATION] Error sending verification email:', emailError);
      // Don't fail registration if email fails - user can resend later
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: userType === 'provider' ? 'Provider registration successful. Please check your email to verify your account.' : 'Registration successful. Please check your email to verify your account.',
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
          providerProfile: user.providerProfile,
          isEmailVerified: user.isEmailVerified
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

    // Check if email is verified (skip for admin users)
    if (user.userType !== 'admin' && !user.isEmailVerified) {
      console.log(`Login blocked: Email not verified for ${normalizedEmail}`);
      return res.status(403).json({
        success: false,
        message: 'Please verify your email address before logging in. Check your inbox for the verification link.',
        requiresVerification: true
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

// @route   POST /api/auth/google
// @desc    Authenticate with Google OAuth
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { credential, userType } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Initialize Google OAuth client
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    // Verify the Google ID token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      console.error('Google token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid Google token'
      });
    }

    const payload = ticket.getPayload();
    const { sub: googleId, email, name: fullName, picture: profileImage } = payload;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email not provided by Google'
      });
    }

    // Check if user exists with this email or Google ID
    let user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { googleId: googleId }
      ]
    });

    if (user) {
      // User exists - update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        user.isEmailVerified = true; // Google email is verified
        if (profileImage) {
          user.profileImage = profileImage;
        }
        await user.save();
      }
      
      // Update profile image if available and different
      if (profileImage && user.profileImage !== profileImage) {
        user.profileImage = profileImage;
        await user.save();
      }
    } else {
      // Create new user
      const userData = {
        fullName: fullName || 'User',
        email: email.toLowerCase(),
        googleId: googleId,
        authProvider: 'google',
        userType: userType || 'customer',
        isEmailVerified: true, // Google email is verified
        profileImage: profileImage || ''
      };

      // Add provider profile if userType is provider
      if (userType === 'provider') {
        userData.providerProfile = {
          bio: '',
          category: '',
          experience: '',
          title: '',
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

      user = await User.create(userData);
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Build response data
    const responseData = {
      id: user._id,
      name: user.fullName,
      fullName: user.fullName,
      email: user.email,
      role: user.userType,
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
      message: 'Google authentication successful',
      data: {
        token,
        user: responseData
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during Google authentication'
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

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Don't reveal if user exists or not (security best practice)
    // Always return success message
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send password reset email
    try {
      await sendPasswordResetEmail(user.email, user.fullName, resetToken);
      res.status(200).json({
        success: true,
        message: 'Password reset email sent. Please check your inbox.'
      });
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
      // Still return success to user, but log the error
      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token and check if it's not expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    // Set new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Generate new token for automatic login
    const authToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      data: {
        token: authToken,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType
        }
      }
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
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

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email address
// @access  Public
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token and check if it's not expired
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Verify the email
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Public
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    try {
      const emailResult = await sendVerificationEmail(user.email, user.fullName, verificationToken, user.userType);
      
      // If SMTP is not configured, include the link in the response
      if (emailResult.logged) {
        console.log('[RESEND] SMTP not configured - email logged to console');
        res.status(200).json({
          success: true,
          message: 'Verification email logged (SMTP not configured). Check server logs for the verification link.',
          logged: true,
          link: emailResult.link
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Verification email sent successfully'
        });
      }
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please check SMTP configuration or try again later.'
      });
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

