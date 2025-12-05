import React, { useState, useEffect, useRef } from 'react';
import { Settings, CheckCircle, Edit2, Loader2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { userAPI } from '../../services/api';
import { logout } from '../../utils/auth';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [profileData, setProfileData] = useState({
    initials: '',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    memberSince: '',
    isEmailVerified: false,
    isPhoneVerified: false,
    profileImage: ''
  });
  
  const fileInputRef = useRef(null);

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.getProfile();
      
      if (response.success) {
        const { profile, stats: userStats, recentBookings: bookings } = response.data;
        
        setProfileData({
          initials: profile.initials,
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone || '',
          location: profile.location || '',
          memberSince: profile.memberSince,
          isEmailVerified: profile.isEmailVerified,
          isPhoneVerified: profile.isPhoneVerified,
          profileImage: profile.profileImage || ''
        });
        
        setStats(userStats);
        setRecentBookings(bookings);
      }
    } catch (error) {
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      
      try {
        setSaving(true);
        setError('');
        
        const response = await userAPI.updateProfile({
          profileImage: base64Image
        });
        
        if (response.success) {
          setProfileData(prev => ({
            ...prev,
            profileImage: base64Image
          }));
          setSuccessMessage('Profile picture updated!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      } catch (err) {
        setError(err.message || 'Failed to update profile picture');
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');
      
      const response = await userAPI.updateProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        profileImage: profileData.profileImage
      });
      
      if (response.success) {
        setProfileData(prev => ({
          ...prev,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          location: response.data.location,
          initials: response.data.initials,
          profileImage: response.data.profileImage || prev.profileImage
        }));
        
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-[#047857]" />
        </div>
      </div>
    );
  }

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
            onClick={() => navigate('/customer/settings')}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4 text-[#374151]" />
            <span className="text-[#374151]">Settings</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt={profileData.fullName}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#047857] rounded-full flex items-center justify-center text-4xl font-bold text-white">
                    {profileData.initials}
                  </div>
                )}
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={saving}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-[#047857] hover:bg-[#065f46] rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                    >
                      <Camera size={18} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </>
                )}
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
            </div>

            <Button variant="outline" className="w-full" onClick={handleLogout}>
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
                  <Button variant="primary" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
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
                    placeholder={isEditing ? 'Enter phone number' : 'Not provided'}
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
                    placeholder={isEditing ? 'Enter location' : 'Not provided'}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f0fdf4] border-2 border-[#047857] rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-[#374151]">{stats.totalBookings}</p>
              </div>
              
              <div className="bg-[#f0fdf4] border-2 border-[#047857] rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-[#374151]">SR{stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#374151] mb-6">Verification Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${profileData.isEmailVerified ? 'text-[#047857]' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-semibold text-[#374151]">Email Verified</p>
                      <p className="text-sm text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 ${profileData.isEmailVerified ? 'bg-[#047857]' : 'bg-gray-400'} text-white rounded-full text-xs font-semibold`}>
                    {profileData.isEmailVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#047857] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${profileData.isPhoneVerified ? 'text-[#047857]' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-semibold text-[#374151]">Phone Verified</p>
                      <p className="text-sm text-gray-600">{profileData.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 ${profileData.isPhoneVerified ? 'bg-[#047857]' : 'bg-gray-400'} text-white rounded-full text-xs font-semibold`}>
                    {profileData.isPhoneVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white border-2 border-[#047857] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#374151]">Recent Bookings</h3>
                <button 
                  onClick={() => navigate('/customer/bookings')}
                  className="text-sm text-[#047857] hover:text-[#065f46] font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking, index) => (
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No bookings yet</p>
                    <Button 
                      variant="primary" 
                      className="mt-4"
                      onClick={() => navigate('/')}
                    >
                      Browse Services
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;
