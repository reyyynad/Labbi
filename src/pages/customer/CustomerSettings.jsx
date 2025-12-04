import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Shield, Trash2, User, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import DeleteAccountModal from '../../components/common/DeleteAccountModal';
import { userAPI, authAPI } from '../../services/api';
import { clearAuthData } from '../../utils/auth';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none inline-flex items-center justify-center w-full';
  
  const variants = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46]',
    secondary: 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]',
    outline: 'border-2 border-[#047857] bg-white text-[#047857] hover:bg-[#f0fdf4]',
    danger: 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
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

// ========== NOTIFICATION TOGGLE ==========
const NotificationToggle = ({ title, description, enabled, onToggle, disabled }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200">
      <div>
        <h3 className="font-semibold mb-1 text-[#374151]">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${disabled ? 'opacity-50' : ''}`}
        style={{ backgroundColor: enabled ? '#047857' : '#d1d5db' }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// ========== NOTIFICATIONS SECTION ==========
const NotificationsSection = ({ notifications, onToggle, saving }) => {
  return (
    <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6 mb-4">
      <h2 className="text-lg font-semibold text-[#047857] mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-[#047857]">
          <Bell className="w-5 h-5 text-white" />
        </div>
        Notifications
        {saving && <Loader2 className="w-4 h-4 animate-spin text-[#047857]" />}
      </h2>
      <div className="space-y-3">
        <NotificationToggle 
          title="Email Notifications"
          description="Receive booking confirmations and updates via email"
          enabled={notifications.email}
          onToggle={() => onToggle('email')}
          disabled={saving}
        />
        <NotificationToggle 
          title="SMS Notifications"
          description="Get text messages for important booking updates"
          enabled={notifications.sms}
          onToggle={() => onToggle('sms')}
          disabled={saving}
        />
        <NotificationToggle 
          title="Marketing Emails"
          description="Receive newsletters and promotional offers"
          enabled={notifications.marketing}
          onToggle={() => onToggle('marketing')}
          disabled={saving}
        />
      </div>
    </div>
  );
};

// ========== SECURITY SECTION ==========
const SecuritySection = ({ passwords, onChange, onUpdate, updating, error, success }) => {
  return (
    <div className="bg-[#f0fdf4] border border-[#047857] rounded-lg p-6 mb-4">
      <h2 className="text-lg font-semibold text-[#047857] mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-[#047857]">
          <Shield className="w-5 h-5 text-white" />
        </div>
        Security
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#374151]">
            Current Password
          </label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-[#374151]">
            New Password
          </label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-[#374151]">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white border border-gray-300"
          />
        </div>

        <Button onClick={onUpdate} variant="primary" size="large" disabled={updating}>
          {updating ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </div>
  );
};

// ========== DANGER ZONE SECTION ==========
const DangerZoneSection = ({ onDelete, deleting }) => {
  return (
    <div className="bg-white border-2 border-red-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-red-600">
          <Trash2 className="w-5 h-5 text-white" />
        </div>
        Danger Zone
      </h2>
      <p className="text-sm text-gray-700 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button onClick={onDelete} variant="danger" size="large" disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete Account'}
      </Button>
    </div>
  );
};

// ========== QUICK ACTIONS SIDEBAR ==========
const QuickActionsSidebar = ({ onNavigate, memberSince }) => {
  return (
    <div className="sticky top-6">
      <div className="bg-white border-2 border-[#047857] rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-[#374151] mb-4">Quick Actions</h3>
        
        <div className="space-y-3 mb-6">
          <button 
            onClick={() => onNavigate('/customer/profile')}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-[#f0fdf4] transition-colors text-left"
          >
            <User className="w-5 h-5 text-[#047857]" />
            <span className="text-sm font-medium text-[#374151]">View Profile</span>
          </button>
          <button 
            onClick={() => onNavigate('/customer/bookings')}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-[#f0fdf4] transition-colors text-left"
          >
            <CheckCircle className="w-5 h-5 text-[#047857]" />
            <span className="text-sm font-medium text-[#374151]">My Bookings</span>
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-[#374151] mb-2">ACCOUNT STATUS</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Active</span>
          </div>
          <p className="text-xs text-gray-600">Member since {memberSince || 'Recently'}</p>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN SETTINGS PAGE ==========
const CustomerSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [memberSince, setMemberSince] = useState('');
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [deletingAccount, setDeletingAccount] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setNotifications(response.data.notifications || {
          email: true,
          sms: true,
          marketing: false
        });
        setMemberSince(response.data.memberSince);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = async (type) => {
    const newNotifications = {
      ...notifications,
      [type]: !notifications[type]
    };
    
    setNotifications(newNotifications);
    setSavingNotifications(true);
    
    try {
      await userAPI.updateNotifications(newNotifications);
    } catch (error) {
      // Revert on error
      setNotifications(notifications);
      console.error('Failed to update notifications:', error);
    } finally {
      setSavingNotifications(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleUpdatePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError('Please fill in all password fields');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New passwords do not match!');
      return;
    }
    
    if (passwords.new.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    
    setUpdatingPassword(true);
    setPasswordError('');
    setPasswordSuccess('');
    
    try {
      const response = await authAPI.updatePassword(passwords.current, passwords.new);
      if (response.success) {
        setPasswordSuccess('Password updated successfully!');
        setPasswords({ current: '', new: '', confirm: '' });
        
        // Update token if returned
        if (response.data?.token) {
          const storage = localStorage.getItem('authToken') ? localStorage : sessionStorage;
          storage.setItem('authToken', response.data.token);
        }
      }
    } catch (error) {
      setPasswordError(error.message || 'Failed to update password');
    } finally {
      setUpdatingPassword(false);
    }
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

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/customer/profile')}
          className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#047857] mb-6 font-medium"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </button>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#374151] mb-1">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Settings Sections */}
          <div className="lg:col-span-2">
            <NotificationsSection 
              notifications={notifications}
              onToggle={handleNotificationToggle}
              saving={savingNotifications}
            />
            <SecuritySection 
              passwords={passwords}
              onChange={handlePasswordChange}
              onUpdate={handleUpdatePassword}
              updating={updatingPassword}
              error={passwordError}
              success={passwordSuccess}
            />
            <DangerZoneSection 
              onDelete={handleDeleteAccount}
              deleting={deletingAccount}
            />
          </div>

          {/* Right Column - Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <QuickActionsSidebar 
              onNavigate={navigate}
              memberSince={memberSince}
            />
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        userType="customer"
        isDeleting={deletingAccount}
      />
    </div>
  );
};

export default CustomerSettings;
