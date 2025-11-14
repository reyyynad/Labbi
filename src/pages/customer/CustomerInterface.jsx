import React, { useState } from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    white: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-300'
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
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

// ========== HEADER COMPONENT ==========
const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">SERVICE KHALIL FREELANCE</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="medium">
            Auto-Registration
          </Button>
          <Button variant="white" size="medium">
            Customer's Card
          </Button>
          <Button variant="secondary" size="medium">
            Provider User Role
          </Button>
          <Button variant="secondary" size="medium">
            Admin Panel
          </Button>
        </div>
      </div>
    </header>
  );
};

// ========== NAVBAR COMPONENT ==========
const Navbar = () => {
  return (
    <nav className="bg-white border-b py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Labbi - لبِّ</span>
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

// ========== SEARCHBAR COMPONENT ==========
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
          <Button size="large" className="flex items-center gap-2">
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

// ========== FILTER PANEL WIDGET ==========
const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

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

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>All categories</option>
          <option>Design</option>
          <option>Web Development</option>
          <option>Plumbing</option>
          <option>Marketing</option>
        </select>
      </div>

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

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rating</label>
        {[5, 4, 3].map((rating) => (
          <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600">& up</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Location</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>Select City</option>
          <option>Riyadh</option>
          <option>Dhahran</option>
        </select>
      </div>

      <button className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
        Reset Filters
      </button>

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

// ========== SERVICE CARD WIDGET ==========
const ServiceCard = ({ service }) => {
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center relative">
        <div className="text-gray-400">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>
        <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
          {service.badge}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={service.rating} />
          <span className="text-sm text-gray-600">{service.rating} ({service.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <MapPin size={14} />
          <span>{service.provider}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="font-semibold text-lg">{service.price}</span>
          <Button size="small">View Details</Button>
        </div>
      </div>
    </div>
  );
};

// ========== PAGINATION COMPONENT ==========
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Previous
      </button>

      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded transition-colors ${
            currentPage === page
              ? 'bg-gray-900 text-white'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Next
      </button>
    </div>
  );
};

// ========== MAIN APPLICATION ==========
const CustomerInterface = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const services = [
    {
      id: 1,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.8,
      reviews: 123,
      price: 'SR 5M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    },
    {
      id: 2,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.8,
      reviews: 123,
      price: 'SR 5M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    },
    {
      id: 3,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.8,
      reviews: 123,
      price: 'SR 5M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    },
    {
      id: 4,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.7,
      reviews: 98,
      price: 'SR 4M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    },
    {
      id: 5,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.9,
      reviews: 156,
      price: 'SR 6M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    },
    {
      id: 6,
      title: 'Professional Web Development',
      description: 'Full-stack web development services...',
      rating: 4.6,
      reviews: 87,
      price: 'SR 5M/Hr',
      provider: 'Dhahran',
      badge: 'Online'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchBar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <FilterPanel />
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Available Services</h2>
                <p className="text-sm text-gray-600">Showing 157 results</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <Pagination 
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerInterface;