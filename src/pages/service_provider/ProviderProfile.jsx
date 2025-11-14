import React, { useState } from 'react';
import { Camera, CheckCircle, Settings } from 'lucide-react';

const ProviderProfile = ({ onNavigate }) => {
  const [profileData, setProfileData] = useState({
    fullName: 'Shatha Alharbi',
    email: 'Shathaalharbi@e.com',
    phone: '+966553311243',
    location: 'Al-Jubail, SA',
    bio: 'Professional web developer with 5+ years of experience in full-stack development.',
    primaryCategory: 'Web Development',
    yearsExperience: '5+ years',
    totalServices: 12,
    completedBookings: 88,
    totalEarnings: 12450
  });

  const recentBookings = [
    { name: 'Laena Aheair', service: 'Web Development', date: 'Oct 15, 2025', status: 'Completed' },
    { name: 'Ghadi Al-Amer', service: 'Consulting', date: 'Oct 15, 2025', status: 'Upcoming' },
    { name: 'Raneem Aheairi', service: 'Code Review', date: 'Oct 20, 2025', status: 'Upcoming' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-gray-900 rounded flex items-center justify-center font-bold">
                L
              </div>
              <span className="text-xl font-semibold">Labbi - لَبِّ</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-white">Dashboard</button>
              <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-white">My Services</button>
              <button onClick={() => onNavigate('bookings')} className="text-gray-400 hover:text-white">Bookings</button>
              <button onClick={() => onNavigate('availability')} className="text-gray-400 hover:text-white">Availability</button>
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4 cursor-pointer">
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Provider Profile</h1>
            <p className="text-gray-600">Manage your professional profile and account</p>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-600">
                  SA
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <p className="text-sm text-gray-600">(127 reviews)</p>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold text-gray-900">August 2024</p>
              
              <p className="text-sm text-gray-600 mt-4">Total Services</p>
              <p className="font-semibold text-gray-900">{profileData.totalServices}</p>
              
              <p className="text-sm text-gray-600 mt-4">Completed Bookings</p>
              <p className="font-semibold text-gray-900">{profileData.completedBookings}</p>
              
              <p className="text-sm text-gray-600 mt-4">Earnings (Total)</p>
              <p className="font-semibold text-gray-900">SR {profileData.totalEarnings}</p>
            </div>

            <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Log Out
            </button>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Information */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Professional Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>
                ) : (
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Primary Category</label>
                  <input
                    type="text"
                    name="primaryCategory"
                    value={profileData.primaryCategory}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    name="yearsExperience"
                    value={profileData.yearsExperience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Verification & Credentials */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Verification & Credentials</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Email Verified</p>
                      <p className="text-sm text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone Verified</p>
                      <p className="text-sm text-gray-600">{profileData.phone}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Identity Verified</p>
                      <p className="text-sm text-gray-600">Background check completed</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
              
              <div className="space-y-3">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{booking.name}</p>
                      <p className="text-sm text-gray-600">{booking.service} • {booking.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">PROVIDER PROFILE FEATURES:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• View professional information and recent activity</li>
                <li>• Access Settings to manage notifications and payout</li>
                <li>• Update passwords and security settings</li>
                <li>• Verification status and credentials display</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;