# How to Start the Labbi Application

## Quick Start Guide

### Step 1: Start the Backend Server

Open a terminal/command prompt and run:

```bash
cd backend
npm start
```

Or if you have nodemon installed (for auto-restart on changes):

```bash
cd backend
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
MongoDB Connected Successfully
```

### Step 2: Start the Frontend Server

Open a **new** terminal/command prompt and run:

```bash
npm run dev
```

**Expected output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open the Application

Open your web browser and go to:

**http://localhost:5173**

## Login Credentials

You can log in with any of these admin accounts:

1. **Email:** arwayaser26@gmail.com  
   **Password:** 12345678

2. **Email:** shathasa111@gmail.com  
   **Password:** 12345678

3. **Email:** renad.elsafi@outlook.com  
   **Password:** 12345678

## Troubleshooting

### Backend not starting?
- Make sure MongoDB connection string is correct in `backend/.env`
- Check if port 5000 is already in use
- Verify Node.js is installed: `node --version`

### Frontend not starting?
- Make sure you're in the root directory (not `backend`)
- Check if port 5173 is already in use
- Try: `npm install` if dependencies are missing

### Can't connect to backend?
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Make sure both servers are running simultaneously

## Stopping the Servers

Press `Ctrl + C` in each terminal window to stop the servers.

