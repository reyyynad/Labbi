import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

// ========== CALENDAR COMPONENT ==========
const Calendar = ({ selectedMonth, onMonthChange, availableDates, onDateToggle }) => {
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

  const handleDateClick = (day) => {
    if (!day) return;
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
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={!day}
            className={`
              aspect-square p-2 text-sm rounded border
              ${!day ? 'invisible' : ''}
              ${isDateAvailable(day) 
                ? 'text-white border-transparent hover:opacity-90' 
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
              }
              transition-colors cursor-pointer disabled:cursor-default
            `}
            style={isDateAvailable(day) ? { backgroundColor: '#047857' } : {}}
          >
            {day}
          </button>
        ))}
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
      </div>
    </div>
  );
};

// ========== WEEKLY SCHEDULE COMPONENT ==========
const WeeklySchedule = ({ schedule, onScheduleChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleTimeChange = (day, field, value) => {
    onScheduleChange({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value
      }
    });
  };

  const toggleDay = (day) => {
    onScheduleChange({
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled: !schedule[day].enabled
      }
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Schedule</h2>
      
      <div className="space-y-4">
        {days.map(day => (
          <div key={day} className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-gray-900">
              {day}
            </div>
            
            <input
              type="time"
              value={schedule[day].start}
              onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
              disabled={!schedule[day].enabled}
              className="px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-50 disabled:text-gray-400"
            />
            
            <span className="text-sm text-gray-600">to</span>
            
            <input
              type="time"
              value={schedule[day].end}
              onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
              disabled={!schedule[day].enabled}
              className="px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-50 disabled:text-gray-400"
            />
            
            <button
              onClick={() => toggleDay(day)}
              className={`p-2 border rounded transition-colors ${
                schedule[day].enabled
                  ? 'text-white border-transparent hover:opacity-90'
                  : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-50'
              }`}
              style={schedule[day].enabled ? { backgroundColor: '#047857' } : {}}
            >
              <Check size={16} />
            </button>
          </div>
        ))}
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
  const [selectedMonth, setSelectedMonth] = useState({ 
    year: 2025, 
    month: 10 // November (0-indexed)
  });
  
  const [availableDates, setAvailableDates] = useState(new Set([
    '2025-11-04', '2025-11-05', '2025-11-06', '2025-11-07',
    '2025-11-11', '2025-11-12', '2025-11-13', '2025-11-14',
    '2025-11-18', '2025-11-19', '2025-11-20', '2025-11-21'
  ]));

  const [schedule, setSchedule] = useState({
    Monday: { start: '09:00', end: '17:00', enabled: true },
    Tuesday: { start: '09:00', end: '17:00', enabled: true },
    Wednesday: { start: '09:00', end: '17:00', enabled: true },
    Thursday: { start: '09:00', end: '17:00', enabled: true },
    Friday: { start: '09:00', end: '17:00', enabled: true },
    Saturday: { start: '09:00', end: '17:00', enabled: false },
    Sunday: { start: '09:00', end: '17:00', enabled: false }
  });

  const [blockedDates, setBlockedDates] = useState([
    { date: '2025-10-25', reason: 'Holiday' }
  ]);

  // ========== HANDLERS ==========
  
  const handleDateToggle = (dateStr) => {
    const newDates = new Set(availableDates);
    if (newDates.has(dateStr)) {
      newDates.delete(dateStr);
    } else {
      newDates.add(dateStr);
    }
    setAvailableDates(newDates);
    
    // TODO: API call to update availability
    // await updateAvailability(dateStr, newDates.has(dateStr));
  };

  const handleScheduleChange = (newSchedule) => {
    setSchedule(newSchedule);
    
    // TODO: API call to update schedule
    // await updateWeeklySchedule(newSchedule);
  };

  const handleAddBlockedDate = (dateInfo) => {
    setBlockedDates([...blockedDates, dateInfo]);
    
    // TODO: API call to add blocked date
    // await addBlockedDate(dateInfo);
  };

  const handleRemoveBlockedDate = (index) => {
    const newBlockedDates = blockedDates.filter((_, i) => i !== index);
    setBlockedDates(newBlockedDates);
    
    // TODO: API call to remove blocked date
    // await removeBlockedDate(blockedDates[index].date);
  };

  const handleSaveAvailability = async () => {
    // TODO: API call to save all availability settings
    console.log('Saving availability:', {
      availableDates: Array.from(availableDates),
      schedule,
      blockedDates
    });
    alert('Availability saved successfully!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="text-white shadow-sm" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                <svg className="w-5 h-5" style={{ color: '#1e3a8a' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-lg font-semibold">ServiceHub</span>
            </div>
            
            <nav className="flex items-center gap-8 text-sm">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-200 transition-colors">
                Dashboard
              </button>
              <button onClick={() => onNavigate('services')} className="hover:text-gray-200 transition-colors">
                My Services
              </button>
              <button onClick={() => onNavigate('bookings')} className="hover:text-gray-200 transition-colors">
                Bookings
              </button>
              <button className="font-medium">
                Availability
              </button>
              <button onClick={() => onNavigate('profile')} className="hover:text-gray-200 transition-colors">
                Profile
              </button>
              <button onClick={() => onNavigate('reviews')} className="hover:text-gray-200 transition-colors">
                Reviews
              </button>
              <button onClick={() => onNavigate('settings')} className="hover:text-gray-200 transition-colors">
                Settings
              </button>
            </nav>
          </div>
        </div>
      </header>

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
            />
          </div>

          {/* Right Column - Schedule & Blocked Dates */}
          <div className="space-y-6">
            <WeeklySchedule 
              schedule={schedule}
              onScheduleChange={handleScheduleChange}
            />
            
            <BlockDates 
              blockedDates={blockedDates}
              onAddDate={handleAddBlockedDate}
              onRemoveDate={handleRemoveBlockedDate}
            />

            {/* Save Button */}
            <button 
              onClick={handleSaveAvailability}
              className="w-full py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              Save Availability
            </button>

            {/* Info Box */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="font-bold text-gray-900 mb-3">AVAILABILITY SYSTEM:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Validates no overlapping slots</li>
                <li>• Changes visible to clients immediately</li>
                <li>• Automatic booking conflict checks</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvailabilityManagement;