const express = require('express');
const router = express.Router();
const { sendVerificationEmail } = require('../utils/emailService');

// @route   POST /api/test-email
// @desc    Test email sending (for debugging)
// @access  Public
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('\n=== TEST EMAIL REQUEST ===');
    console.log('Email:', email);
    console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Not set');
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ Set (' + process.env.SMTP_PASS.length + ' chars)' : '❌ Not set');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'https://labbi.vercel.app (default)');
    console.log('==========================\n');

    // Generate a test token
    const testToken = 'test-token-' + Date.now();
    
    // Try to send email
    const result = await sendVerificationEmail(email, 'Test User', testToken, 'customer');
    
    if (result.success) {
      if (result.logged) {
        return res.status(200).json({
          success: true,
          message: 'Email logged to console (SMTP not configured)',
          logged: true,
          link: result.link,
          debug: {
            smtpUser: process.env.SMTP_USER ? 'Set' : 'Not set',
            smtpPass: process.env.SMTP_PASS ? 'Set' : 'Not set',
            smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
            smtpPort: process.env.SMTP_PORT || '587'
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Test email sent successfully!',
          messageId: result.messageId
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error,
        debug: {
          smtpUser: process.env.SMTP_USER ? 'Set' : 'Not set',
          smtpPass: process.env.SMTP_PASS ? 'Set' : 'Not set',
          smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
          smtpPort: process.env.SMTP_PORT || '587'
        }
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   GET /api/test-email/config
// @desc    Check email configuration
// @access  Public
router.get('/test-email/config', (req, res) => {
  res.json({
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    smtpUser: process.env.SMTP_USER ? '✅ Set' : '❌ Not set',
    smtpPass: process.env.SMTP_PASS ? '✅ Set (' + process.env.SMTP_PASS.length + ' chars)' : '❌ Not set',
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com (default)',
    smtpPort: process.env.SMTP_PORT || '587 (default)',
    frontendUrl: process.env.FRONTEND_URL || 'https://labbi.vercel.app (default)'
  });
});

module.exports = router;

