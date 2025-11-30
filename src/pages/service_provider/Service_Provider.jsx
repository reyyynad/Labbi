import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Star, DollarSign, Clock, User, Plus, Loader2 } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';
import { providerAPI, servicesAPI, reviewsAPI } from '../../services/api';
import { getUserName } from '../../utils/auth';

const Service_Provider = ({ onNavigate }) => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [stats, setStats] = useState({
    totalServices: 0,
    totalBookings: 0,
    averageRating: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userName = getUserName() || 'Provider';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all data in parallel
      const [statsRes, bookingsRes, reviewsRes, servicesRes] = await Promise.all([
        providerAPI.getStats().catch(() => ({ success: false })),
        providerAPI.getBookings('Pending').catch(() => ({ success: false, data: [] })),
        providerAPI.getReviews().catch(() => ({ success: false, data: [] })),
        servicesAPI.getMyServices().catch(() => ({ success: false, data: [] }))
      ]);

      // Update stats
      if (statsRes.success) {
        setStats({
          totalServices: servicesRes.success ? servicesRes.count || servicesRes.data?.length || 0 : 0,
          totalBookings: statsRes.data?.totalBookings || 0,
          averageRating: reviewsRes.success ? reviewsRes.avgRating || 0 : 0,
          totalRevenue: statsRes.data?.totalRevenue || 0
        });
      }

      // Update pending bookings
      if (bookingsRes.success && bookingsRes.data) {
        setPendingBookings(bookingsRes.data.map(b => ({
          id: b.id,
          service: b.service,
          customer: b.customer,
          customerInitials: b.customerInitials || b.customer?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C',
          date: b.date,
          time: b.time,
          price: b.price
        })));
      }

      // Update recent reviews (limit to 3)
      if (reviewsRes.success && reviewsRes.data) {
        setRecentReviews(reviewsRes.data.slice(0, 3).map(r => ({
          id: r.id,
          customer: r.customer,
          customerInitials: r.initials || r.customer?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C',
          rating: r.rating,
          comment: r.comment,
          date: r.date
        })));
      }

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      const response = await providerAPI.acceptBooking(bookingId);
      if (response.success) {
        setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
        alert('Booking accepted! The customer will be notified.');
      }
    } catch (err) {
      alert(err.message || 'Failed to accept booking');
    }
  };

  const handleDecline = async (bookingId) => {
    if (confirm('Are you sure you want to decline this booking?')) {
      try {
        const response = await providerAPI.declineBooking(bookingId);
        if (response.success) {
          setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
          alert('Booking declined. The customer will be notified.');
        }
      } catch (err) {
        alert(err.message || 'Failed to decline booking');
      }
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
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Provider Dashboard</h1>
          <p className="text-gray-600 text-sm">Welcome back, {userName}! Here's your business overview</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading dashboard...</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
            <button onClick={fetchDashboardData} className="mt-2 text-sm text-red-700 underline">Try again</button>
          </div>
        )}

        {!loading && !error && (
          <>

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
            <p className="text-3xl font-bold text-gray-900">SR{stats.totalRevenue}</p>
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
                          <span>SR{booking.price}</span>
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
        </>
        )}
      </main>
    </div>
  );
};

export default Service_Provider;