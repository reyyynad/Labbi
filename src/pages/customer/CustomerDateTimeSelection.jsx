import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import { bookingsAPI } from '../../services/api';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none inline-flex items-center justify-center w-full';
  const variants = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46]',
    secondary: 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]',
    outline: 'border-2 border-gray-300 bg-white text-[#374151] hover:bg-gray-50',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed'
  };
  
  const sizes = {
    small: 'px-4 py-2.5 text-sm',
    medium: 'px-5 py-3 text-sm',
    large: 'px-6 py-3.5 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? variants.disabled : variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// ========== CALENDAR COMPONENT ==========
const CalendarWidget = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isPastDate = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < todayStart;
  };
  
  return (
    <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-[#047857]" size={20} />
        <h3 className="text-lg font-semibold text-[#374151]">Select Date</h3>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-white rounded"
        >
          ←
        </button>
        <span className="font-semibold text-[#374151]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-white rounded"
        >
          →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            disabled={!day || isPastDate(day)}
            onClick={() => day && setSelectedDate({
              day,
              month: currentMonth.getMonth(),
              year: currentMonth.getFullYear(),
              displayDate: `${monthNames[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`
            })}
            className={`
              py-2 text-sm rounded-lg transition-colors
              ${!day ? 'invisible' : ''}
              ${day && isPastDate(day) ? 'text-gray-300 cursor-not-allowed' : ''}
              ${day && !isPastDate(day) && selectedDate?.day === day && 
                selectedDate?.month === currentMonth.getMonth() && 
                selectedDate?.year === currentMonth.getFullYear()
                ? 'bg-[#047857] text-white font-semibold' 
                : day && !isPastDate(day)
                  ? 'hover:bg-white text-[#374151]' 
                  : ''}
              ${day && isToday(day) ? 'border-2 border-[#047857]' : ''}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

// ========== TIME SLOTS COMPONENT ==========
const TimeSlots = ({ selectedTime, setSelectedTime }) => {
  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true }
  ];
  
  return (
    <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-[#047857]" size={20} />
        <h3 className="text-lg font-semibold text-[#374151]">Available Time Slots</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            disabled={!slot.available}
            onClick={() => setSelectedTime(slot.time)}
            className={`
              py-3 px-4 rounded-lg text-sm font-medium transition-colors
              ${!slot.available 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : selectedTime === slot.time
                  ? 'bg-[#047857] text-white border-2 border-[#047857]'
                  : 'bg-white text-[#374151] border-2 border-gray-200 hover:border-[#047857]'}
            `}
          >
            {slot.time}
            {!slot.available && (
              <div className="text-xs mt-1">Unavailable</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ========== MAIN PAGE ==========
const CustomerDateTimeSelection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Check if this is a reschedule
  const isReschedule = location.state?.isReschedule || false;
  const bookingId = location.state?.bookingId || id;
  const currentDate = location.state?.currentDate || null;
  const currentTime = location.state?.currentTime || null;
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Service data from state or defaults
  const service = {
    title: location.state?.serviceName || 'Professional House Cleaning',
    provider: location.state?.providerName || 'Mohammed Ali',
    providerId: location.state?.providerId || null,
    serviceId: location.state?.serviceId || id,
    location: location.state?.location || 'To be confirmed',
    serviceCost: location.state?.serviceCost || 80,
    serviceImage: location.state?.serviceImage || ''
  };

  const handleContinue = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setLoading(true);
    setError('');

    if (isReschedule) {
      // Handle reschedule
      try {
        const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
        await bookingsAPI.reschedule(
          bookingId,
          dateObj.toISOString(),
          selectedDate.displayDate,
          selectedTime
        );
        
        navigate('/customer/bookings', {
          state: {
            success: true,
            message: 'Booking rescheduled successfully!'
          }
        });
      } catch (err) {
        setError(err.message || 'Failed to reschedule booking');
        setLoading(false);
      }
    } else {
      // For new booking, go to confirmation page with all data
      const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
      const serviceCost = service.serviceCost;
      const platformFee = serviceCost * 0.1;
      const tax = (serviceCost + platformFee) * 0.08;
      const total = serviceCost + platformFee + tax;

      navigate('/customer/booking/confirmation', {
        state: { 
          serviceId: service.serviceId,
          serviceName: service.title,
          providerName: service.provider,
          providerId: service.providerId,
          date: dateObj.toISOString(),
          displayDate: selectedDate.displayDate,
          time: selectedTime,
          location: service.location,
          duration: '1 hour',
          serviceImage: service.serviceImage,
          serviceCost,
          platformFee,
          tax,
          total
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(isReschedule ? '/customer/bookings' : `/services/${id}`)}
          className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#047857] mb-6 font-medium"
        >
          <ArrowLeft size={16} />
          {isReschedule ? 'Back to Bookings' : 'Back to Service Details'}
        </button>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#374151] mb-2">
            {isReschedule ? 'Reschedule Booking' : 'Select Date & Time'}
          </h1>
          <p className="text-gray-600">
            {isReschedule 
              ? 'Choose a new date and time for your booking. No additional payment required.'
              : 'Choose your preferred appointment slot'}
          </p>
          {isReschedule && currentDate && currentTime && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Current booking:</strong> {currentDate} at {currentTime}
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {/* Service Info Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#374151]">{service.title}</h3>
          <p className="text-sm text-gray-600">by {service.provider}</p>
        </div>
        
        {/* Calendar */}
        <div className="mb-6">
          <CalendarWidget selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        
        {/* Time Slots */}
        {selectedDate && (
          <div className="mb-6">
            <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
        )}
        
        {/* Info Box for Reschedule */}
        {isReschedule && (
          <div className="mb-6 p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[#047857] mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-[#047857] mb-1">No Payment Required</p>
                <p className="text-xs text-gray-700">
                  Since you've already paid for this booking, changing the date and time will not require any additional payment.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Continue/Reschedule Button */}
        <Button 
          variant="primary" 
          size="large"
          disabled={!selectedDate || !selectedTime || loading}
          onClick={handleContinue}
        >
          {loading 
            ? 'Processing...' 
            : isReschedule 
              ? 'Confirm Reschedule' 
              : 'Continue to Booking'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerDateTimeSelection;
