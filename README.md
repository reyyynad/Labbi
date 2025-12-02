# Labbi (لبِّ) - Service Marketplace Platform

<img width="1004" height="544" alt="Screenshot 2025-11-20 at 12 59 41 AM" src="https://github.com/user-attachments/assets/228f0464-c640-4e21-a308-efed69cd41f3" /> 

**GitHub Repository:** https://github.com/reyyynad/Labbi  
**Current Version:** Milestone 5 – Full-Stack Implementation (December 2025)

---

## 💡 Project Overview

**Labbi (لبِّ)** – meaning *"the core / the essence"* in Arabic – is a beautiful, bilingual digital marketplace that connects **service providers** (especially students and skilled individuals) with **customers** who need trustworthy, affordable, high-quality services.

The platform solves a real-life problem:  
**"I need someone reliable and reasonably priced."**  
Labbi empowers young providers to earn money and build reputation, while customers enjoy verified, reviewed, and safe services.

> **"خدمتك مطلوبة وحاجتك موجودة"**  
> *Your service is needed · Your need is here.*

---

## 🛠 Technologies Used

| Category | Technology |
|----------|------------|
| **Frontend** | React 18 + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Atlas Cloud) |
| **Authentication** | JWT (JSON Web Tokens) + bcryptjs |
| **Styling** | Tailwind CSS + Custom CSS |
| **Icons** | Lucide React |
| **Fonts** | Roboto Condensed, Noto Sans Arabic |
| **Version Control** | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas account** OR local MongoDB installation
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reyyynad/Labbi.git
   cd Labbi
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder with the following variables:

```env
# MongoDB Connection String
# For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
# For Local MongoDB: mongodb://localhost:27017/labbi
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# JWT Expiration Time
JWT_EXPIRE=30d

# Server Port (optional, defaults to 5000)
PORT=5000
```

> ⚠️ **IMPORTANT:** Never commit your `.env` file to Git! It's already added to `.gitignore`.

### Setting up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and replace placeholders with your credentials

---

## 🏃‍♂️ Running the Application

### Run Backend Server

```bash
cd backend
npm run dev
```

The server will start at: **http://localhost:5000**

### Run Frontend (in a separate terminal)

```bash
npm run dev
```

The frontend will start at: **http://localhost:5173**

### Run Both Concurrently

From the root directory, run both servers:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

---

## 👥 Test Accounts

### Create Admin Account

Run the seed script to create an admin user:

```bash
cd backend
npm run seed:admin
```

Default admin credentials:
- **Email:** `admin@labbi.com`
- **Password:** `Admin123!`

### Register New Users

- **Customer:** Sign up at `/signup-customer`
- **Provider:** Sign up at `/signup-provider`
- **Admin Login:** Access at `/login-admin`

---

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | No |
| `POST` | `/auth/login` | Login user | No |
| `GET` | `/auth/me` | Get current user | Yes |
| `POST` | `/auth/forgot-password` | Request password reset | No |
| `PUT` | `/auth/update-password` | Update password | Yes |

#### Register User

**Request:**
```json
POST /api/auth/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "userType": "customer",
  "phone": "+966501234567",
  "location": "Riyadh"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "userType": "customer"
    }
  }
}
```

#### Login User

**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    }
  }
}
```

---

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users/profile` | Get user profile | Yes |
| `PUT` | `/users/profile` | Update profile | Yes |
| `PUT` | `/users/notifications` | Update notification settings | Yes |
| `DELETE` | `/users/account` | Delete account | Yes |

#### Get Profile

**Request:**
```
GET /api/users/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+966501234567",
      "location": "Riyadh",
      "initials": "JD",
      "memberSince": "December 2025"
    },
    "stats": {
      "totalBookings": 5,
      "totalSpent": 750,
      "favoriteServices": 3
    }
  }
}
```

---

### Services Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/services` | Get all active services | No |
| `GET` | `/services/:id` | Get single service | No |
| `GET` | `/services/my-services` | Get provider's services | Yes (Provider) |
| `POST` | `/services` | Create new service | Yes (Provider) |
| `PUT` | `/services/:id` | Update service | Yes (Owner) |
| `DELETE` | `/services/:id` | Delete service | Yes (Owner) |
| `PUT` | `/services/:id/status` | Update service status | Yes |
| `GET` | `/services/provider/:providerId` | Get provider's public services | No |

#### Create Service

**Request:**
```json
POST /api/services
Authorization: Bearer <token>
{
  "title": "Professional Photography",
  "description": "High-quality photography services for events, portraits, and more. Professional equipment and 5 years of experience.",
  "category": "events",
  "price": 200,
  "pricingType": "hourly",
  "location": "Riyadh"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Service created successfully and is pending review",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Professional Photography",
    "category": "events",
    "price": 200,
    "status": "Pending"
  }
}
```

---

### Bookings Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/bookings` | Get user's bookings | Yes |
| `GET` | `/bookings/:id` | Get single booking | Yes |
| `POST` | `/bookings` | Create new booking | Yes |
| `PUT` | `/bookings/:id/reschedule` | Reschedule booking | Yes |
| `PUT` | `/bookings/:id/cancel` | Cancel booking | Yes |
| `PUT` | `/bookings/:id/status` | Update booking status | Yes |
| `GET` | `/bookings/provider` | Get provider's bookings | Yes (Provider) |
| `PUT` | `/bookings/:id/accept` | Accept booking | Yes (Provider) |
| `PUT` | `/bookings/:id/decline` | Decline booking | Yes (Provider) |
| `PUT` | `/bookings/:id/complete` | Mark as completed | Yes (Provider) |
| `GET` | `/bookings/provider/stats` | Get provider stats | Yes (Provider) |

#### Create Booking

**Request:**
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "serviceId": "507f1f77bcf86cd799439011",
  "serviceName": "Professional Photography",
  "providerId": "507f1f77bcf86cd799439012",
  "providerName": "Jane Smith",
  "date": "2025-12-15",
  "displayDate": "December 15, 2025",
  "time": "10:00 AM",
  "duration": "2 hours",
  "location": "Riyadh, Saudi Arabia",
  "pricing": {
    "serviceCost": 400,
    "platformFee": 20,
    "tax": 31.5,
    "total": 451.5
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "service": "Professional Photography",
    "provider": "Jane Smith",
    "date": "December 15, 2025",
    "time": "10:00 AM",
    "status": "Pending",
    "pricing": {
      "total": 451.5
    }
  }
}
```

---

### Reviews Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/reviews` | Get user's reviews | Yes |
| `POST` | `/reviews` | Create new review | Yes |
| `GET` | `/reviews/provider/:providerId` | Get provider's reviews | No |
| `GET` | `/reviews/my-reviews` | Get provider's received reviews | Yes (Provider) |

#### Create Review

**Request:**
```json
POST /api/reviews
Authorization: Bearer <token>
{
  "bookingId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Excellent service! Very professional and the photos turned out amazing."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "service": "Professional Photography",
    "provider": "Jane Smith",
    "rating": 5
  }
}
```

---

### Availability Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/availability/my` | Get provider's availability | Yes (Provider) |
| `PUT` | `/availability` | Update availability | Yes (Provider) |
| `GET` | `/availability/provider/:providerId` | Get provider's availability | No |
| `GET` | `/availability/slots/:providerId/:date` | Get time slots for date | No |
| `POST` | `/availability/book-slot` | Book a time slot | Yes |
| `DELETE` | `/availability/free-slot` | Free a time slot | Yes |

---

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/admin/dashboard` | Get dashboard stats | Yes (Admin) |
| `GET` | `/admin/users` | Get all users | Yes (Admin) |
| `GET` | `/admin/users/:id` | Get user by ID | Yes (Admin) |
| `PUT` | `/admin/users/:id/status` | Update user status | Yes (Admin) |
| `GET` | `/admin/services` | Get all services | Yes (Admin) |
| `PUT` | `/admin/services/:id/approve` | Approve service | Yes (Admin) |
| `PUT` | `/admin/services/:id/reject` | Reject service | Yes (Admin) |
| `GET` | `/admin/bookings` | Get all bookings | Yes (Admin) |
| `GET` | `/admin/analytics` | Get analytics data | Yes (Admin) |

---

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Error Responses

| Status Code | Description |
|-------------|-------------|
| `400` | Bad Request - Invalid input data |
| `401` | Unauthorized - Missing or invalid token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📁 Project Structure

```
Labbi/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── adminController.js    # Admin business logic
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── adminAuth.js          # Admin authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Service.js            # Service schema
│   │   ├── Booking.js            # Booking schema
│   │   ├── Review.js             # Review schema
│   │   └── Availability.js       # Availability schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── users.js              # User endpoints
│   │   ├── services.js           # Service endpoints
│   │   ├── bookings.js           # Booking endpoints
│   │   ├── reviews.js            # Review endpoints
│   │   ├── availability.js       # Availability endpoints
│   │   └── admin.js              # Admin endpoints
│   ├── scripts/
│   │   ├── seedAdmin.js          # Admin seeder
│   │   └── checkAdmin.js         # Admin checker
│   ├── server.js                 # Express server
│   └── package.json
├── src/
│   ├── components/               # React components
│   ├── pages/                    # Page components
│   ├── services/
│   │   └── api.js                # API service layer
│   ├── utils/                    # Utility functions
│   └── main.jsx                  # React entry point
├── .gitignore
├── package.json
└── README.md
```

---

## 🎯 Core Features

### User Types & Role-Based Access
- **Customer** – Browse, book, pay, and review services  
- **Service Provider** – Create/manage services, bookings, availability  
- **Admin** – Full control panel (users, services, analytics)

### Customer Experience
- Advanced search & filtering (category, price, location, rating)
- Service gallery + detailed views
- Provider profile + reviews
- Calendar + time slot booking
- Booking management (reschedule, cancel)
- Profile and settings

### Service Provider Dashboard
- Manage Services (add/edit/delete)
- Booking management (accept/decline/complete)
- Availability calendar management
- Reviews and earnings overview

### Admin Panel
- User management (activate/suspend)
- Service moderation (approve/reject)
- Analytics dashboard with insights
- Booking oversight

---

## 👩‍💻 Team Members

**Renad Elsafi**  
Junior Computer Science Student 

**Shatha Alharbi**  
Junior Software Engineering Student 

**Arwa Aldawoud**  
Junior Computer Science Student 

---

## 📄 License

This project is created for educational purposes as part of a university course.

---

### 💚 لبِّ – خدمتك مطلوبة وحاجتك موجودة
