import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, Star, MapPin, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import logoPath from '../../assets/images/labbi_logo.svg';
import servicesCatalog from '../../data/services';

// ========== BUTTON COMPONENT (unchanged) ==========
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

// ========== HERO SECTION (unchanged) ==========
const HeroSection = ({ onBrowseServices }) => {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1e3a8a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#065f46] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#047857] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">About Labbi</h2>
            <p className="text-lg leading-relaxed mb-10 text-gray-100">
            Labbi is a digital marketplace built to create a win-win environment for both service providers and clients. It allows individuals to share their skills, earn money, and build credibility, while giving clients a simple way to find reliable services that match their needs.
            </p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onBrowseServices?.(); }}
              className="bg-[#047857] hover:bg-[#065f46] text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Search size={24} /> Browse Services
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-md h-[400px] md:h-[500px] flex items-center justify-center">
              <img src={logoPath} alt="Labbi Logo" className="w-full h-full object-contain drop-shadow-2xl" />
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

// ========== FILTER PANE ==========
const LeftFilterPanel = ({ filters, setFilters }) => {
  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );

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
    <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
      <h3 className="text-lg font-bold text-[#374151] mb-6 flex items-center gap-2">
        <Filter size={20} /> Filters
      </h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#374151] mb-2">Category</label>
        <select 
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857]"
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
        <label className="block text-sm font-semibold text-[#374151] mb-2">Price Range (SR/hr)</label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857]"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857]"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#374151] mb-3">Rating</label>
        {[5, 4, 3].map((rating) => (
          <label key={rating} className="flex items-center gap-3 mb-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.ratings.includes(rating)}
              onChange={() => handleRatingChange(rating)}
              className="w-5 h-5 rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
            />
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600">& up</span>
          </label>
        ))}
      </div>

      {/* Location */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#374151] mb-2">Location</label>
        <select 
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857]"
        >
          <option value="">All Locations</option>
          <option>Dhahran, Saudi Arabia</option>
          <option>Riyadh, Saudi Arabia</option>
        </select>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

// ========== SEARCHBAR (same style, just simpler) ==========
const SearchBar = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      <div className="bg-white py-8 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#374151] mb-2">Find Services</h2>
          <p className="text-[#374151] mb-6">Discover and book professional services near you</p>
          
          <div className="bg-[#f0fdf4] p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>

              <Button 
                variant="outline" 
                size="large" 
                className="lg:hidden flex items-center gap-2"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter size={18} /> Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}><X size={28} /></button>
              </div>
              <LeftFilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ========== SERVICE CARD (unchanged) ==========
const ServiceCard = ({ service, onViewDetails }) => {
  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
            <div className="font-bold text-[#374151] text-xl">SR{service.price}<span className="text-sm font-normal">/{service.unit}</span></div>
          </div>
          <Button size="small" variant="primary" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APP - FILTER ON LEFT ==========
const CustomerInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const servicesSectionRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceMin: '', priceMax: '', ratings: [], location: ''
  });

  const allServices = servicesCatalog;

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = !searchQuery || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = filters.category === 'All Categories' || service.category === filters.category;
      const matchesPrice = (!filters.priceMin || service.price >= Number(filters.priceMin)) && 
                          (!filters.priceMax || service.price <= Number(filters.priceMax));
      const matchesRating = filters.ratings.length === 0 || filters.ratings.some(r => service.rating >= r);
      const matchesLocation = !filters.location || service.location === filters.location;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLocation;
    });
  }, [searchQuery, filters, allServices]);

  const handleBrowseServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.hash === '#services') {
      servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header transparent showAuthButtons />
      <HeroSection onBrowseServices={handleBrowseServices} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} filters={filters} setFilters={setFilters} />

      {/* MAIN CONTENT: FILTER LEFT + SERVICES RIGHT */}
      <div ref={servicesSectionRef} className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-6">
          {/* FILTER ON LEFT - Desktop */}
          <div className="hidden lg:block">
            <LeftFilterPanel filters={filters} setFilters={setFilters} />
          </div>

          {/* SERVICES GRID - Full width on mobile */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#374151]">
                {filteredServices.length} Services Found
              </h3>
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-1">Showing results for "{searchQuery}"</p>
              )}
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} onViewDetails={() => navigate(`/services/${service.id}`)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-[#374151] mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setFilters({ category: 'All Categories', priceMin: '', priceMax: '', ratings: [], location: '' }); }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <span>© 2025 Labbi</span>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="/" className="hover:text-[#047857]">Privacy</a>
            <a href="/" className="hover:text-[#047857]">Terms</a>
            <a href="mailto:renad.elsafi@outlook.com" className="hover:text-[#047857]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerInterface;