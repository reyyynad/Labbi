import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, MapPin, User, X, Mail, Phone, CheckCircle } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';

// Mock bookings data
const mockBookings = [
  {
    id: 1000,
    customer: "Renad Elsafi",
    service: "Professional House Cleaning",
    date: "Nov 15, 2024",
    time: "10:00 AM - 12:00 PM",
    price: 120,
    status: "Pending",
    location: "King Saud Rd, Dhahran, Saudi Arabia"
  },
  {
    id: 1001,
    customer: "Shatha Alharbi",
    service: "Professional House Cleaning",
    date: "Nov 16, 2024",
    time: "2:00 PM - 4:00 PM",
    price: 160,
    status: "Confirmed",
    location: "Al Olaya District, Riyadh, Saudi Arabia"
  },
  {
    id: 1002,
    customer: "Adel Hassan",
    service: "Deep Cleaning Service",
    date: "Nov 10, 2024",
    time: "9:00 AM - 1:00 PM",
    price: 240,
    status: "Completed",
    location: "King Abdullah Rd, Riyadh, Saudi Arabia"
  },
  {
    id: 1003,
    customer: "Mohammed Ali",
    service: "Move-In/Out Cleaning",
    date: "Nov 8, 2024",
    time: "10:00 AM - 2:00 PM",
    price: 150,
    status: "Completed",
    location: "Diplomatic Quarter, Riyadh, Saudi Arabia"
  }
];

// ========== BOOKING DETAILS MODAL COMPONENT ==========
const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  // Mock additional booking details
  const bookingDetails = {
    bookingId: `#${booking.id}`,
    customerEmail: `${booking.customer.toLowerCase().replace(' ', '.')}@example.com`,
    customerPhone: '+966 50 123 4567',
    serviceFee: 5,
    subtotal: booking.price - 5,
    total: booking.price,
    duration: booking.time.split(' - ').length > 1 
      ? `${Math.abs(new Date(`2000-01-01 ${booking.time.split(' - ')[0]}`) - new Date(`2000-01-01 ${booking.time.split(' - ')[1]}`)) / (1000 * 60 * 60)} hours`
      : '2 hours',
    bookedOn: 'Nov 10, 2024',
    specialRequests: booking.status === 'Completed' 
      ? 'Please use eco-friendly products. Ring the doorbell twice.'
      : 'None',
    paymentStatus: booking.status === 'Pending' ? 'Pending' : 'Paid',
    paymentMethod: 'Credit Card'
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Confirmed: "bg-green-100 text-green-800 border-green-300",
      Completed: "bg-gray-100 text-gray-800 border-gray-300"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-600 mt-1">{bookingDetails.bookingId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Booking Status */}
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          {/* Service Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Service Name</p>
                <p className="font-semibold text-gray-900">{booking.service}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{booking.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="font-semibold text-gray-900">{booking.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="font-semibold text-gray-900">{bookingDetails.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{booking.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">
                    {booking.customer.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{booking.customer}</p>
                  <p className="text-sm text-gray-600">Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail size={16} className="text-gray-500" />
                <span>{bookingDetails.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={16} className="text-gray-500" />
                <span>{bookingDetails.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Booking & Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Booking Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booked On:</span>
                  <span className="font-medium text-gray-900">{bookingDetails.bookedOn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium text-gray-900">{bookingDetails.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Special Requests:</span>
                  <span className="font-medium text-gray-900 text-right max-w-[200px]">
                    {bookingDetails.specialRequests}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">SR{bookingDetails.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium text-gray-900">SR{bookingDetails.serviceFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-gray-900">SR{bookingDetails.total}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    bookingDetails.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bookingDetails.paymentStatus}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Method: {bookingDetails.paymentMethod}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {booking.status === 'Confirmed' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Service Confirmed</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This booking is confirmed and ready for service on {booking.date} at {booking.time}
                  </p>
                </div>
              </div>
            </div>
          )}

          {booking.status === 'Completed' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Service Completed</p>
                  <p className="text-xs text-gray-700 mt-1">
                    This booking was completed on {booking.date}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageBookings = ({ onNavigate }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("All Bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === "All Bookings") return true;
    return booking.status === activeFilter;
  });

  const handleAccept = (bookingId) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "Confirmed" } : b
    ));
    alert(`Booking accepted successfully!`);
  };

  const handleDecline = (bookingId) => {
    if (confirm(`Are you sure you want to decline this booking?`)) {
      setBookings(bookings.filter(b => b.id !== bookingId));
      alert(`Booking declined.`);
    }
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setIsDetailsModalOpen(true);
    }
  };

  const handleContactCustomer = (bookingId) => {
    alert(`Contact customer for booking #${bookingId}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Confirmed: "text-white border-transparent",
      Completed: "text-white border-transparent"
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getStatusBgColor = (status) => {
    const bgColors = {
      Confirmed: '#047857',
      Completed: '#374151'
    };
    return bgColors[status];
  };

  const BookingCard = ({ booking }) => (
    <div className="rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow" style={{ backgroundColor: '#f0fdf4' }}>
      {/* Header with title and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.service}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>Customer: {booking.customer}</span>
          </div>
        </div>
        <span 
          className={`px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(booking.status)}`}
          style={booking.status !== 'Pending' ? { backgroundColor: getStatusBgColor(booking.status) } : {}}
        >
          {booking.status}
        </span>
      </div>

      {/* Booking details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{booking.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span>SR{booking.price}</span>
        </div>
      </div>

      {/* Action buttons based on status */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        {booking.status === "Pending" && (
          <>
            <button 
              onClick={() => handleAccept(booking.id)}
              className="flex-1 px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#065f46' }}
            >
              Accept
            </button>
            <button 
              onClick={() => handleDecline(booking.id)}
              className="flex-1 px-4 py-2 border rounded-md text-sm font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#f0fdf4', color: '#374151', borderColor: '#e5e7eb' }}
            >
              Decline
            </button>
          </>
        )}

        {booking.status === "Confirmed" && (
          <>
            <button 
              onClick={() => handleViewDetails(booking.id)}
              className="flex-1 px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#065f46' }}
            >
              View Details
            </button>
            <button 
              onClick={() => handleContactCustomer(booking.id)}
              className="flex-1 px-4 py-2 border rounded-md text-sm font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#f0fdf4', color: '#374151', borderColor: '#e5e7eb' }}
            >
              Contact Customer
            </button>
          </>
        )}

        {booking.status === "Completed" && (
          <button 
            onClick={() => handleViewDetails(booking.id)}
            className="flex-1 px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#065f46' }}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
          <p className="text-gray-600 text-sm">Manage your service bookings and appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 border-b border-gray-200">
          {["All Bookings", "Pending", "Confirmed", "Completed"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-sm font-medium transition-all relative ${
                activeFilter === filter 
                  ? "" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={activeFilter === filter ? { color: '#047857' } : {}}
            >
              {filter}
              {activeFilter === filter && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#047857' }}></div>
              )}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div>
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-16 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {activeFilter === "All Bookings" 
                  ? "You don't have any bookings yet" 
                  : `No ${activeFilter.toLowerCase()} bookings at this time`}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
    </div>
  );
};

export default ManageBookings;