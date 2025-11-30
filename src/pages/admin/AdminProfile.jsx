import React, { useState, useEffect } from 'react';
import { CheckCircle, Edit2, Shield, Users, ClipboardList, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import { getUserName, getUserEmail } from '../../utils/auth';
import { userAPI, adminAPI } from '../../services/api';

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
    primary: 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]',
    secondary: 'bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] hover:bg-blue-50',
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

// ========== MAIN ADMIN PROFILE PAGE ==========
const AdminProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get real user data from auth storage
  const savedUserName = getUserName() || 'Admin';
  const savedUserEmail = getUserEmail() || '';
  
  // Generate initials from saved name
  const getInitials = (name) => {
    if (!name) return 'AD';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const [profileData, setProfileData] = useState({
    initials: getInitials(savedUserName),
    fullName: savedUserName,
    email: savedUserEmail,
    phone: '',
    location: '',
    memberSince: ''
  });

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeServices: 0,
    totalBookings: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data and stats from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile (includes stats for admin)
        const profileResponse = await userAPI.getProfile();
        if (profileResponse.success && profileResponse.data.profile) {
          const profile = profileResponse.data.profile;
          setProfileData(prev => ({
            ...prev,
            fullName: profile.fullName || prev.fullName,
            email: profile.email || prev.email,
            phone: profile.phone || '',
            location: profile.location || '',
            memberSince: profile.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            initials: profile.initials || getInitials(profile.fullName || prev.fullName)
          }));

          // Set stats from profile response (for admin users)
          if (profileResponse.data.stats) {
            setStats({
              totalUsers: profileResponse.data.stats.totalUsers || 0,
              activeServices: profileResponse.data.stats.activeServices || 0,
              totalBookings: profileResponse.data.stats.totalBookings || 0,
              revenue: profileResponse.data.stats.revenue || 0
            });
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location
      };
      
      const response = await userAPI.updateProfile(updateData);
      if (response.success) {
        alert('Profile updated successfully!');
        setIsEditing(false);
        // Refresh profile data
        const profileResponse = await userAPI.getProfile();
        if (profileResponse.success && profileResponse.data.profile) {
          const profile = profileResponse.data.profile;
          setProfileData(prev => ({
            ...prev,
            fullName: profile.fullName || prev.fullName,
            phone: profile.phone || prev.phone,
            location: profile.location || prev.location,
            initials: profile.initials || getInitials(profile.fullName || prev.fullName)
          }));
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#374151] mb-1">Admin Profile</h1>
          <p className="text-gray-600">Manage your personal information and admin settings</p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-[#6b7280]">Loading profile data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="bg-white border-2 border-[#1e3a8a] rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-[#1e3a8a] rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {profileData.initials}
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#374151] mb-2">{profileData.fullName}</h2>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-[#1e3a8a]" />
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="font-semibold text-[#374151]">{profileData.memberSince}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users Managed</p>
                <p className="font-semibold text-[#374151]">{stats.totalUsers.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Services</p>
                <p className="font-semibold text-[#374151]">{stats.activeServices.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="font-semibold text-[#374151]">{stats.totalBookings.toLocaleString()}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate('/admin-panel')}>
              Back to Dashboard
            </Button>
          </div>

          {/* Right Column - Profile Information & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border-2 border-[#1e3a8a] rounded-lg p-6">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-[#1e3a8a]" />
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <p className="text-3xl font-bold text-[#374151]">{stats.totalUsers.toLocaleString()}</p>
              </div>
              
              <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ClipboardList className="w-6 h-6 text-[#1e3a8a]" />
                  <p className="text-sm text-gray-600">Active Services</p>
                </div>
                <p className="text-3xl font-bold text-[#374151]">{stats.activeServices.toLocaleString()}</p>
              </div>
              
              <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-[#1e3a8a]" />
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <p className="text-3xl font-bold text-[#374151]">{stats.totalBookings.toLocaleString()}</p>
              </div>
              
              <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-[#1e3a8a]" />
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
                <p className="text-3xl font-bold text-[#374151]">SR{stats.revenue.toLocaleString()}</p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white border-2 border-[#1e3a8a] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#374151] mb-6">Account Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-[#1e3a8a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1e3a8a]" />
                    <div>
                      <p className="font-semibold text-[#374151]">Email Verified</p>
                      <p className="text-sm text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#1e3a8a] text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-[#1e3a8a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#1e3a8a]" />
                    <div>
                      <p className="font-semibold text-[#374151]">Admin Access</p>
                      <p className="text-sm text-gray-600">Full system access granted</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#1e3a8a] text-white rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default AdminProfile;
