const nodemailer = require('nodemailer');

// Check if we're in production (Render, Vercel, etc.)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER || process.env.VERCEL;

// Create reusable transporter object using SMTP transport
const createTransporter = async () => {
  // Debug: Check if env variables are loaded
  console.log('\n[EMAIL DEBUG] Checking SMTP configuration...');
  console.log('Environment:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
  console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Not set');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ Set (' + process.env.SMTP_PASS.length + ' chars)' : '❌ Not set');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
  
  // If SMTP is configured, use it
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('[EMAIL DEBUG] ✅ SMTP configured, creating transporter...\n');
    try {
      // Remove spaces from password (Gmail App Passwords sometimes have spaces)
      const password = process.env.SMTP_PASS.replace(/\s/g, '').trim();
      const port = parseInt(process.env.SMTP_PORT) || 587;
      const useSecure = port === 465;
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: port,
        secure: useSecure, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER.trim(),
          pass: password, // Use App Password for Gmail
        },
        tls: {
          // Do not fail on invalid certs
          rejectUnauthorized: false
        },
        // Add connection timeout - longer for production
        connectionTimeout: isProduction ? 30000 : 10000,
        greetingTimeout: isProduction ? 30000 : 10000,
        socketTimeout: isProduction ? 30000 : 10000,
      });
      
      // Verify connection (but don't fail if verify fails - try sending anyway)
      console.log('[EMAIL DEBUG] Verifying SMTP connection...');
      try {
        await transporter.verify();
        console.log('[EMAIL DEBUG] ✅ SMTP connection verified successfully!\n');
      } catch (verifyError) {
        console.warn('[EMAIL DEBUG] ⚠️ SMTP verify failed, but will try to send anyway:', verifyError.message);
        console.warn('[EMAIL DEBUG] This is sometimes normal - the connection might still work for sending\n');
      }
      return transporter;
    } catch (error) {
      console.error('[EMAIL DEBUG] ❌ SMTP connection failed:', error.message);
      console.error('[EMAIL DEBUG] Error code:', error.code);
      if (error.code === 'EAUTH') {
        console.error('[EMAIL DEBUG] Authentication failed - check your App Password');
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
        console.error('[EMAIL DEBUG] Connection timeout - trying alternative configuration...');
        // Try with different settings
        try {
          const password = process.env.SMTP_PASS.replace(/\s/g, '').trim();
          const altTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.SMTP_USER.trim(),
              pass: password,
            },
            tls: {
              rejectUnauthorized: false
            },
            connectionTimeout: isProduction ? 30000 : 10000,
            greetingTimeout: isProduction ? 30000 : 10000,
            socketTimeout: isProduction ? 30000 : 10000,
          });
          await altTransporter.verify();
          console.log('[EMAIL DEBUG] ✅ Alternative connection (port 465) works!\n');
          return altTransporter;
        } catch (altError) {
          console.error('[EMAIL DEBUG] Alternative connection also failed:', altError.message);
        }
      }
      console.error('[EMAIL DEBUG] Full error:', error);
      throw error;
    }
  }

  // If no SMTP configured
  const errorMessage = isProduction 
    ? 'SMTP configuration is required in production. Please set SMTP_USER and SMTP_PASS environment variables in your Render/Vercel dashboard.'
    : 'SMTP not configured - emails will be logged to console';
  
  console.log('\n⚠️  EMAIL CONFIGURATION REQUIRED ⚠️');
  console.log('[EMAIL DEBUG] ❌', errorMessage);
  
  if (!isProduction) {
    console.log('\nTo send emails, add these to your backend/.env file:');
    console.log('SMTP_USER=your-email@gmail.com');
    console.log('SMTP_PASS=your-app-password');
    console.log('SMTP_HOST=smtp.gmail.com (optional)');
    console.log('SMTP_PORT=587 (optional)');
    console.log('\n📧 Gmail Setup Instructions:');
    console.log('1. Enable 2-Step Verification: https://myaccount.google.com/security');
    console.log('2. Generate App Password: https://myaccount.google.com/apppasswords');
    console.log('3. Select "Mail" and generate password');
    console.log('4. Copy the 16-character password (remove spaces)');
    console.log('5. Add to backend/.env as SMTP_PASS');
    console.log('6. Restart backend server');
  }
  
  console.log('\n📦 For Production (Render/Vercel):');
  console.log('1. Go to your Render/Vercel dashboard');
  console.log('2. Navigate to Environment Variables');
  console.log('3. Add SMTP_USER, SMTP_PASS, SMTP_HOST (optional), SMTP_PORT (optional)');
  console.log('4. Redeploy your service');
  console.log('==========================================\n');
  
  // In production, throw an error instead of silently logging
  if (isProduction) {
    throw new Error('SMTP configuration is missing. Please configure SMTP_USER and SMTP_PASS environment variables in your deployment platform (Render/Vercel).');
  }
  
  // Return a mock transporter that will log instead of sending (only in development)
  return {
    sendMail: async (options) => {
      console.log('\n📧 EMAIL (SMTP not configured - logging instead):');
      console.log('From:', options.from);
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      if (options.html) {
        // Extract link from HTML
        const linkMatch = options.html.match(/href="([^"]+)"/);
        if (linkMatch) {
          console.log('Link:', linkMatch[1]);
        }
      }
      console.log('=====================================\n');
      return { messageId: 'mock-' + Date.now() };
    }
  };
};

