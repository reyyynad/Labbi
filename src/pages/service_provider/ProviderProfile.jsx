import React, { useState, useEffect } from 'react';
import { CheckCircle, Edit2, Phone, Mail, MapPin, Briefcase, X, TrendingUp, Calendar, DollarSign, Download, Loader2, Camera } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';
import { providerAPI } from '../../services/api';

// ========== EARNINGS DETAILS MODAL COMPONENT ==========
const EarningsDetailsModal = ({ isOpen, onClose, earningsData, profileEarnings, loading }) => {
  if (!isOpen) return null;

  // Use earningsData if available, otherwise fallback to profileEarnings
  const transactions = earningsData?.transactions || [];
  const monthlyBreakdown = earningsData?.monthlyBreakdown || [];
  const totalEarnings = earningsData?.totalEarnings ?? profileEarnings?.totalEarnings ?? 0;
  const thisMonthEarnings = earningsData?.thisMonthEarnings ?? profileEarnings?.thisMonthEarnings ?? 0;
  const totalTransactions = earningsData?.totalTransactions || transactions.length;

  // Export function to download transactions as CSV
  const handleExport = () => {
    // Create CSV headers
    const headers = ['Date', 'Service', 'Customer', 'Booking ID', 'Amount (SR)', 'Status'];
    
    // Convert transactions data to CSV rows
    const csvRows = [
      headers.join(','),
      ...transactions.map(transaction => [
        `"${transaction.date}"`,
        `"${transaction.service}"`,
        `"${transaction.customer}"`,
        `"${transaction.bookingId}"`,
        `"${transaction.amount}"`,
        `"${transaction.status}"`
      ].join(','))
    ];
    
    // Create CSV content
    const csvContent = csvRows.join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `earnings_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Earnings data exported successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Earnings Details</h2>
            <p className="text-sm text-gray-600 mt-1">View your complete earnings history and breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Loading earnings data...</span>
            </div>
          ) : (
          <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">SR{totalEarnings.toLocaleString()}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">This Month</p>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">SR{thisMonthEarnings.toLocaleString()}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalTransactions}</p>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
            {monthlyBreakdown.length > 0 ? (
              <div className="space-y-4">
                {monthlyBreakdown.map((month, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{month.month}</span>
                      <span className="font-bold text-gray-900">SR{month.earnings.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{month.bookings} bookings</span>
                      <span>Avg: SR{month.bookings > 0 ? Math.round(month.earnings / month.bookings) : 0} per booking</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-600"
                        style={{ width: `${monthlyBreakdown.length > 0 ? (month.earnings / Math.max(...monthlyBreakdown.map(m => m.earnings), 1)) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No earnings data available yet</p>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              {transactions.length > 0 && (
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download size={16} />
                  Export
                </button>
              )}
            </div>
            
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {transaction.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {transaction.bookingId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          SR{transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-1">Completed bookings will appear here</p>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">SR{totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">SR{thisMonthEarnings.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Earnings are calculated from completed bookings. Complete more bookings to increase your earnings.
              </p>
            </div>
          </div>
          </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProviderProfile = ({ onNavigate }) => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    bio: '',
    memberSince: '',
    totalServices: 0,
    totalBookings: 0,
    totalReviews: 0,
    rating: 0,
    thisMonthEarnings: 0,
    totalEarnings: 0,
    isEmailVerified: false,
    isPhoneVerified: false,
    isIdentityVerified: false,
    isBackgroundChecked: false,
    profileImage: '',
    initials: ''
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [isEarningsModalOpen, setIsEarningsModalOpen] = useState(false);
  const [earningsData, setEarningsData] = useState(null);
  const [earningsLoading, setEarningsLoading] = useState(false);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await providerAPI.getProfile();
      
      if (response.success) {
        const { profile, stats, recentBookings: bookings } = response.data;
        
        setProfileData({
          fullName: profile.fullName || '',
          title: profile.providerProfile?.title || 'Service Provider',
          email: profile.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          experience: profile.providerProfile?.experience || '',
          bio: profile.providerProfile?.bio || '',
          memberSince: profile.memberSince || '',
          totalServices: stats?.totalServices || 0,
          totalBookings: stats?.totalBookings || 0,
          totalReviews: stats?.totalReviews || 0,
          rating: stats?.rating || 0,
          thisMonthEarnings: stats?.thisMonthEarnings || 0,
          totalEarnings: stats?.totalEarnings || 0,
          isEmailVerified: profile.isEmailVerified || false,
          isPhoneVerified: profile.isPhoneVerified || false,
          isIdentityVerified: profile.providerProfile?.isIdentityVerified || false,
          isBackgroundChecked: profile.providerProfile?.isBackgroundChecked || false,
          profileImage: profile.profileImage || '',
          initials: profile.initials || ''
        });
        setProfileImagePreview(profile.profileImage || '');
        
        if (bookings) {
          setRecentBookings(bookings.map(b => ({
            id: b.id,
            service: b.service,
            customer: b.customer,
            date: b.date,
            price: b.price
          })));
        }
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      setProfileImagePreview(previewURL);
      setProfileImageFile(file);
      setError('');
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleEditProfile = () => {
    setOriginalData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let profileImageBase64 = profileData.profileImage;
      
      // Convert new image to base64 if uploaded
      if (profileImageFile) {
        profileImageBase64 = await convertImageToBase64(profileImageFile);
      }
      
      const response = await providerAPI.updateProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        title: profileData.title,
        experience: profileData.experience,
        profileImage: profileImageBase64
      });
      
      if (response.success) {
        setProfileImageFile(null);
        alert('Profile updated successfully!');
        setIsEditing(false);
        setOriginalData(null);
        fetchProfile(); // Refresh profile data (this will reload the image)
      }
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setProfileData(originalData);
      // Restore the original profile image preview
      setProfileImagePreview(originalData.profileImage || '');
    }
    setProfileImageFile(null);
    setIsEditing(false);
    setOriginalData(null);
  };

  const handleViewEarningsDetails = async () => {
    setIsEarningsModalOpen(true);
    setEarningsLoading(true);
    
    try {
      const response = await providerAPI.getEarnings();
      if (response.success) {
        setEarningsData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch earnings:', err);
    } finally {
      setEarningsLoading(false);
    }
  };

  const initials = profileData.fullName
    .split(' ')
    .filter(Boolean)
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Provider Profile</h1>
          <p className="text-gray-600 text-sm">Manage your professional information and settings</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading profile...</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
            <button onClick={fetchProfile} className="mt-2 text-sm text-red-700 underline">Try again</button>
          </div>
        )}

        {!loading && !error && (
        <>
        {/* Profile Header Card */}
        <div className="rounded-lg border border-gray-200 p-6 mb-6" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                {profileImagePreview ? (
                  <img 
                    src={profileImagePreview} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#065f46]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: '#065f46' }}>
                    {initials}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-[#065f46] rounded-full flex items-center justify-center hover:bg-[#f0fdf4] cursor-pointer">
                  <Camera className="w-4 h-4 text-[#065f46]" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={profileData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.fullName}</h2>
                    <p className="text-gray-600 mb-4">{profileData.title}</p>
                  </>
                )}
                
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{profileData.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit/Cancel/Save Buttons */}
            {!isEditing ? (
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#065f46' }}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors bg-white"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#065f46' }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats Cards */}
          <div className="space-y-6">
            {/* Performance Card */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Rating</span>
                    <span className="text-sm font-bold text-gray-900">{profileData.rating}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${(profileData.rating / 5) * 100}%`, backgroundColor: '#065f46' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="text-sm font-bold text-gray-900">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: '98%', backgroundColor: '#065f46' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-sm font-bold text-gray-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: '95%', backgroundColor: '#065f46' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Card */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Earnings</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">SR{profileData.thisMonthEarnings}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">SR{profileData.totalEarnings}</p>
                </div>

                <button 
                  onClick={handleViewEarningsDetails}
                  className="w-full py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#065f46' }}
                >
                  View Earnings Details
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Services</span>
                  <span className="text-sm font-bold text-gray-900">{profileData.totalServices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="text-sm font-bold text-gray-900">{profileData.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="text-sm font-bold text-gray-900">{profileData.totalReviews}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-bold text-gray-900">{profileData.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me Section */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">About Me</h3>
              
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Verification & Credentials */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Verification & Credentials</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email Verified</p>
                    <p className="text-xs text-gray-600 mt-1">Verified on Sep 20, 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Phone Verified</p>
                    <p className="text-xs text-gray-600 mt-1">Verified on Sep 20, 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Identity Verified</p>
                    <p className="text-xs text-gray-600 mt-1">Verified on Sep 22, 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Background Check</p>
                    <p className="text-xs text-gray-600 mt-1">Completed Sep 25, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
                <button 
                  onClick={() => onNavigate('bookings')}
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#065f46' }}
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{booking.service}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {booking.customer} • {booking.date}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">SR{booking.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Earnings Details Modal */}
      <EarningsDetailsModal
        isOpen={isEarningsModalOpen}
        onClose={() => setIsEarningsModalOpen(false)}
        earningsData={earningsData}
        profileEarnings={{
          totalEarnings: profileData.totalEarnings,
          thisMonthEarnings: profileData.thisMonthEarnings
        }}
        loading={earningsLoading}
      />
    </div>
  );
};

export default ProviderProfile;