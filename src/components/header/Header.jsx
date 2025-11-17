// src/components/header/Header.jsx
import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logoPath = '/assets/images/labbi_logo.svg';

  return (
    <header className="bg-[#1e3a8a] text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden">
              <img
                src={logoPath}
                alt="Labbi Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.parentElement.innerHTML = '<span class="text-[#1e3a8a] font-bold text-lg">L</span>';
                }}
              />
            </div>
            <h1 className="text-xl font-bold">Labbi - لبِّ</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[#047857] text-white hover:bg-[#065f46] px-5 py-2.5 text-sm rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            onClick={() => navigate('/')}
          >
            <Search size={16} />
            Find Services
          </button>
          <Link to="/bookings" className="text-sm hover:text-gray-200">
            My Bookings
          </Link>
          <Link to="/settings" className="text-sm hover:text-gray-200">
            Settings
          </Link>
          <div
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <span className="text-sm font-semibold text-[#374151]">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;