// src/components/layout/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">LOGIN - لـــجِـن</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Get Services
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            My Bookings
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors cursor-pointer"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;