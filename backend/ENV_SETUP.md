# Environment Variables Setup Guide

This guide will help you configure the necessary environment variables for your Labbi backend deployment.

**⚠️ IMPORTANT: Where to Add Variables**
- **Backend variables** (SMTP, Database, JWT) → **ONLY in Render** (where your backend runs)
- **Frontend variables** → **ONLY in Vercel** (where your frontend runs)
- **You do NOT need SMTP variables in Vercel** - emails are sent from the backend!

## Required Environment Variables

### Database
- `MONGO_URI` - Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/labbi?retryWrites=true&w=majority`

### JWT Authentication
- `JWT_SECRET` - A secret key for signing JWT tokens (use a long random string)
  - Example: `your-super-secret-jwt-key-here-minimum-32-characters`
- `JWT_EXPIRE` - Token expiration time (optional, default: 30d)
  - Example: `30d`

### Email Configuration (SMTP)
**⚠️ CRITICAL: These are required for email verification and password reset to work!**

- `SMTP_USER` - Your Gmail address (or other SMTP email)
  - Example: `your-email@gmail.com`
- `SMTP_PASS` - Your Gmail App Password (NOT your regular password!)
  - Example: `abcd efgh ijkl mnop` (16 characters, remove spaces when setting)
- `SMTP_HOST` - SMTP server hostname (optional, default: smtp.gmail.com)
  - Example: `smtp.gmail.com`
- `SMTP_PORT` - SMTP server port (optional, default: 587)
  - Example: `587` or `465`

### Frontend URL
- `FRONTEND_URL` - Your frontend URL (for email links)
  - Example: `https://labbi.vercel.app`

## Setting Up Gmail App Password

1. **Enable 2-Step Verification**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Labbi Backend" as the name
   - Click "Generate"
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

3. **Add to Environment Variables**
   - Remove all spaces from the password
   - Add it as `SMTP_PASS` in your deployment platform

## Where to Add Environment Variables

### ✅ Render (Backend) - ADD ALL BACKEND VARIABLES HERE

**Add these variables to your Render backend service:**

1. Go to your Render dashboard
2. Select your **backend service** (not frontend)
3. Click on "Environment" in the left sidebar
4. Click "Add Environment Variable"
5. Add each variable:
   - Key: `SMTP_USER`
   - Value: `your-email@gmail.com`
   - Click "Save Changes"
6. Repeat for all required backend variables (see list below)
7. **Redeploy your backend service** after adding environment variables

**Required Backend Variables for Render:**
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRE` (optional)
- `SMTP_USER` ⚠️ **REQUIRED for emails**
- `SMTP_PASS` ⚠️ **REQUIRED for emails**
- `SMTP_HOST` (optional, default: smtp.gmail.com)
- `SMTP_PORT` (optional, default: 587)
- `FRONTEND_URL` (your Vercel URL, e.g., https://labbi.vercel.app)
- `PORT` (optional, Render sets this automatically)
- `NODE_ENV` (optional, set to `production`)

### ❌ Vercel (Frontend) - DO NOT ADD SMTP VARIABLES HERE

**You do NOT need to add SMTP variables to Vercel!** 

The frontend doesn't send emails - only the backend does. 

If you have frontend-specific environment variables (like API URLs), add those to Vercel, but **NOT the SMTP/backend variables**.

## Complete Environment Variables List

Here's a complete list of all environment variables you should set:

```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/labbi?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
JWT_EXPIRE=30d

# Email (SMTP) - REQUIRED FOR EMAIL FUNCTIONALITY
SMTP_USER=your-email@gmail.com
SMTP_PASS=yourapppasswordhere16chars
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Frontend
FRONTEND_URL=https://labbi.vercel.app

# Server
PORT=5001
NODE_ENV=production
```

## Testing Email Configuration

After setting up your environment variables:

1. **Check the server logs** when it starts - it will show if SMTP is configured
2. **Test email sending** by:
   - Registering a new user (should send verification email)
   - Using "Forgot Password" (should send reset email)
   - Using "Resend Verification" (should send verification email)

## Troubleshooting

### Emails not sending?

1. **Check environment variables are set:**
   - Go to your deployment dashboard
   - Verify all SMTP variables are present
   - Make sure there are no extra spaces in values

2. **Check server logs:**
   - Look for `[EMAIL DEBUG]` messages
   - Verify SMTP connection status

3. **Common issues:**
   - Using regular password instead of App Password → Generate App Password
   - Spaces in App Password → Remove all spaces
   - 2-Step Verification not enabled → Enable it first
   - Wrong SMTP settings → Use default (smtp.gmail.com:587)

4. **Gmail-specific:**
   - Make sure "Less secure app access" is NOT needed (use App Password instead)
   - App Passwords only work with 2-Step Verification enabled
   - If using a Google Workspace account, check admin settings

## Alternative Email Services

If you don't want to use Gmail, you can use other SMTP services:

### SendGrid
- `SMTP_HOST=smtp.sendgrid.net`
- `SMTP_PORT=587`
- `SMTP_USER=apikey`
- `SMTP_PASS=your-sendgrid-api-key`

### Mailgun
- `SMTP_HOST=smtp.mailgun.org`
- `SMTP_PORT=587`
- `SMTP_USER=your-mailgun-username`
- `SMTP_PASS=your-mailgun-password`

### AWS SES
- `SMTP_HOST=email-smtp.region.amazonaws.com`
- `SMTP_PORT=587`
- `SMTP_USER=your-aws-ses-username`
- `SMTP_PASS=your-aws-ses-password`

## Security Notes

- **Never commit `.env` files to git**
- **Never share your App Passwords or API keys**
- **Use different credentials for development and production**
- **Rotate passwords/keys regularly**
- **Use environment-specific variables in your deployment platform**

