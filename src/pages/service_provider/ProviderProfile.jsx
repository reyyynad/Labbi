import React, { useState } from 'react';
import { Camera, CheckCircle, Edit2, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';

const ProviderProfile = ({ onNavigate }) => {
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    title: 'Professional Cleaning Specialist',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    experience: '8 Years Experience',
    bio: 'Professional cleaner with 8 years of experience providing top-quality cleaning services. I specialize in residential and commercial cleaning using eco-friendly products. Committed to delivering exceptional results and ensuring customer satisfaction in every project.',
    memberSince: 'Sep 2024',
    totalServices: 4,
    totalBookings: 127,
    totalReviews: 98,
    rating: 4.89,
    thisMonthEarnings: 3240,
    totalEarnings: 12450
  });

  const [isEditing, setIsEditing] = useState(false);

  const recentBookings = [
    { 
      id: 1,
      service: 'Professional House Cleaning', 
      customer: 'John Doe',
      date: 'Nov 15, 2024',
      price: 120 
    },
    { 
      id: 2,
      service: 'Deep Cleaning Service', 
      customer: 'Alice Smith',
      date: 'Nov 12, 2024',
      price: 240 
    },
    { 
      id: 3,
      service: 'Move-In/Out Cleaning', 
      customer: 'Mike Johnson',
      date: 'Nov 8, 2024',
      price: 150 
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

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

        {/* Profile Header Card */}
        <div className="rounded-lg border border-gray-200 p-6 mb-6" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: '#065f46' }}>
                  SJ
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.fullName}</h2>
                <p className="text-gray-600 mb-4">{profileData.title}</p>
                
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
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#065f46' }}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
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
                  <p className="text-3xl font-bold text-gray-900">${profileData.thisMonthEarnings}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${profileData.totalEarnings}</p>
                </div>

                <button 
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">About Me</h3>
                {isEditing && (
                  <button 
                    onClick={handleSave}
                    className="px-5 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#065f46' }}
                  >
                    Save Changes
                  </button>
                )}
              </div>
              
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
                    <p className="text-sm font-bold text-gray-900">${booking.price}</p>
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

export default ProviderProfile;