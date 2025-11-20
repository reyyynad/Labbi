import React, { useState } from 'react';
import { Camera, Settings, CheckCircle, Edit2 } from 'lucide-react';
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
    outline: 'border-2 border-gray-300 bg-white text-[#374151] hover:bg-gray-50'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-5 py-2.5 text-sm',
    large: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// ========== MAIN CUSTOMER PROFILE PAGE ==========
const CustomerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    initials: 'MA',
    fullName: 'Mohammed Ali',
    email: 'mohammed.ali@example.com',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    memberSince: 'October 2024'
  });

  const [stats] = useState({
    totalBookings: 12,
    totalSpent: 1240,
    favoriteServices: 3
  });

  const [recentBookings] = useState([
    {
      service: 'House Cleaning',
      provider: 'Renad Elsafi',
      date: 'Nov 10, 2024',
      status: 'Completed',
      price: '120'
    },
    {
      service: 'Plumbing Repair',
      provider: 'Shatha Alharbi',
      date: 'Nov 8, 2024',
      status: 'Completed',
      price: '85'
    },
    {
      service: 'Personal Training',
      provider: 'Arwa Aldawoud',
      date: 'Nov 5, 2024',
      status: 'Completed',
      price: '50'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#374151] mb-1">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4 text-[#374151]" />
            <span className="text-[#374151]">Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-[#047857] rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {profileData.initials}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-[#047857] rounded-full flex items-center justify-center hover:bg-[#f0fdf4]">
                  <Camera className="w-5 h-5 text-[#047857]" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#374151] mb-2">{profileData.fullName}</h2>
              <p className="text-sm text-gray-600">Customer</p>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="font-semibold text-[#374151]">{profileData.memberSince}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="font-semibold text-[#374151]">{stats.totalBookings}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="font-semibold text-[#374151]">SR{stats.totalSpent}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Favorite Services</p>
                <p className="font-semibold text-[#374151]">{stats.favoriteServices}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Log Out
            </Button>
          </div>

          {/* Right Column - Profile Information & Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#374151]">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="primary" onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit2 size={16} />
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f0fdf4] border-2 border-[#047857] rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-[#374151]">{stats.totalBookings}</p>
              </div>
              
              <div className="bg-[#f0fdf4] border-2 border-[#047857] rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-[#374151]">SR{stats.totalSpent.toLocaleString()}</p>
              </div>
              
              <div className="bg-[#f0fdf4] border-2 border-[#047857] rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Favorite Services</p>
                <p className="text-3xl font-bold text-[#374151]">{stats.favoriteServices}</p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#374151] mb-6">Verification Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#047857]" />
                    <div>
                      <p className="font-semibold text-[#374151]">Email Verified</p>
                      <p className="text-sm text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#047857] text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#047857]" />
                    <div>
                      <p className="font-semibold text-[#374151]">Phone Verified</p>
                      <p className="text-sm text-gray-600">{profileData.phone}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#047857] text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#374151]">Recent Bookings</h3>
                <button 
                  onClick={() => navigate('/bookings')}
                  className="text-sm text-[#047857] hover:text-[#065f46] font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#374151] mb-1">{booking.service}</h4>
                      <p className="text-sm text-gray-600">Provider: {booking.provider}</p>
                      <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-[#047857] text-white text-xs rounded-full mb-2">
                        {booking.status}
                      </span>
                      <p className="font-semibold text-[#374151]">SR{booking.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;