# Vercel Environment Variables Setup

## ⚠️ IMPORTANT: Frontend Environment Variables

Your frontend on Vercel needs to know where your backend API is located.

## Required Environment Variable for Vercel

### API URL
- `VITE_API_URL` - Your Render backend URL (without `/api` at the end)
  - Example: `https://your-backend-name.onrender.com`
  - **NOT** `https://your-backend-name.onrender.com/api` (the `/api` is added automatically)

## How to Set It Up

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables** in the left sidebar
4. Click **Add New**
5. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.onrender.com` (your Render backend URL)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**
6. **Redeploy your Vercel project** after adding the variable

## How to Find Your Render Backend URL

1. Go to your Render dashboard
2. Select your backend service
3. Look at the top - you'll see the URL like: `https://your-service-name.onrender.com`
4. Copy that URL (without `/api`)

## Example

If your Render backend is at: `https://labbi-backend.onrender.com`

Then in Vercel, set:
```
VITE_API_URL=https://labbi-backend.onrender.com
```

The frontend will automatically add `/api` to make calls like:
- `https://labbi-backend.onrender.com/api/auth/resend-verification`

## Testing

After setting the environment variable and redeploying:

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Try to resend verification email
4. Check if the request goes to your Render backend URL
5. If you see 404 errors, verify the URL is correct

## Common Issues

### 404 NOT_FOUND Error
- **Cause**: `VITE_API_URL` is not set or incorrect
- **Fix**: Add `VITE_API_URL` in Vercel with your Render backend URL

### CORS Errors
- **Cause**: Backend CORS not configured for your Vercel domain
- **Fix**: Make sure `FRONTEND_URL` in Render includes your Vercel URL

### Connection Refused
- **Cause**: Backend is not running or URL is wrong
- **Fix**: Check Render dashboard to ensure backend is running

## Complete Vercel Environment Variables

For your frontend, you typically only need:
```
VITE_API_URL=https://your-backend-name.onrender.com
```

That's it! The frontend doesn't need SMTP or database variables - those are only in Render (backend).

