import React, { useState } from 'react';
import { Camera } from 'lucide-react';

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
            Find Services
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline">
            My Bookings
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer">
            AA
          </div>
        </div>
      </div>
    </header>
  );
};

// ========== PROFILE SIDEBAR COMPONENT ==========
const ProfileSidebar = ({ profileData, onLogout, onPhotoChange }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      {/* Profile Photo */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700">
            {profileData.initials}
          </div>
          <button 
            onClick={onPhotoChange}
            className="absolute bottom-2 right-2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
          Change Photo
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-600 mb-1">Member Since</p>
          <p className="font-semibold text-gray-900">{profileData.memberSince}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
          <p className="font-semibold text-gray-900">{profileData.totalBookings}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">Reviews Given</p>
          <p className="font-semibold text-gray-900">{profileData.reviewsGiven}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

// ========== PERSONAL INFO CARD COMPONENT ==========
const PersonalInfoCard = ({ profileData, isEditing, onEdit, onSave, onChange }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button 
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
        ) : (
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

// ========== RECENT ACTIVITY CARD COMPONENT ==========
const RecentActivityCard = ({ activities }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start justify-between py-3 border-b border-gray-200 last:border-0">
            <div>
              <p className="font-medium text-gray-900 mb-1">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== FAVORITE PROVIDERS CARD COMPONENT ==========
const FavoriteProvidersCard = ({ providers, onViewProvider }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Favorite Providers</h2>
      
      <div className="space-y-3">
        {providers.map((provider, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                {provider.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{provider.name}</p>
                <p className="text-sm text-gray-600">{provider.service}</p>
              </div>
            </div>
            <button 
              onClick={() => onViewProvider(provider.id)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== MAIN CUSTOMER PROFILE PAGE ==========
const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile data state - Ready for API integration
  const [profileData, setProfileData] = useState({
    initials: 'AA',
    fullName: 'Arwa Aldawoud',
    email: 'Arwa@example.com',
    phone: '+966501234567',
    location: 'Dhahran, SA',
    memberSince: 'September 2024',
    totalBookings: 12,
    reviewsGiven: 8
  });

  // Recent activities - Ready for API integration
  const [activities] = useState([
    {
      title: 'Booked service',
      description: 'Web Development Session',
      time: '2 days ago'
    },
    {
      title: 'Left review',
      description: 'for John Anderson',
      time: '5 days ago'
    },
    {
      title: 'Completed booking',
      description: 'Consulting Session',
      time: '1 week ago'
    }
  ]);

  // Favorite providers - Ready for API integration
  const [favoriteProviders] = useState([
    {
      id: 1,
      initials: 'RE',
      name: 'Renad Elsafi',
      service: 'Web Development'
    },
    {
      id: 2,
      initials: 'SA',
      name: 'Shatha Alharbi',
      service: 'Web Development'
    },
    {
      id: 3,
      initials: 'AE',
      name: 'Adel Elsafi',
      service: 'Web Development'
    }
  ]);

  // Handlers - Ready for API integration
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // TODO: API call to update profile
    /*
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      console.log('Profile updated:', data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
    */
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    // TODO: API call to logout
    console.log('Logging out...');
    alert('Logged out successfully!');
  };

  const handlePhotoChange = () => {
    // TODO: Implement photo upload
    console.log('Opening photo upload...');
  };

  const handleViewProvider = (providerId) => {
    // TODO: Navigate to provider profile
    console.log('Viewing provider:', providerId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Settings Button - Top Right */}
        <div className="flex justify-end mb-6">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Sidebar */}
          <div>
            <ProfileSidebar 
              profileData={profileData}
              onLogout={handleLogout}
              onPhotoChange={handlePhotoChange}
            />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard 
              profileData={profileData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onChange={handleInputChange}
            />

            <RecentActivityCard activities={activities} />

            <FavoriteProvidersCard 
              providers={favoriteProviders}
              onViewProvider={handleViewProvider}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;