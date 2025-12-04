import React, { useState } from 'react';
import { Bell, Shield, Trash2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProviderHeader from '../../components/header/ProviderHeader';
import DeleteAccountModal from '../../components/common/DeleteAccountModal';
import { userAPI } from '../../services/api';
import { clearAuthData } from '../../utils/auth';

const Settings = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: true,
    reviews: true
  });

  const [availability, setAvailability] = useState({
    acceptNew: true,
    autoAccept: false
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAvailabilityToggle = (type) => {
    setAvailability(prev => ({
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
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwords.new.length < 8) {
      alert('New password must be at least 8 characters long');
      return;
    }
    console.log('Password update requested');
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDeletingAccount(true);
    
    try {
      await userAPI.deleteAccount();
      clearAuthData();
      // Redirect to Labbi home page with full reload to clear all state
      window.location.href = '/';
    } catch (error) {
      alert(error.message || 'Failed to delete account');
      setDeletingAccount(false);
      setShowDeleteModal(false);
    }
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? '' : 'bg-gray-300'
      }`}
      style={enabled ? { backgroundColor: '#065f46' } : {}}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Provider Settings</h1>
          <p className="text-gray-600 text-sm">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive booking requests and updates via email</p>
                </div>
                <ToggleSwitch 
                  enabled={notifications.email}
                  onToggle={() => handleNotificationToggle('email')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Get text messages for urgent booking requests</p>
                </div>
                <ToggleSwitch 
                  enabled={notifications.sms}
                  onToggle={() => handleNotificationToggle('sms')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive tips and updates to grow your business</p>
                </div>
                <ToggleSwitch 
                  enabled={notifications.marketing}
                  onToggle={() => handleNotificationToggle('marketing')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Review Notifications</h3>
                  <p className="text-sm text-gray-600">Get notified when customers leave reviews</p>
                </div>
                <ToggleSwitch 
                  enabled={notifications.reviews}
                  onToggle={() => handleNotificationToggle('reviews')}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="w-full py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#065f46' }}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Availability Settings */}
          <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#065f46' }}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Availability Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Accept New Bookings</h3>
                  <p className="text-sm text-gray-600">Allow customers to book your services</p>
                </div>
                <ToggleSwitch 
                  enabled={availability.acceptNew}
                  onToggle={() => handleAvailabilityToggle('acceptNew')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Auto-Accept Bookings</h3>
                  <p className="text-sm text-gray-600">Automatically accept booking requests</p>
                </div>
                <ToggleSwitch 
                  enabled={availability.autoAccept}
                  onToggle={() => handleAvailabilityToggle('autoAccept')}
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border-2 p-6" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
            </div>

            <p className="text-gray-700 mb-4">
              Once you delete your account, there is no going back. All your services, bookings, and earnings history will be permanently removed.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete Provider Account
            </button>
          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        userType="provider"
        isDeleting={deletingAccount}
      />
    </div>
  );
};

export default Settings;