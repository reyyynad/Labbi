// src/components/header/Header.jsx
import React from 'react';
import { Search, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUserName, getAuthToken, getUserType } from '../../utils/auth';
import logoPath from '../../assets/images/labbi_logo.svg';

const Header = ({ transparent = false, showAuthButtons = false }) => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const isAuthenticated = !!token;
  const userName = getUserName();
  const userInitials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'SA';
  const userType = getUserType();
  const showServiceProviderCTA = userType !== 'provider';

  const handleLogout = () => {
    logout(navigate);
  };

  const headerClasses = transparent
    ? 'absolute top-0 left-0 right-0 z-50 bg-transparent shadow-none'  // Transparent mode
    : 'bg-[#1e3a8a] text-white shadow-md';                            // Normal mode

  const textClasses = transparent
    ? 'text-white hover:text-gray-200'   // Keep white on gradient
    : 'text-white hover:text-gray-200';

  const buttonClasses = transparent
    ? 'bg-[#047857]/90 backdrop-blur-sm text-white hover:bg-[#047857] border border-white/20'
    : 'bg-[#047857] text-white hover:bg-[#065f46]';

  return (
    <header className={`${headerClasses} py-4 px-6 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
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
          {showServiceProviderCTA && (
            <button
              type="button"
              onClick={() => navigate('/signup-provider')}
              className={`${buttonClasses} px-4 py-2 text-xs md:text-sm rounded-lg font-semibold transition-all shadow-lg`}
            >
              Become Service Provider!
            </button>
          )}
          {isAuthenticated ? (
            <>
              <Link
                to="/customer#services"
                className={`${buttonClasses} px-5 py-2.5 text-sm rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg`}
              >
                <Search size={18} />
                Find Services
              </Link>
              <Link to="/customer/bookings" className={`${textClasses} text-sm font-medium`}>
                My Bookings
              </Link>
              <Link to="/customer/settings" className={`${textClasses} text-sm font-medium`}>
                Settings
              </Link>
              <div className="flex items-center gap-3">
                <div
                  onClick={() => navigate('/customer/profile')}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all border border-white/30"
                  title={userName || 'Profile'}
                >
                  <span className="text-sm font-bold text-white">{userInitials}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`${textClasses} text-sm font-medium inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all`}
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </>
          ) : showAuthButtons ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/login')}
                className={`${textClasses} text-sm font-medium px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition-all`}
              >
                Log in
              </button>
              <button 
                onClick={() => navigate('/auth-registration')}
                className={`${buttonClasses} px-5 py-2.5 text-sm rounded-lg font-medium transition-all shadow-lg`}
              >
                Sign up
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
