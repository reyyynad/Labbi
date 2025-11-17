import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, Star, MapPin, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';

// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46]',
    secondary: 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]',
    outline: 'border-2 border-[#047857] bg-white text-[#047857] hover:bg-[#f0fdf4]',
    white: 'bg-white text-[#374151] hover:bg-gray-50 border border-gray-200'
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

// ========== HERO SECTION COMPONENT (FIXED) ==========
const HeroSection = ({ onBrowseServices }) => {
  return (
    <section className="bg-[#1e3a8a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Overview and Button */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Labbi</h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-100">
              Labbi is a digital marketplace built to create a win-win environment for both service providers and clients. It allows individuals to share their skills, earn money, and build credibility, while giving clients a simple way to find reliable services that match their needs. Providers can create detailed profiles to showcase their expertise, whether in tutoring, translation, design, cooking, delivery, or home maintenance, making their skills visible to a wide audience.
            </p>
            
            <button
              type="button"
              onClick={onBrowseServices}

              className="bg-[#047857] text-white hover:bg-[#065f46] px-6 py-3 text-base rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Browse Services
            </button>
          </div>

          {/* Right Side - Logo and Slogan */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full h-[500px] flex items-center justify-center">
              <img
                src="/src/assets/images/labbi_logo.svg"
                alt="Labbi Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="text-white text-9xl font-bold">لبِّ</div>';
                  }
                }}
              />
            </div>
            <h1 className="text-xl font-bold text-center" style={{ direction: 'rtl' }}>
              خدمتك مطلوبة وحاجتك موجودة
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== FILTER SIDEBAR COMPONENT ==========
const FilterSidebar = ({ filters, setFilters, onClose, show }) => {
  if (!show) return null;

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-0.5">
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

  const handleRatingChange = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    setFilters({ ...filters, ratings: newRatings });
  };

  const resetFilters = () => {
    setFilters({
      category: 'All Categories',
      priceMin: '',
      priceMax: '',
      ratings: [],
      location: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#374151]">Filters</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#374151] mb-2">Category</label>
            <select 
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
            >
              <option>All Categories</option>
              <option>Home Services</option>
              <option>Professional Services</option>
              <option>Creative Services</option>
              <option>Health & Wellness</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#374151] mb-2">Price Range ($/hr)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#374151] mb-2">Rating</label>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className="rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
                />
                <RatingStars rating={rating} />
                <span className="text-sm text-gray-600">& up</span>
              </label>
            ))}
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#374151] mb-2">Location</label>
            <select 
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
            >
              <option value="">All Locations</option>
              <option>New York, NY</option>
              <option>Los Angeles, CA</option>
              <option>Chicago, IL</option>
              <option>Houston, TX</option>
              <option>Miami, FL</option>
            </select>
          </div>

          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

// ========== SEARCHBAR COMPONENT ==========
const SearchBar = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="bg-white py-8 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#374151] mb-2">
            Find Services
          </h2>
          <p className="text-[#374151] mb-6">
            Discover and book professional services near you
          </p>
          
          <div className="bg-[#f0fdf4] p-6 rounded-lg">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent"
                />
              </div>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
              >
                <option>All Categories</option>
                <option>Home Services</option>
                <option>Professional Services</option>
                <option>Creative Services</option>
                <option>Health & Wellness</option>
              </select>
              <Button 
                variant="outline" 
                size="large" 
                className="flex items-center gap-2 px-6"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          onClose={() => setShowFilters(false)}
          show={showFilters}
        />
      )}
    </>
  );
};

