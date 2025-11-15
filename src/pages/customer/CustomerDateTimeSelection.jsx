import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

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

// ========== HEADER COMPONENT ==========
const Header = () => {
  return (
    <header className="bg-[#1e3a8a] text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#1e3a8a] font-bold text-lg">L</span>
            </div>
            <h1 className="text-xl font-bold">Labbi - لبِّ</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-200 transition-colors text-sm">
            My Profile
          </button>
          <button className="text-white hover:text-gray-200 transition-colors text-sm">
            Find Services
          </button>
          <button className="text-white hover:text-gray-200 transition-colors text-sm">
            My Bookings
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-[#374151]">AA</span>
          </div>
        </div>
      </div>
    </header>
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
  
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
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
            disabled={!day || day < 15}
            onClick={() => day && setSelectedDate(day)}
            className={`
              py-2 text-sm rounded-lg transition-colors
              ${!day ? 'invisible' : ''}
              ${day && day < 15 ? 'text-gray-300 cursor-not-allowed' : ''}
              ${day && day >= 15 && selectedDate === day 
                ? 'bg-[#047857] text-white font-semibold' 
                : day && day >= 15 
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const service = {
    title: 'Professional House Cleaning',
    provider: 'Sarah Johnson'
  };
  
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      console.log('Continue to booking:', { selectedDate, selectedTime });
      // Navigate to confirmation page
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#047857] mb-6 font-medium">
          <ArrowLeft size={16} />
          Back to Service Details
        </button>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#374151] mb-2">Select Date & Time</h1>
          <p className="text-gray-600">Choose your preferred appointment slot</p>
        </div>
        
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
        
        {/* Continue Button */}
        <Button 
          variant="primary" 
          size="large"
          disabled={!selectedDate || !selectedTime}
          onClick={handleContinue}
        >
          Continue to Booking
        </Button>
      </div>
    </div>
  );
};

export default CustomerDateTimeSelection;