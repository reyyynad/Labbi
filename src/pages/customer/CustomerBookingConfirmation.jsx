import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    white: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-300'
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
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

// ========== HEADER COMPONENT ==========
const Header = () => {
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center font-bold">
            L
          </div>
          <h1 className="text-xl font-bold">Labbi - لَـبّـي</h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            Find Services
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            My Bookings
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
            AA
          </div>
        </div>
      </div>
    </header>
  );
};

// ========== BOOKING CONFIRMATION PAGE ==========
const BookingConfirmation = () => {
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const bookingData = {
    service: 'Professional Web Development',
    provider: 'Remad Elsafi',
    date: 'October 15, 2025',
    time: '2:00 PM - 3:00 PM',
    duration: '1 hour',
    serviceCost: '50 SAR',
    platformFee: '5 SAR',
    total: '55 SAR'
  };

  const handleConfirmBooking = () => {
    if (!agreedToPolicy) {
      alert('Please agree to the cancellation policy');
      return;
    }
    console.log('Booking confirmed!');
    // Add booking confirmation logic here
  };

  const handleGoBack = () => {
    console.log('Going back...');
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Main Card */}
        <div className="bg-white border-2 border-gray-900 rounded-lg p-8">
          {/* Header Icon and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-900 mb-4">
              <Calendar size={32} className="text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Confirm Your Booking</h1>
            <p className="text-gray-600">Review your booking details and confirm</p>
          </div>

          {/* Service Details Section */}
          <div className="border border-gray-300 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Service Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium text-right">{bookingData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{bookingData.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{bookingData.duration}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="border border-gray-300 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Cost:</span>
                <span className="font-medium">{bookingData.serviceCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-medium">{bookingData.platformFee}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-300">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">{bookingData.total}</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded p-3 text-sm text-gray-700">
              <span className="font-medium">Payment Method:</span> Payment upon agreement with service provider
            </div>
          </div>

          {/* Cancellation Policy Agreement */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-gray-900 underline hover:text-gray-700">
                  cancellation policy
                </a>
                {' '}and understand that cancellations within 24 hours may incur a fee.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleConfirmBooking}
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Confirm Booking
            </button>
            <button
              onClick={handleGoBack}
              className="flex-1 bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* System Process Info Box */}
        <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="font-semibold mb-3">SYSTEM PROCESS:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Booking request sent to provider</li>
            <li>• Provider has to accept/decline</li>
            <li>• Payment held until service completion</li>
            <li>• Email confirmation sent</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;