// ========== SERVICE CARD WIDGET ==========
const ServiceCard = ({ service, onViewDetails }) => {
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-0.5">
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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group">
      {/* Service Image */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 px-3 py-1 bg-white text-[#374151] text-xs font-medium rounded-full border border-gray-200">
          {service.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-[#374151] mb-2 text-lg">{service.title}</h3>
        <p className="text-sm text-gray-500 mb-3">by {service.provider}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={service.rating} />
          <span className="text-sm font-medium text-[#374151]">{service.rating}</span>
          <span className="text-sm text-gray-500">({service.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{service.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500">Starting at</span>
            <div className="font-bold text-[#374151] text-xl">${service.price}<span className="text-sm font-normal">/{service.unit}</span></div>
          </div>
          <Button size="small" variant="primary" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APPLICATION ==========
const CustomerInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const servicesSectionRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceMin: '',
    priceMax: '',
    ratings: [],
    location: ''
  });

  const allServices = [
    {
      id: 1,
      title: 'Professional House Cleaning',
      description: 'Thorough and reliable cleaning services',
      provider: 'Sarah Johnson',
      rating: 4.9,
      reviews: 127,
      price: 40,
      unit: 'hour',
      location: 'New York, NY',
      category: 'Home Services',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'
    },
    {
      id: 2,
      title: 'Expert Plumbing Services',
      description: 'Fast and professional plumbing solutions',
      provider: 'Mike Davis',
      rating: 4.8,
      reviews: 94,
      price: 60,
      unit: 'hour',
      location: 'New York, NY',
      category: 'Home Services',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400'
    },
    {
      id: 3,
      title: 'Personal Training Sessions',
      description: 'Customized fitness and wellness programs',
      provider: 'Emma Wilson',
      rating: 5.0,
      reviews: 203,
      price: 50,
      unit: 'session',
      location: 'New York, NY',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
    },
    {
      id: 4,
      title: 'Web Development Services',
      description: 'Modern and responsive web solutions',
      provider: 'David Chen',
      rating: 4.9,
      reviews: 156,
      price: 80,
      unit: 'hour',
      location: 'Los Angeles, CA',
      category: 'Professional Services',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
    },
    {
      id: 5,
      title: 'Professional Photography',
      description: 'Capture your special moments',
      provider: 'Lisa Anderson',
      rating: 4.7,
      reviews: 89,
      price: 150,
      unit: 'session',
      location: 'Chicago, IL',
      category: 'Creative Services',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400'
    },
    {
      id: 6,
      title: 'Yoga & Meditation Classes',
      description: 'Find your inner peace and balance',
      provider: 'Rachel Green',
      rating: 4.9,
      reviews: 178,
      price: 30,
      unit: 'session',
      location: 'Miami, FL',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400'
    },
    {
      id: 7,
      title: 'Graphic Design Services',
      description: 'Creative designs for your brand',
      provider: 'Alex Martinez',
      rating: 4.8,
      reviews: 142,
      price: 65,
      unit: 'hour',
      location: 'Houston, TX',
      category: 'Creative Services',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400'
    },
    {
      id: 8,
      title: 'Home Renovation Consulting',
      description: 'Expert advice for your home projects',
      provider: 'Tom Builder',
      rating: 4.6,
      reviews: 76,
      price: 55,
      unit: 'hour',
      location: 'New York, NY',
      category: 'Home Services',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'
    },
    {
      id: 9,
      title: 'Business Consulting',
      description: 'Strategic guidance for your business',
      provider: 'Jennifer Smith',
      rating: 5.0,
      reviews: 234,
      price: 120,
      unit: 'hour',
      location: 'Los Angeles, CA',
      category: 'Professional Services',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
    }
  ];

  // Filter and search logic
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === 'All Categories' || 
        service.category === filters.category;

      // Price filter
      const matchesPrice = 
        (filters.priceMin === '' || service.price >= parseInt(filters.priceMin)) &&
        (filters.priceMax === '' || service.price <= parseInt(filters.priceMax));

      // Rating filter
      const matchesRating = filters.ratings.length === 0 || 
        filters.ratings.some(rating => service.rating >= rating);

      // Location filter
      const matchesLocation = filters.location === '' || 
        service.location === filters.location;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLocation;
    });
  }, [searchQuery, filters, allServices]);

  const handleBrowseServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (location.hash === '#services') {
      servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onBrowseServices={handleBrowseServices} />
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />

      <div ref={servicesSectionRef} className="max-w-7xl mx-auto px-6 py-10">
        {/* Results count */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#374151]">
            {filteredServices.length} Services Found
          </h3>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-1">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={() => navigate(`/services/${service.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#374151] mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  category: 'All Categories',
                  priceMin: '',
                  priceMax: '',
                  ratings: [],
                  location: ''
                });
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <span>© 2025 Labbi</span>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="/" className="hover:text-[#047857]">Privacy</a>
            <a href="/" className="hover:text-[#047857]">Terms</a>
            <a href="mailto:support@labbi.com" className="hover:text-[#047857]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerInterface;