import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
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

// ========== BOOKING CONFIRMATION PAGE ==========
const CustomerBookingConfirmation = () => {
  const navigate = useNavigate();
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const bookingData = {
    service: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    date: 'November 15, 2024',
    time: '10:00 AM - 12:00 PM',
    location: '123 Main St, New York, NY 10001',
    duration: '2 hours',
    serviceCost: 80.00,
    platformFee: 8.00,
    tax: 7.20,
    total: 95.20
  };

  const handleConfirmBooking = () => {
    if (!agreedToPolicy) {
      alert('Please agree to the cancellation policy');
      return;
    }
    console.log('Booking confirmed!');
    alert('Booking confirmed successfully!');
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#374151] mb-2">Confirm Booking</h1>
          <p className="text-gray-600">Review your booking details and confirm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Service & Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-4">Service Details</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200" 
                  alt={bookingData.service}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#374151] mb-1">{bookingData.service}</h3>
                  <p className="text-sm text-gray-600">by {bookingData.provider}</p>
                  <p className="text-sm font-semibold text-[#047857] mt-1">${bookingData.serviceCost/bookingData.duration.split(' ')[0]}/hour</p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-4">Appointment Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-[#047857] mt-1" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium text-[#374151]">{bookingData.date}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-[#047857] mt-1" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Time</div>
                    <div className="font-medium text-[#374151]">{bookingData.time}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#047857] mt-1" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-medium text-[#374151]">{bookingData.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-4">Additional Notes (Optional)</h2>
              <textarea
                placeholder="Any special requests or instructions..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#047857]"
                rows={4}
              />
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
                />
                <span className="text-sm text-gray-700">
                  By confirming, you agree to our{' '}
                  <a href="#" className="text-[#047857] hover:text-[#065f46] font-medium underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-[#047857] hover:text-[#065f46] font-medium underline">
                    Cancellation Policy
                  </a>
                </span>
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[#374151] mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee ({bookingData.duration}):</span>
                  <span className="font-medium text-[#374151]">${bookingData.serviceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee:</span>
                  <span className="font-medium text-[#374151]">${bookingData.platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium text-[#374151]">${bookingData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                  <span className="font-semibold text-[#374151]">Total:</span>
                  <span className="font-bold text-xl text-[#374151]">${bookingData.total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="large"
                onClick={handleConfirmBooking}
                disabled={!agreedToPolicy}
                className="mb-3"
              >
                Confirm Booking
              </Button>
              
              <Button variant="outline" size="large" onClick={() => navigate(-1)}>
                Go Back
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-[#374151] mb-2">WHAT HAPPENS NEXT:</h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#047857] mt-0.5">✓</span>
                    <span>Booking request sent to provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#047857] mt-0.5">✓</span>
                    <span>Provider confirms within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#047857] mt-0.5">✓</span>
                    <span>Payment processed after confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#047857] mt-0.5">✓</span>
                    <span>Email confirmation sent</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingConfirmation;