import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

// ========== HEADER COMPONENT ==========
const Header = () => {
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center font-bold text-lg">
            L
          </div>
          <h1 className="text-xl font-bold">Labbi - لبِّ</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            Dashboard
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            My Services
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            Bookings
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-semibold">
            Availability
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer">
            SA
          </div>
        </div>
      </div>
    </header>
  );
};

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
    <div className="bg-white border border-gray-300 rounded-lg p-6">
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
                ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' 
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
              }
              transition-colors cursor-pointer disabled:cursor-default
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-900 rounded"></div>
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
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
    <div className="bg-white border border-gray-300 rounded-lg p-6">
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
                  ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
                  : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-50'
              }`}
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
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Block Specific Dates</h2>
      
      {/* Add Date Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button 
          onClick={handleAdd}
          className="px-6 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Blocked Dates List */}
      <div className="space-y-2">
        {blockedDates.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded"
          >
            <div>
              <p className="font-medium text-gray-900">
                {new Date(item.date).toLocaleDateString('en-US', { 
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
const AvailabilityManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState({ 
    year: 2025, 
    month: 9 // October (0-indexed)
  });
  
  const [availableDates, setAvailableDates] = useState(new Set([
    '2025-10-01', '2025-10-02', '2025-10-03', '2025-10-05',
    '2025-10-08', '2025-10-10', '2025-10-15', '2025-10-20'
  ]));

  const [schedule, setSchedule] = useState({
    Monday: { start: '09:00', end: '17:00', enabled: true },
    Tuesday: { start: '09:00', end: '17:00', enabled: true },
    Wednesday: { start: '09:00', end: '17:00', enabled: true },
    Thursday: { start: '09:00', end: '17:00', enabled: true },
    Friday: { start: '09:00', end: '17:00', enabled: true }
  });

  const [blockedDates, setBlockedDates] = useState([
    { date: '2025-10-25', reason: 'Holiday' }
  ]);

  // ========== API READY HANDLERS ==========
  
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
    /*
    try {
      const response = await fetch('/api/provider/availability', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          availableDates: Array.from(availableDates),
          weeklySchedule: schedule,
          blockedDates: blockedDates
        })
      });
      
      if (!response.ok) throw new Error('Failed to save availability');
      
      alert('Availability saved successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability');
    }
    */
    
    console.log('Saving availability:', {
      availableDates: Array.from(availableDates),
      schedule,
      blockedDates
    });
    alert('Availability saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Availability</h1>
          <p className="text-gray-600">Set your available time slots for bookings</p>
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
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Save Availability
            </button>

            {/* Info Box */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
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