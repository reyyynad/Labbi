import React, { useState } from 'react';
import { Briefcase, Calendar, Star, DollarSign, Clock, User, Plus } from 'lucide-react';

const Service_Provider = ({ onNavigate }) => {
  const [pendingBookings, setPendingBookings] = useState([
    {
      id: 1,
      service: "Professional House Cleaning",
      customer: "John Doe",
      customerInitials: "JD",
      date: "Nov 15, 2024",
      time: "10:00 AM",
      price: 120
    },
    {
      id: 2,
      service: "Professional House Cleaning",
      customer: "Alice Smith",
      customerInitials: "AS",
      date: "Nov 16, 2024",
      time: "2:00 PM",
      price: 160
    }
  ]);

  const [recentReviews] = useState([
    {
      id: 1,
      customer: "Anna Robinson",
      customerInitials: "AR",
      rating: 5,
      comment: "Excellent service! Very professional!",
      date: "2 days ago"
    },
    {
      id: 2,
      customer: "Mike Johnson",
      customerInitials: "MJ",
      rating: 5,
      comment: "Outstanding work, highly recommended!",
      date: "5 days ago"
    },
    {
      id: 3,
      customer: "Lisa Brown",
      customerInitials: "LB",
      rating: 4,
      comment: "Great service, will book again.",
      date: "1 week ago"
    }
  ]);

  const stats = {
    totalServices: 4,
    totalBookings: 127,
    averageRating: 4.9,
    totalRevenue: 12450
  };

  const handleAccept = (bookingId) => {
    // Remove the booking from pending list
    setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
    alert(`Booking #${bookingId} has been accepted! The customer will be notified.`);
  };

  const handleDecline = (bookingId) => {
    if (confirm('Are you sure you want to decline this booking?')) {
      // Remove the booking from pending list
      setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
      alert(`Booking #${bookingId} has been declined. The customer will be notified.`);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-base ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="text-white shadow-sm" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                <svg className="w-5 h-5" style={{ color: '#1e3a8a' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-lg font-semibold">ServiceHub</span>
            </div>
            
            <nav className="flex items-center gap-8 text-sm">
              <button className="font-medium">
                Dashboard
              </button>
              <button onClick={() => onNavigate('services')} className="hover:text-gray-200 transition-colors">
                My Services
              </button>
              <button onClick={() => onNavigate('bookings')} className="hover:text-gray-200 transition-colors">
                Bookings
              </button>
              <button onClick={() => onNavigate('availability')} className="hover:text-gray-200 transition-colors">
                Availability
              </button>
              <button onClick={() => onNavigate('profile')} className="hover:text-gray-200 transition-colors">
                Profile
              </button>
              <button onClick={() => onNavigate('reviews')} className="hover:text-gray-200 transition-colors">
                Reviews
              </button>
              <button onClick={() => onNavigate('settings')} className="hover:text-gray-200 transition-colors">
                Settings
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Provider Dashboard</h1>
          <p className="text-gray-600 text-sm">Welcome back, Sarah! Here's your business overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Total Services */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Services</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalServices}</p>
          </div>

          {/* Total Bookings */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          </div>

          {/* Average Rating */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Average Rating</p>
            <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
          </div>

          {/* Total Revenue */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
          </div>
        </div>

        {/* Pending Booking Requests */}
        <div className="rounded-lg border border-gray-200 p-6 mb-6" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pending Booking Requests</h2>
            {pendingBookings.length > 0 && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                {pendingBookings.length} New
              </span>
            )}
          </div>

          {pendingBookings.length > 0 ? (
            <div className="space-y-4">
              {pendingBookings.map(booking => (
                <div key={booking.id} className="bg-white rounded-lg border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    {/* Customer Avatar */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ backgroundColor: '#065f46' }}>
                      {booking.customerInitials}
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{booking.service}</h3>
                      <p className="text-sm text-gray-600 mb-3">Customer: {booking.customer}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${booking.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="px-5 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                        style={{ backgroundColor: '#065f46' }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(booking.id)}
                        className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending requests</h3>
              <p className="text-gray-600">You're all caught up! New booking requests will appear here.</p>
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="rounded-lg border border-gray-200 p-6 mb-6" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Reviews</h2>
            <button 
              onClick={() => onNavigate('reviews')}
              className="text-sm font-medium hover:underline"
              style={{ color: '#065f46' }}
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-start gap-4">
                  {/* Customer Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ backgroundColor: '#065f46' }}>
                    {review.customerInitials}
                  </div>

                  {/* Review Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{review.customer}</h3>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add New Service */}
          <button
            onClick={() => onNavigate('add-service')}
            className="rounded-lg border border-gray-200 p-8 text-left hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#065f46' }}
          >
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" style={{ color: '#065f46' }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Add New Service</h3>
            <p className="text-sm text-white opacity-90">Create a new service offering</p>
          </button>

          {/* Manage Bookings */}
          <button
            onClick={() => onNavigate('bookings')}
            className="rounded-lg border border-gray-200 p-8 text-left hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#f0fdf4' }}
          >
            <div className="w-12 h-12 rounded flex items-center justify-center mb-4" style={{ backgroundColor: '#065f46' }}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Bookings</h3>
            <p className="text-sm text-gray-600">View and manage your bookings</p>
          </button>

          {/* Update Profile */}
          <button
            onClick={() => onNavigate('profile')}
            className="rounded-lg border border-gray-200 p-8 text-left hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#f0fdf4' }}
          >
            <div className="w-12 h-12 rounded flex items-center justify-center mb-4" style={{ backgroundColor: '#065f46' }}>
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Update Profile</h3>
            <p className="text-sm text-gray-600">Edit your professional information</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Service_Provider;