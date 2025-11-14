// src/components/widgets/FilterPanel.jsx
import React, { useState } from 'react';
import { Filter, Star } from 'lucide-react';

const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleReset = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedRatings([]);
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} />
        <h3 className="font-semibold">Filters</h3>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>All categories</option>
          <option>Design</option>
          <option>Web Development</option>
          <option>Plumbing</option>
          <option>Marketing</option>
          <option>Tutoring</option>
          <option>Cleaning</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rating</label>
        {[5, 4, 3].map((rating) => (
          <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingChange(rating)}
            />
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600">& up</span>
          </label>
        ))}
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Location</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>Select country</option>
          <option>Saudi Arabia</option>
          <option>Kuwait</option>
          <option>Bahrain</option>
          <option>Qatar</option>
          <option>Oman</option>
        </select>
      </div>

      <button 
        onClick={handleReset}
        className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        Reset Filters
      </button>

      {/* Enterprise Section */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-semibold text-sm mb-2">Enterprise</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Team Purchasing</li>
          <li>• Scalable Solutions</li>
        </ul>
      </div>
    </div>
  );
};

export default FilterPanel;