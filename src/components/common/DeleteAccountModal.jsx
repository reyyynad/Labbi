import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, userType = 'user', isDeleting = false }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const getWarningMessage = () => {
    if (userType === 'provider') {
      return {
        title: 'Delete Provider Account',
        warning1: 'This action will permanently delete your provider account and cannot be undone.',
        warning2: 'All of the following will be permanently deleted:',
        items: [
          'All your services and listings',
          'All your availability schedules',
          'All bookings associated with your services',
          'All reviews received',
          'Your provider profile and earnings history'
        ],
        finalWarning: 'Are you absolutely sure you want to proceed? This action cannot be undone.'
      };
    } else {
      return {
        title: 'Delete Account',
        warning1: 'This action will permanently delete your account and cannot be undone.',
        warning2: 'All of the following will be permanently deleted:',
        items: [
          'All your bookings',
          'All your reviews',
          'Your profile and personal information',
          'Your account history'
        ],
        finalWarning: 'Are you absolutely sure you want to proceed? This action cannot be undone.'
      };
    }
  };

  const messages = getWarningMessage();

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{messages.title}</h2>
          </div>
          {!isDeleting && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-4">{messages.warning1}</p>
            <p className="text-sm font-semibold text-gray-900 mb-3">{messages.warning2}</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 mb-4">
              {messages.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ {messages.finalWarning}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              disabled={isDeleting}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Account Permanently'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

