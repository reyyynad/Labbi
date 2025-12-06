# Fix: Vercel Frontend Connection to Render Backend

## Problem
Your Vercel frontend (`labbi.vercel.app`) can't connect to your Render backend (`https://labbi.onrender.com`).

## Solution Steps

### Step 1: Update Backend CORS (Already Fixed)
✅ The backend CORS configuration has been updated to allow Vercel domains.

**Next:** Commit and push this change, then redeploy your backend on Render:
```bash
git add backend/server.js
git commit -m "Update CORS to allow Vercel domain"
git push origin main
```

Render will automatically redeploy. Wait for it to finish.

### Step 2: Set Environment Variable on Vercel

1. **Go to your Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `labbi` project

2. **Navigate to Settings:**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add the Environment Variable:**
   - Click **Add New**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://labbi.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **⋯** (three dots) on your latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger automatic redeployment

### Step 3: Verify the Fix

1. **Check Backend CORS:**
   - Your backend at `https://labbi.onrender.com` should now accept requests from `labbi.vercel.app`

2. **Check Frontend:**
   - After Vercel redeploys, visit `https://labbi.vercel.app`
   - The frontend should now connect to your backend
   - Try logging in or making an API call

### Troubleshooting

If it still doesn't work:

1. **Check Vercel Build Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check the build logs to see if `VITE_API_URL` is being used

2. **Verify Environment Variable:**
   - In Vercel, go to Settings → Environment Variables
   - Make sure `VITE_API_URL` is set correctly
   - Make sure it's enabled for **Production** environment

3. **Check Browser Console:**
   - Open your Vercel site
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for any CORS errors or network errors
   - Check Network tab to see what URL the frontend is trying to connect to

4. **Verify Backend is Running:**
   - Visit `https://labbi.onrender.com` directly
   - You should see: `{"message":"Labbi API is running successfully!",...}`

## Quick Commands

```bash
# Commit CORS fix
git add backend/server.js
git commit -m "Update CORS to allow Vercel domain"
git push origin main

# After pushing, wait for Render to redeploy (check Render dashboard)
# Then redeploy on Vercel (or it will auto-redeploy on next push)
```

## Expected Result

After completing these steps:
- ✅ Backend accepts requests from Vercel domain
- ✅ Frontend uses `https://labbi.onrender.com` for API calls
- ✅ No more "Unable to connect to server" errors

