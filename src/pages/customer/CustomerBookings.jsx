import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

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

// ========== STATUS BADGE COMPONENT ==========
const StatusBadge = ({ status }) => {
  const styles = {
    Upcoming: 'bg-blue-100 text-blue-800 border border-blue-300',
    Confirmed: 'bg-green-100 text-green-800 border border-green-300',
    Completed: 'bg-gray-100 text-gray-800 border border-gray-300',
    Cancelled: 'bg-red-100 text-red-800 border border-red-300'
  };

  return (
    <span className={`px-3 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

// ========== BOOKING CARD COMPONENT ==========
const BookingCard = ({ booking }) => {
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
          <span>${booking.price}</span>
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

  const tabs = ['All Bookings', 'Upcoming', 'Confirmed', 'Completed', 'Cancelled'];

  const bookingsData = [
    {
      id: '1000',
      status: 'Upcoming',
      service: 'Professional House Cleaning',
      provider: 'Sarah Johnson',
      date: 'Nov 15, 2024',
      time: '10:00 AM - 12:00 PM',
      location: '123 Main St, New York, NY',
      price: '120'
    },
    {
      id: '1001',
      status: 'Confirmed',
      service: 'Personal Training Session',
      provider: 'Emma Wilson',
      date: 'Nov 12, 2024',
      time: '6:00 PM - 7:00 PM',
      location: 'FitLife Gym, New York, NY',
      price: '50'
    },
    {
      id: '1002',
      status: 'Completed',
      service: 'Plumbing Repair',
      provider: 'Mike Davis',
      date: 'Nov 8, 2024',
      time: '2:00 PM - 3:30 PM',
      location: '123 Main St, New York, NY',
      price: '85'
    },
    {
      id: '1003',
      status: 'Completed',
      service: 'Web Development Consultation',
      provider: 'David Chen',
      date: 'Nov 5, 2024',
      time: '3:00 PM - 4:00 PM',
      location: 'Online Meeting',
      price: '80'
    }
  ];

  const bookings = bookingsData.map((booking) => {
    const standardActions = [
      {
        label: 'View Details',
        variant: 'primary',
        onClick: () => navigate(`/services/${booking.id}`)
      }
    ];

    if (booking.status === 'Completed') {
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
            onClick: () => navigate('/bookings')
          },
          ...standardActions
        ]
      };
    }

    return {
      ...booking,
      actions: [
        ...standardActions,
        {
          label: 'Reschedule',
          variant: 'outline',
          onClick: () => navigate(`/booking/datetime/${booking.id}`)
        },
        {
          label: 'Cancel',
          variant: 'danger',
          onClick: () => navigate('/bookings')
        }
      ]
    };
  });

  const filteredBookings = activeTab === 'All Bookings' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab);

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

        {/* Bookings List */}
        <div>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
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
    </div>
  );
};

export default CustomerBookings;