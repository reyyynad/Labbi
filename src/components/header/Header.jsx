// src/components/header/Header.jsx
import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logoPath from '../../assets/images/labbi_logo.svg';

const Header = ({ transparent = false }) => {
  const navigate = useNavigate();

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
          <Link
            to="/#services"
            className={`${buttonClasses} px-5 py-2.5 text-sm rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg`}
          >
            <Search size={18} />
            Find Services
          </Link>
          <Link to="/bookings" className={`${textClasses} text-sm font-medium`}>
            My Bookings
          </Link>
          <Link to="/settings" className={`${textClasses} text-sm font-medium`}>
            Settings
          </Link>
          <div
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all border border-white/30"
          >
            <span className="text-sm font-bold text-white">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;