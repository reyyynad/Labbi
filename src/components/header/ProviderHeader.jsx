// src/components/header/ProviderHeader.jsx
import React from 'react';
import { Briefcase, Calendar, User, Star, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUserName } from '../../utils/auth';
import logoPath from '../../assets/images/labbi_logo.svg';

const ProviderHeader = () => {
  const navigate = useNavigate();
  const userName = getUserName();
  const userInitials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'SP';

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="bg-[#1e3a8a] text-white shadow-md py-4 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/provider')}
            className="flex items-center gap-2"
          >
            <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
              <img
                src={logoPath}
                alt="Labbi Logo"
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.parentElement.innerHTML = '<span class="text-white font-bold text-4xl">لبِّ</span>';
                }}
              />
            </div>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/provider"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/provider/services"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <Briefcase size={16} />
            My Services
          </Link>
          <Link
            to="/provider/bookings"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <Calendar size={16} />
            Bookings
          </Link>
          <Link
            to="/provider/availability"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors"
          >
            Availability
          </Link>
          <Link
            to="/provider/reviews"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <Star size={16} />
            Reviews
          </Link>
          <Link
            to="/provider/profile"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <User size={16} />
            Profile
          </Link>
          <Link
            to="/provider/settings"
            className="text-white hover:text-gray-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <Settings size={16} />
            Settings
          </Link>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/20">
            <div
              onClick={() => navigate('/provider/profile')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all border border-white/30"
              title={userName || 'Profile'}
            >
              <span className="text-sm font-bold text-white">{userInitials}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 text-sm font-medium inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProviderHeader;