// Send email verification email
const sendVerificationEmail = async (email, name, token, userType) => {
  try {
    const transporter = await createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://labbi.vercel.app'}/verify-email/${token}`;
    
    // Determine sender email
    const fromEmail = process.env.SMTP_USER || 'noreply@labbi.com';
    
    const mailOptions = {
      from: `"Labbi" <${fromEmail}>`,
      to: email,
      subject: 'Verify your Labbi account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #047857 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to Labbi!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="font-size: 16px;">Hi ${name},</p>
            
            <p style="font-size: 16px;">
              Thank you for registering as a ${userType === 'provider' ? 'service provider' : 'customer'} on Labbi! 
              To complete your registration and start using our platform, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; background: #047857; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Verify Email Address
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              Or copy and paste this link into your browser:
            </p>
            <p style="font-size: 12px; color: #999; word-break: break-all;">
              ${verificationUrl}
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              This link will expire in 24 hours. If you didn't create an account with Labbi, please ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Labbi. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Labbi!
        
        Hi ${name},
        
        Thank you for registering as a ${userType === 'provider' ? 'service provider' : 'customer'} on Labbi! 
        To complete your registration, please verify your email address by clicking the link below:
        
        ${verificationUrl}
        
        This link will expire in 24 hours. If you didn't create an account with Labbi, please ignore this email.
        
        © ${new Date().getFullYear()} Labbi. All rights reserved.
      `,
    };

    console.log('[EMAIL DEBUG] Attempting to send verification email...');
    const info = await transporter.sendMail(mailOptions);
    
    // Check if this was a mock send (development only)
    if (info.messageId && info.messageId.startsWith('mock-')) {
      console.log('📧 Verification email logged (SMTP not configured)');
      console.log('   Link:', verificationUrl);
      // In production, this should not happen (error would be thrown)
      if (isProduction) {
        throw new Error('Email sending failed: SMTP not configured');
      }
      return { success: true, messageId: info.messageId, logged: true, link: verificationUrl };
    }
    
    console.log('✅ Verification email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   To:', email);
    console.log('   From:', process.env.SMTP_USER);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('\n❌ ERROR sending verification email:');
    console.error('   Error message:', error.message);
    console.error('   Error code:', error.code);
    if (error.response) {
      console.error('   SMTP Response:', error.response);
    }
    
    // Log the verification link as fallback
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://labbi.vercel.app'}/verify-email/${token}`;
    console.log('\n=== EMAIL VERIFICATION (Fallback - Email Failed) ===');
    console.log(`To: ${email}`);
    console.log(`Verification Link: ${verificationUrl}`);
    console.log(`\nCommon fixes:`);
    console.log(`1. Check SMTP_USER and SMTP_PASS in backend/.env`);
    console.log(`2. Make sure you're using App Password (not regular password)`);
    console.log(`3. Remove spaces from App Password`);
    console.log(`4. Restart backend server after changing .env`);
    console.log(`5. Check if 2-Step Verification is enabled`);
    console.log('===================================================\n');
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const transporter = await createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'https://labbi.vercel.app'}/reset-password/${token}`;
    
    // Determine sender email
    const fromEmail = process.env.SMTP_USER || 'noreply@labbi.com';
    
    const mailOptions = {
      from: `"Labbi" <${fromEmail}>`,
      to: email,
      subject: 'Reset your Labbi password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #047857 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Password Reset Request</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="font-size: 16px;">Hi ${name},</p>
            
            <p style="font-size: 16px;">
              You requested to reset your password for your Labbi account. 
              Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; background: #047857; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Reset Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              Or copy and paste this link into your browser:
            </p>
            <p style="font-size: 12px; color: #999; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Labbi. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request
        
        Hi ${name},
        
        You requested to reset your password for your Labbi account. 
        Click the link below to create a new password:
        
        ${resetUrl}
        
        This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
        
        © ${new Date().getFullYear()} Labbi. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Check if this was a mock send (development only)
    if (info.messageId && info.messageId.startsWith('mock-')) {
      console.log('📧 Password reset email logged (SMTP not configured)');
      console.log('   Link:', resetUrl);
      // In production, this should not happen (error would be thrown)
      if (isProduction) {
        throw new Error('Email sending failed: SMTP not configured');
      }
      return { success: true, messageId: info.messageId, logged: true, link: resetUrl };
    }
    
    console.log('✅ Password reset email sent successfully:', info.messageId);
    console.log('   To:', email);
    console.log('   From:', process.env.SMTP_USER);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    const resetUrl = `${process.env.FRONTEND_URL || 'https://labbi.vercel.app'}/reset-password/${token}`;
    console.log('\n=== PASSWORD RESET EMAIL (Fallback) ===');
    console.log(`To: ${email}`);
    console.log(`Reset Link: ${resetUrl}`);
    console.log(`Error: ${error.message}`);
    console.log('========================================\n');
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};

