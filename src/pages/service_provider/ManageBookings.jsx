import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, MapPin, User } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';

// Mock bookings data
const mockBookings = [
  {
    id: 1000,
    customer: "John Doe",
    service: "Professional House Cleaning",
    date: "Nov 15, 2024",
    time: "10:00 AM - 12:00 PM",
    price: 120,
    status: "Pending",
    location: "123 Main St, New York, NY"
  },
  {
    id: 1001,
    customer: "Alice Smith",
    service: "Professional House Cleaning",
    date: "Nov 16, 2024",
    time: "2:00 PM - 4:00 PM",
    price: 160,
    status: "Confirmed",
    location: "456 Oak Ave, New York, NY"
  },
  {
    id: 1002,
    customer: "Mike Johnson",
    service: "Deep Cleaning Service",
    date: "Nov 10, 2024",
    time: "9:00 AM - 1:00 PM",
    price: 240,
    status: "Completed",
    location: "789 Pine St, New York, NY"
  },
  {
    id: 1003,
    customer: "Sarah Williams",
    service: "Move-In/Out Cleaning",
    date: "Nov 8, 2024",
    time: "10:00 AM - 2:00 PM",
    price: 150,
    status: "Completed",
    location: "321 Elm St, New York, NY"
  }
];

const ManageBookings = ({ onNavigate }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("All Bookings");

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
    alert(`View details for booking #${bookingId}`);
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
          <span>${booking.price}</span>
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
    </div>
  );
};

export default ManageBookings;