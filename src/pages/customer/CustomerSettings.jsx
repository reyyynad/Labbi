import React, { useState } from 'react';
import { ArrowLeft, Bell, MessageSquare, Mail, Shield, Trash2 } from 'lucide-react';

const CustomerSettings = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password update requested');
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
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
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4 cursor-pointer"
                   onClick={() => onNavigate('profile')}>
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Profile
          </button>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Account Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive booking updates via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Get text reminders for bookings</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('sms')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.sms ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive promotional offers</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('marketing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.marketing ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg border-2 border-red-200 p-6">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h2>

            <p className="text-gray-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerSettings;