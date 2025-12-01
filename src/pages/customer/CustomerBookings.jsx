import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, MapPin, User, Star, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { bookingsAPI, reviewsAPI, availabilityAPI } from '../../services/api';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46]',
    secondary: 'bg-white text-[#047857] border-2 border-[#047857] hover:bg-[#f0fdf4]',
    danger: 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50',
    outline: 'border-2 border-gray-300 bg-white text-[#374151] hover:bg-gray-50'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-5 py-2.5 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

// ========== REVIEW MODAL COMPONENT ==========
const ReviewModal = ({ isOpen, onClose, booking, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (reviewText.trim().length < 10) {
      setError('Please write at least 10 characters in your review');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      await reviewsAPI.create(booking.id, rating, reviewText);
      onSubmit({
        bookingId: booking.id,
        rating,
        comment: reviewText,
        service: booking.service,
        provider: booking.provider
      });
      setRating(0);
      setReviewText('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setReviewText('');
    setHoveredRating(0);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#374151]">Leave a Review</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#374151] mb-2">{booking.service}</h3>
            <p className="text-sm text-gray-600">Provider: {booking.provider}</p>
            <p className="text-sm text-gray-600">Date: {booking.date} at {booking.time}</p>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#374151] mb-3">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : 'Very Poor'}
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label htmlFor="reviewText" className="block text-sm font-medium text-[#374151] mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this service..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {reviewText.length} characters (minimum 10 required)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || rating === 0 || reviewText.trim().length < 10}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ========== STATUS BADGE COMPONENT ==========
const StatusBadge = ({ status }) => {
  const styles = {
    Upcoming: 'bg-blue-100 text-blue-800 border border-blue-300',
    Confirmed: 'bg-green-100 text-green-800 border border-green-300',
    Completed: 'bg-gray-100 text-gray-800 border border-gray-300',
    Cancelled: 'bg-red-100 text-red-800 border border-red-300',
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300'
  };

  return (
    <span className={`px-3 py-1 rounded text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

// ========== BOOKING CARD COMPONENT ==========
const BookingCard = ({ booking, onCancel }) => {
  return (
    <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-[#374151] mb-2">{booking.service}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <User size={14} />
            <span>Provider: {booking.provider}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={booking.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar size={16} className="text-[#047857]" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock size={16} className="text-[#047857]" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin size={16} className="text-[#047857]" />
          <span>{booking.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <DollarSign size={16} className="text-[#047857]" />
          <span>SR{booking.price}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {booking.actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            size="medium"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

// ========== MAIN MY BOOKINGS PAGE ==========
const CustomerBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabs = ['All Bookings', 'Upcoming', 'Confirmed', 'Completed', 'Cancelled'];

  // Fetch bookings on mount and tab change
  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await bookingsAPI.getAll(activeTab);
      
      if (response.success) {
        setBookingsData(response.data);
      }
    } catch (error) {
      setError(error.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveReview = (booking) => {
    setSelectedBookingForReview(booking);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewData) => {
    // Update booking to show it has been reviewed
    setBookingsData(prev => 
      prev.map(b => 
        b.id === reviewData.bookingId 
          ? { ...b, hasReview: true, canReview: false }
          : b
      )
    );
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    // Find the booking to get provider and slot info
    const booking = bookingsData.find(b => b.id === bookingId);

    try {
      await bookingsAPI.cancel(bookingId);
      
      // Free the time slot so others can book
      if (booking?.providerId && booking?.dateStr && booking?.time) {
        try {
          await availabilityAPI.freeSlot(booking.providerId, booking.dateStr, booking.time);
        } catch (freeErr) {
          console.log('Could not free slot:', freeErr);
        }
      }
      
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      alert(error.message || 'Failed to cancel booking');
    }
  };

  const bookings = bookingsData.map((booking) => {
    const standardActions = [
      {
        label: 'View Details',
        variant: 'primary',
        onClick: () => navigate(`/services/${booking.serviceId || booking.id}`, { state: { fromBooking: true } })
      }
    ];

    if (booking.canReview) {
      return {
        ...booking,
        actions: [
          {
            label: 'Book Again',
            variant: 'primary',
            onClick: () => navigate(`/services/${booking.id}`)
          },
          {
            label: 'Leave Review',
            variant: 'outline',
            onClick: () => handleLeaveReview(booking)
          },
          ...standardActions
        ]
      };
    }

    if (booking.status === 'Completed') {
      return {
        ...booking,
        actions: [
          {
            label: 'Book Again',
            variant: 'primary',
            onClick: () => navigate(`/services/${booking.id}`)
          },
          ...standardActions
        ]
      };
    }

    if (booking.canReschedule) {
      return {
        ...booking,
        actions: [
          ...standardActions,
          {
            label: 'Reschedule',
            variant: 'outline',
            onClick: () => navigate(`/customer/booking/datetime/${booking.id}`, { 
              state: { 
                isReschedule: true, 
                bookingId: booking.id,
                currentDate: booking.date,
                currentDateStr: booking.dateStr,
                currentTime: booking.time,
                providerId: booking.providerId,
                serviceName: booking.service,
                providerName: booking.provider,
                location: booking.location,
                serviceCost: booking.price,
                serviceId: booking.serviceId
              } 
            })
          },
          {
            label: 'Cancel',
            variant: 'danger',
            onClick: () => handleCancelBooking(booking.id)
          }
        ]
      };
    }

    return {
      ...booking,
      actions: standardActions
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#374151] mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage all your service bookings in one place</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#047857] text-white'
                    : 'bg-[#f0fdf4] text-[#374151] hover:bg-[#d1fae5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Bookings List */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#047857]" />
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[#374151] mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any bookings in this category yet.
              </p>
              <Button variant="primary" onClick={() => navigate('/')}>
                Browse Services
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        booking={selectedBookingForReview}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default CustomerBookings;
