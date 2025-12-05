import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';
import { availabilityAPI } from '../../services/api';

// ========== CALENDAR COMPONENT ==========
const Calendar = ({ selectedMonth, onMonthChange, availableDates, onDateToggle, blockedDates = [] }) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check if a date is in the past
  const isPastDate = (day) => {
    if (!day) return false;
    const date = new Date(selectedMonth.year, selectedMonth.month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const daysInMonth = getDaysInMonth(selectedMonth.year, selectedMonth.month);
  const firstDay = getFirstDayOfMonth(selectedMonth.year, selectedMonth.month);
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isDateAvailable = (day) => {
    if (!day) return false;
    const dateStr = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availableDates.has(dateStr);
  };

  const isDateBlocked = (day) => {
    if (!day) return false;
    const dateStr = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return blockedDates.some(blocked => blocked.date === dateStr);
  };

  const handleDateClick = (day) => {
    if (!day || isPastDate(day)) return; // Prevent clicking past dates
    const dateStr = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateToggle(dateStr);
  };

  const handlePrevMonth = () => {
    if (selectedMonth.month === 0) {
      onMonthChange({ year: selectedMonth.year - 1, month: 11 });
    } else {
      onMonthChange({ year: selectedMonth.year, month: selectedMonth.month - 1 });
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth.month === 11) {
      onMonthChange({ year: selectedMonth.year + 1, month: 0 });
    } else {
      onMonthChange({ year: selectedMonth.year, month: selectedMonth.month + 1 });
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Calendar</h2>
      
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-900">
          {monthNames[selectedMonth.month]} {selectedMonth.year}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((day, index) => {
          const isPast = isPastDate(day);
          const isBlocked = isDateBlocked(day);
          const isAvailable = isDateAvailable(day);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!day || isPast || isBlocked}
              className={`
                aspect-square p-2 text-sm rounded border
                ${!day ? 'invisible' : ''}
                ${isPast 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50' 
                  : isBlocked
                    ? 'bg-red-100 text-red-600 border-red-300 cursor-not-allowed'
                    : isAvailable 
                      ? 'text-white border-transparent hover:opacity-90' 
                      : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                }
                transition-colors ${!isPast && !isBlocked ? 'cursor-pointer' : ''} disabled:cursor-not-allowed
              `}
              style={isAvailable && !isPast && !isBlocked ? { backgroundColor: '#047857' } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#047857' }}></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-600">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-sm text-gray-600">Blocked</span>
        </div>
      </div>
    </div>
  );
};

// ========== WEEKLY SCHEDULE COMPONENT ==========
const WeeklySchedule = ({ schedule, onScheduleChange, availableDates }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Check if a day has at least one date selected in the calendar
  const isDaySelectedInCalendar = (day) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = dayNames.indexOf(day);
    
    // Check if any date in availableDates falls on this day of the week
    for (const dateStr of availableDates) {
      const date = new Date(dateStr + 'T00:00:00');
      if (date.getDay() === dayIndex) {
        return true;
      }
    }
    return false;
  };

  const handleTimeChange = (day, field, value) => {
    onScheduleChange({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value
      }
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Schedule</h2>
      
      <div className="space-y-4">
        {days.map(day => {
          const hasDates = isDaySelectedInCalendar(day);
          const isEnabled = schedule[day].enabled && hasDates;
          
          return (
            <div key={day} className={`flex items-center gap-4 ${!isEnabled ? 'opacity-60' : ''}`}>
              <div className={`w-24 text-sm font-medium ${isEnabled ? 'text-gray-900' : 'text-gray-400'}`}>
                {day}
              </div>
              
              <input
                type="time"
                value={schedule[day].start}
                onChange={(e) => isEnabled && handleTimeChange(day, 'start', e.target.value)}
                disabled={!isEnabled}
                readOnly={!isEnabled}
                className="px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                style={{ pointerEvents: isEnabled ? 'auto' : 'none' }}
              />
              
              <span className={`text-sm ${isEnabled ? 'text-gray-600' : 'text-gray-400'}`}>to</span>
              
              <input
                type="time"
                value={schedule[day].end}
                onChange={(e) => isEnabled && handleTimeChange(day, 'end', e.target.value)}
                disabled={!isEnabled}
                readOnly={!isEnabled}
                className="px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                style={{ pointerEvents: isEnabled ? 'auto' : 'none' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ========== BLOCK DATES COMPONENT ==========
const BlockDates = ({ blockedDates, onAddDate, onRemoveDate }) => {
  const [newDate, setNewDate] = useState('');
  const [reason, setReason] = useState('');

  const handleAdd = () => {
    if (!newDate) {
      alert('Please select a date');
      return;
    }
    // Check if the date is in the past
    const selectedDate = new Date(newDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert('Cannot block dates in the past');
      return;
    }
    
    onAddDate({ date: newDate, reason: reason || 'Holiday' });
    setNewDate('');
    setReason('');
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Block Specific Dates</h2>
      
      {/* Add Date Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
          style={{ focusRingColor: '#047857' }}
        />
        <button 
          onClick={handleAdd}
          className="px-6 py-2 text-white rounded font-medium hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#065f46' }}
        >
          Add
        </button>
      </div>

      {/* Blocked Dates List */}
      <div className="space-y-2">
        {blockedDates.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded"
          >
            <div>
              <p className="font-medium text-gray-900">
                {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600">{item.reason}</p>
            </div>
            <button 
              onClick={() => onRemoveDate(index)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        ))}
        
        {blockedDates.length === 0 && (
          <p className="text-center text-gray-500 py-4">No blocked dates</p>
        )}
      </div>
    </div>
  );
};

// ========== MAIN AVAILABILITY PAGE ==========
const AvailabilityManagement = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [selectedMonth, setSelectedMonth] = useState({ 
    year: new Date().getFullYear(), 
    month: new Date().getMonth()
  });
  
  const [availableDates, setAvailableDates] = useState(new Set());

  const [schedule, setSchedule] = useState({
    Monday: { start: '09:00', end: '17:00', enabled: false },
    Tuesday: { start: '09:00', end: '17:00', enabled: false },
    Wednesday: { start: '09:00', end: '17:00', enabled: false },
    Thursday: { start: '09:00', end: '17:00', enabled: false },
    Friday: { start: '09:00', end: '17:00', enabled: false },
    Saturday: { start: '09:00', end: '17:00', enabled: false },
    Sunday: { start: '09:00', end: '17:00', enabled: false }
  });

  const [blockedDates, setBlockedDates] = useState([]);

  // Fetch availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await availabilityAPI.getMyAvailability();
        if (response.success && response.data) {
          // Load saved dates from calendar, but don't auto-enable weekly schedule days
          if (response.data.availableDates && response.data.availableDates.length > 0) {
            // Filter out past dates from saved availability
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const validDates = response.data.availableDates.filter(dateStr => {
              const date = new Date(dateStr + 'T00:00:00');
              date.setHours(0, 0, 0, 0);
              return date >= today;
            });
            setAvailableDates(new Set(validDates));
            
            // Only enable days in weekly schedule if there are dates for those days
            if (response.data.weeklySchedule) {
              const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const updatedSchedule = { ...response.data.weeklySchedule };
              
              // Check each day - only enable if there are dates for that day
              dayNames.forEach(day => {
                const dayIndex = dayNames.indexOf(day);
                const hasDatesForDay = Array.from(validDates).some(dateStr => {
                  const date = new Date(dateStr + 'T00:00:00');
                  return date.getDay() === dayIndex;
                });
                
                // Only enable if there are dates for this day
                updatedSchedule[day] = {
                  ...updatedSchedule[day],
                  enabled: hasDatesForDay
                };
              });
              
              setSchedule(updatedSchedule);
            }
          } else {
            // No saved dates - start with empty schedule and dates
            setAvailableDates(new Set());
            // Keep schedule with all days disabled (already set in initial state)
          }
          
          if (response.data.blockedDates) {
            setBlockedDates(response.data.blockedDates);
          }
        }
      } catch (err) {
        console.error('Could not fetch availability:', err);
        // Don't show error on initial load if it's just that no availability is set yet
        if (err.message && !err.message.includes('Route not found') && !err.message.includes('Not authorized')) {
          setError(err.message || 'Failed to load availability');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailability();
  }, []);

  // ========== HANDLERS ==========
  
  const handleDateToggle = (dateStr) => {
    const newDates = new Set(availableDates);
    const date = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[date.getDay()];
    
    if (newDates.has(dateStr)) {
      // Removing a date
      newDates.delete(dateStr);
      
      // Check if there are any other dates for this day of the week
      let hasOtherDatesForDay = false;
      for (const otherDateStr of newDates) {
        const otherDate = new Date(otherDateStr + 'T00:00:00');
        if (otherDate.getDay() === date.getDay()) {
          hasOtherDatesForDay = true;
          break;
        }
      }
      
      // If no other dates for this day remain, disable the day in weekly schedule
      if (!hasOtherDatesForDay && schedule[dayOfWeek]?.enabled) {
        setSchedule(prev => ({
          ...prev,
          [dayOfWeek]: {
            ...prev[dayOfWeek],
            enabled: false
          }
        }));
      }
    } else {
      // Adding a date
      newDates.add(dateStr);
      
      // Enable the corresponding day in the weekly schedule
      // Only enable if not already enabled
      if (!schedule[dayOfWeek]?.enabled) {
        setSchedule(prev => ({
          ...prev,
          [dayOfWeek]: {
            ...prev[dayOfWeek],
            enabled: true
          }
        }));
      }
    }
    setAvailableDates(newDates);
  };

  const handleScheduleChange = (newSchedule) => {
    setSchedule(newSchedule);
    // Don't auto-generate dates - let provider manually select dates in calendar
  };

  const handleAddBlockedDate = (dateInfo) => {
    setBlockedDates([...blockedDates, dateInfo]);
  };

  const handleRemoveBlockedDate = (index) => {
    const newBlockedDates = blockedDates.filter((_, i) => i !== index);
    setBlockedDates(newBlockedDates);
  };

  const handleSaveAvailability = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Filter out past dates before saving
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const validAvailableDates = Array.from(availableDates).filter(dateStr => {
        const date = new Date(dateStr + 'T00:00:00');
        date.setHours(0, 0, 0, 0);
        return date >= today;
      });
      
      const validBlockedDates = blockedDates.filter(item => {
        const date = new Date(item.date + 'T00:00:00');
        date.setHours(0, 0, 0, 0);
        return date >= today;
      });
      
      const response = await availabilityAPI.updateAvailability({
        weeklySchedule: schedule,
        availableDates: validAvailableDates,
        blockedDates: validBlockedDates
      });
      
      if (response.success) {
        setSuccess('Availability saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Save availability error:', err);
      // Check if it's a network error or route not found
      if (err.message && err.message.includes('Route not found')) {
        setError('Unable to connect to server. Please check your connection and try again.');
      } else if (err.message && err.message.includes('Not authorized')) {
        setError('You are not authorized to perform this action. Please log in again.');
      } else {
        setError(err.message || 'Failed to save availability. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ProviderHeader />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin text-[#047857]" size={32} />
          <span className="ml-2 text-gray-600">Loading availability...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Availability</h1>
          <p className="text-gray-600 text-sm">Set your available time slots for bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Calendar */}
          <div>
            <Calendar 
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              availableDates={availableDates}
              onDateToggle={handleDateToggle}
              blockedDates={blockedDates}
            />
          </div>

          {/* Right Column - Schedule & Blocked Dates */}
          <div className="space-y-6">
            <WeeklySchedule 
              schedule={schedule}
              onScheduleChange={handleScheduleChange}
              availableDates={availableDates}
            />
            
            <BlockDates 
              blockedDates={blockedDates}
              onAddDate={handleAddBlockedDate}
              onRemoveDate={handleRemoveBlockedDate}
            />

            {/* Status Messages */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            {/* Save Button */}
            <button 
              onClick={handleSaveAvailability}
              disabled={saving}
              className="w-full py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                'Save Availability'
              )}
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AvailabilityManagement;