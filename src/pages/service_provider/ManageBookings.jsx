import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, AlertTriangle, User } from 'lucide-react';

// Mock bookings data
const mockBookings = [
  {
    id: 1000,
    customer: "Arwa Aldawoud",
    service: "Web Development",
    date: "Oct 15, 2025",
    time: "2:00 PM",
    price: 200,
    status: "Pending"
  },
  {
    id: 1001,
    customer: "Shatha Alharbi",
    service: "UI Design",
    date: "Oct 16, 2025",
    time: "10:00 AM",
    price: 350,
    status: "Confirmed"
  },
  {
    id: 1002,
    customer: "Bana Jaber",
    service: "Web Development",
    date: "Oct 10, 2025",
    time: "3:00 PM",
    price: 200,
    status: "Completed"
  }
];

const ManageBookings = ({ onNavigate }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBookings = bookings.filter(booking => 
    activeFilter === "All" ? true : booking.status === activeFilter
  );

  const handleAccept = (bookingId) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "Confirmed" } : b
    ));
    alert(`Booking #${bookingId} accepted!`);
  };

  const handleDecline = (bookingId) => {
    if (confirm(`Are you sure you want to decline booking #${bookingId}?`)) {
      setBookings(bookings.filter(b => b.id !== bookingId));
      alert(`Booking #${bookingId} declined.`);
    }
  };

  const handleReschedule = (bookingId) => {
    alert(`Reschedule feature for booking #${bookingId} - Will be implemented with backend`);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800"
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">Booking #{booking.id}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <User className="w-4 h-4" />
            Customer: {booking.customer}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-3">Service: {booking.service}</p>

      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {booking.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {booking.time}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          {booking.price}/hr
        </span>
      </div>

      {booking.status === "Pending" && (
        <>
          <div className="flex gap-2 mb-3">
            <button 
              onClick={() => handleAccept(booking.id)}
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
            >
              Accept
            </button>
            <button 
              onClick={() => handleReschedule(booking.id)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Reschedule
            </button>
            <button 
              onClick={() => handleDecline(booking.id)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Decline
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <AlertTriangle className="w-4 h-4" />
            <span>System checks for scheduling conflicts before confirming</span>
          </div>
        </>
      )}

      {booking.status === "Confirmed" && (
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Contact Client
          </button>
        </div>
      )}

      {booking.status === "Completed" && (
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          View Details
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-gray-900 rounded flex items-center justify-center font-bold">
                L
              </div>
              <span className="text-xl font-semibold">Labbi - لَبِّ</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-white">Dashboard</button>
              <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-white">My Services</button>
              <button className="text-white">Bookings</button>
              <button onClick={() => onNavigate('availability')} className="text-gray-400 hover:text-white">Availability</button>
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4 cursor-pointer"
                   onClick={() => onNavigate('profile')}>
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Bookings</h1>
          <p className="text-gray-600">Review and manage all your booking requests</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-1 mb-6 inline-flex gap-2">
          {["All", "Pending", "Confirmed", "Completed"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
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
            <div className="bg-white rounded-lg border-2 border-gray-200 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">No {activeFilter.toLowerCase()} bookings at this time</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-100 border-2 border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">BOOKING MANAGEMENT:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Accept/Decline booking requests</li>
            <li>• System validates overlapping schedules</li>
            <li>• Both parties notified of status changes</li>
            <li>• Automatic calendar updates</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ManageBookings;