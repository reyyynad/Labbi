// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const categories = [
    'All categories',
    'Design',
    'Web Development',
    'Plumbing',
    'Marketing',
    'Tutoring',
    'Cleaning'
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add search logic here
  };

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Find the perfect service for your needs
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Thousands of freelance service providers connect with clients globally
        </p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <Button onClick={handleSearch} size="large" className="flex items-center gap-2">
            <Search size={20} />
            Search
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;