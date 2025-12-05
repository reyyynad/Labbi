import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import { bookingsAPI, availabilityAPI } from '../../services/api';

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
const CalendarWidget = ({ selectedDate, setSelectedDate, availability, blockedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
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

  // Check if date is available based on provider's selected dates
  const isDateAvailable = (day) => {
    if (!day || isPastDate(day)) return false;
    
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if blocked
    if (blockedDates.some(b => b.date === dateStr)) return false;
    
    // Check if date is in provider's selected availableDates array
    // This is the primary check - only show dates the provider has specifically selected
    if (availability?.availableDates && Array.isArray(availability.availableDates)) {
      return availability.availableDates.includes(dateStr);
    }
    
    // If no specific dates are set, don't show any dates as available
    return false;
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
        {days.map((day, index) => {
          const available = isDateAvailable(day);
          const past = day && isPastDate(day);
          const isSelected = day && selectedDate?.day === day && 
                            selectedDate?.month === currentMonth.getMonth() && 
                            selectedDate?.year === currentMonth.getFullYear();
          
          return (
            <button
              key={index}
              disabled={!day || past || !available}
              onClick={() => day && available && setSelectedDate({
                day,
                month: currentMonth.getMonth(),
                year: currentMonth.getFullYear(),
                displayDate: `${monthNames[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`,
                dateStr: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              })}
              className={`
                py-2 text-sm rounded-lg transition-colors
                ${!day ? 'invisible' : ''}
                ${past ? 'text-gray-300 cursor-not-allowed' : ''}
                ${!past && !available ? 'text-gray-300 bg-gray-100 cursor-not-allowed' : ''}
                ${isSelected ? 'bg-[#047857] text-white font-semibold' : ''}
                ${day && !past && available && !isSelected ? 'hover:bg-white text-[#374151] bg-green-50' : ''}
                ${day && isToday(day) && !isSelected ? 'border-2 border-[#047857]' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-200">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== TIME SLOTS COMPONENT ==========
const TimeSlots = ({ selectedTime, setSelectedTime, timeSlots, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-[#047857]" size={20} />
          <h3 className="text-lg font-semibold text-[#374151]">Available Time Slots</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-[#047857]" size={24} />
          <span className="ml-2 text-gray-600">Loading time slots...</span>
        </div>
      </div>
    );
  }

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-[#047857]" size={20} />
          <h3 className="text-lg font-semibold text-[#374151]">Available Time Slots</h3>
        </div>
        <p className="text-center text-gray-500 py-4">No available time slots for this date</p>
      </div>
    );
  }
  
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
              <div className="text-xs mt-1">Booked</div>
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
  const currentDateStr = location.state?.currentDateStr || null;
  const currentTime = location.state?.currentTime || null;
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Availability state
  const [availability, setAvailability] = useState(null);
  const [hasAvailability, setHasAvailability] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  
  // Service data from state - must be provided from previous page
  const service = {
    title: location.state?.serviceName || 'Service',
    provider: location.state?.providerName || 'Provider',
    providerId: location.state?.providerId || null,
    serviceId: location.state?.serviceId || id,
    location: location.state?.location || 'Location',
    serviceCost: location.state?.serviceCost || 0,
    serviceImage: location.state?.serviceImage || '',
    sessionDuration: location.state?.sessionDuration || 1
  };
  
  // Redirect if no proper service data was passed
  useEffect(() => {
    if (!location.state?.providerId) {
      console.warn('No provider ID passed - redirecting');
      navigate(`/services/${id}`);
    }
  }, [location.state?.providerId, navigate, id]);

  // Fetch provider availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!service.providerId) {
        setLoadingAvailability(false);
        return;
      }
      
      try {
        const response = await availabilityAPI.getProviderAvailability(service.providerId);
        if (response.success) {
          setAvailability(response.data);
          setHasAvailability(response.data.hasAvailability !== false);
        }
      } catch (err) {
        console.log('Could not fetch availability:', err);
        setHasAvailability(false);
      } finally {
        setLoadingAvailability(false);
      }
    };
    
    fetchAvailability();
  }, [service.providerId]);

  // Fetch time slots when date is selected
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate?.dateStr || !service.providerId) {
        setTimeSlots([]);
        return;
      }
      
      setLoadingSlots(true);
      setSelectedTime(null); // Reset selected time
      
      try {
        const response = await availabilityAPI.getTimeSlots(service.providerId, selectedDate.dateStr);
        if (response.success) {
          setTimeSlots(response.data);
        } else {
          setTimeSlots([]);
        }
      } catch (err) {
        console.log('Could not fetch time slots:', err);
        // No fallback - show empty slots
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    
    fetchTimeSlots();
  }, [selectedDate, service.providerId]);

  const handleContinue = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setLoading(true);
    setError('');

    if (isReschedule) {
      // Handle reschedule
      try {
        const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
        
        // Note: Backend handles freeing old slot when rescheduling
        await bookingsAPI.reschedule(
          bookingId,
          dateObj.toISOString(),
          selectedDate.displayDate,
          selectedTime
        );
        
        // Note: Old slot is freed by backend, and new slot will be booked when provider accepts
        // Rescheduled bookings go back to Pending status
        
        navigate('/customer/bookings', {
          state: {
            success: true,
            message: 'Booking rescheduled! Waiting for provider confirmation.'
          }
        });
      } catch (err) {
        setError(err.message || 'Failed to reschedule booking');
        setLoading(false);
      }
    } else {
      // For new booking, go to confirmation page with all data
      const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
      const duration = service.sessionDuration || 1;
      const serviceCost = service.serviceCost * duration; // Multiply by duration
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
          dateStr: selectedDate.dateStr, // YYYY-MM-DD format for slot booking
          displayDate: selectedDate.displayDate,
          time: selectedTime,
          location: service.location,
          duration: `${duration} hour${duration > 1 ? 's' : ''}`,
          durationHours: duration,
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
          {loadingAvailability ? (
            <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6 flex items-center justify-center">
              <Loader2 className="animate-spin text-[#047857]" size={24} />
              <span className="ml-2 text-gray-600">Loading availability...</span>
            </div>
          ) : !hasAvailability ? (
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-8 text-center">
              <Calendar className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Availability Not Set</h3>
              <p className="text-gray-600 mb-4">
                This service provider hasn't set their availability yet. Please check back later or contact the provider directly.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-[#047857] text-white rounded-lg font-medium hover:bg-[#065f46]"
              >
                Go Back
              </button>
            </div>
          ) : (
            <CalendarWidget 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              availability={availability}
              blockedDates={availability?.blockedDates || []}
            />
          )}
        </div>
        
        {/* Time Slots */}
        {selectedDate && hasAvailability && (
          <div className="mb-6">
            <TimeSlots 
              selectedTime={selectedTime} 
              setSelectedTime={setSelectedTime}
              timeSlots={timeSlots}
              loading={loadingSlots}
            />
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
        {hasAvailability && (
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
        )}
      </div>
    </div>
  );
};

export default CustomerDateTimeSelection;
