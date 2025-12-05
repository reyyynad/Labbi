import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, Star, MapPin, X, Loader2, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import logoPath from '../../assets/images/labbi_logo.svg';
import { servicesAPI } from '../../services/api';

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

// ========== MODAL COMPONENT ==========
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#374151]">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

// ========== PRIVACY POLICY MODAL ==========
const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="space-y-4 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: January 2025</p>
        
        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">1. Information We Collect</h3>
          <p className="mb-3">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Name, email address, phone number, and other contact information</li>
            <li>Account credentials and profile information</li>
            <li>Service booking details and preferences</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Communications with service providers and other users</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">2. How We Use Your Information</h3>
          <p className="mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">3. Information Sharing</h3>
          <p>
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>With service providers you choose to book through our platform</li>
            <li>With third-party service providers who perform services on our behalf</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or merger</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">4. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">5. Your Rights</h3>
          <p>
            You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">6. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>
              <a href="mailto:arwayaser26@gmail.com" className="text-[#047857] hover:underline">
                arwayaser26@gmail.com
              </a>
            </li>
            <li>
              <a href="mailto:renad.elsafi@outlook.com" className="text-[#047857] hover:underline">
                renad.elsafi@outlook.com
              </a>
            </li>
            <li>
              <a href="mailto:shathasa111@gmail.com" className="text-[#047857] hover:underline">
                shathasa111@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
};

// ========== TERMS OF SERVICE MODAL ==========
const TermsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
      <div className="space-y-4 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: January 2025</p>
        
        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">1. Acceptance of Terms</h3>
          <p>
            By accessing and using Labbi, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">2. Description of Service</h3>
          <p>
            Labbi is a digital marketplace that connects service providers with clients. We facilitate the booking and management of services but are not a party to the actual service agreement between providers and clients.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">3. User Accounts</h3>
          <p className="mb-2">
            To use certain features of our service, you must register for an account. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information to keep it accurate</li>
            <li>Maintain the security of your password</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">4. Service Provider Responsibilities</h3>
          <p className="mb-2">
            Service providers agree to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide accurate information about their services</li>
            <li>Honor all bookings and commitments</li>
            <li>Maintain professional standards and quality of service</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">5. Client Responsibilities</h3>
          <p className="mb-2">
            Clients agree to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Provide accurate booking information</li>
            <li>Respect scheduled appointment times</li>
            <li>Pay for services as agreed</li>
            <li>Treat service providers with respect</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">6. Cancellations and Refunds</h3>
          <p>
            Cancellation policies are set by individual service providers. Refunds, if applicable, will be processed according to the provider's cancellation policy and our platform terms.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">7. Prohibited Activities</h3>
          <p className="mb-2">
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Use the service for any illegal purpose</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the service</li>
            <li>Attempt to gain unauthorized access to any part of the service</li>
            <li>Post false, misleading, or fraudulent information</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">8. Limitation of Liability</h3>
          <p>
            Labbi acts as a platform connecting service providers and clients. We are not responsible for the quality, safety, or legality of services provided by third parties. Users interact at their own risk.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">9. Contact Us</h3>
          <p className="mb-3">
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-[#f0fdf4] rounded-lg p-4 space-y-2">
            <div>
              <a href="mailto:arwayaser26@gmail.com" className="text-[#047857] hover:underline block">
                arwayaser26@gmail.com
              </a>
            </div>
            <div>
              <a href="mailto:renad.elsafi@outlook.com" className="text-[#047857] hover:underline block">
                renad.elsafi@outlook.com
              </a>
            </div>
            <div>
              <a href="mailto:shathasa111@gmail.com" className="text-[#047857] hover:underline block">
                shathasa111@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

// ========== CONTACT MODAL ==========
const ContactModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-[#374151] mb-3">Get in Touch</h3>
          <p className="mb-4">
            We'd love to hear from you! Whether you have a question, feedback, or need support, we're here to help.
          </p>
        </div>

        <div className="bg-[#f0fdf4] rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-[#374151] mb-2">Email</h4>
            <div className="space-y-2">
              <a 
                href="mailto:arwayaser26@gmail.com" 
                className="text-[#047857] hover:underline block"
              >
                arwayaser26@gmail.com
              </a>
              <a 
                href="mailto:renad.elsafi@outlook.com" 
                className="text-[#047857] hover:underline block"
              >
                renad.elsafi@outlook.com
              </a>
              <a 
                href="mailto:shathasa111@gmail.com" 
                className="text-[#047857] hover:underline block"
              >
                shathasa111@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#374151] mb-2">Response Time</h4>
            <p className="text-gray-600">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#374151] mb-3">Common Inquiries</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Account and profile questions</li>
            <li>• Booking and payment issues</li>
            <li>• Service provider inquiries</li>
            <li>• Technical support</li>
            <li>• Feedback and suggestions</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            For urgent matters, please include "URGENT" in your email subject line.
          </p>
        </div>
      </div>
    </Modal>
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
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(null); // 'privacy', 'terms', 'contact', or null

  // Fetch services from backend
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await servicesAPI.getAll();
      
      if (response.success) {
        // Transform backend data to match the expected format
        const services = response.data.map(service => {
          // Filter out empty strings and invalid images
          const validImages = (service.images || []).filter(img => img && img.trim().length > 0 && img.startsWith('data:image'));
          const hasValidImages = validImages.length > 0;
          
          return {
            id: service.id,
            title: service.title,
            description: service.description,
            provider: service.provider?.fullName || 'Service Provider',
            rating: service.rating || 0,
            reviews: service.reviewsCount || 0,
            price: service.price,
            unit: service.priceType || 'hour',
            location: service.location || service.provider?.location || 'Saudi Arabia',
            category: formatCategory(service.category),
            image: hasValidImages ? validImages[0] : getDefaultImage(service.category)
          };
        });
        setAllServices(services);
      }
    } catch (err) {
      console.error('Fetch services error:', err);
      setError('Failed to load services');
      setAllServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format category names
  const formatCategory = (category) => {
    const categoryMap = {
      'home': 'Home Services',
      'technology': 'Professional Services',
      'tech': 'Professional Services',
      'design': 'Creative Services',
      'beauty': 'Health & Wellness',
      'health': 'Health & Wellness',
      'education': 'Professional Services',
      'tutoring': 'Professional Services',
      'language': 'Professional Services',
      'events': 'Creative Services',
      'business': 'Professional Services',
      'other': 'Other Services'
    };
    return categoryMap[category] || category || 'Other Services';
  };

  // Helper function to get default image based on category
  const getDefaultImage = (category) => {
    const imageMap = {
      'home': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      'technology': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
      'tech': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
      'design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
      'beauty': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&auto=format&fit=crop&q=80',
      'health': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
      'education': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      'tutoring': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      'events': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
      'business': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
    };
    return imageMap[category] || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80';
  };

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
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={48} className="animate-spin text-[#047857] mb-4" />
                <p className="text-gray-600">Loading services...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X size={40} className="text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-2">Failed to load services</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button variant="primary" onClick={fetchServices}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State - No services available at all */}
            {!loading && !error && allServices.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={48} className="text-[#047857]" />
                </div>
                <h3 className="text-2xl font-bold text-[#374151] mb-3">No Services Available Yet</h3>
                <p className="text-gray-600 mb-2 max-w-md mx-auto">
                  We're just getting started! Service providers haven't added any services yet.
                </p>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                  Check back soon or become a service provider yourself and be the first to offer your services!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={fetchServices}>
                    Refresh
                  </Button>
                  <Button variant="primary" onClick={() => navigate('/signup-provider')}>
                    Become a Provider
                  </Button>
                </div>
              </div>
            )}

            {/* Services Found */}
            {!loading && !error && allServices.length > 0 && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#374151]">
                    {filteredServices.length} Service{filteredServices.length !== 1 ? 's' : ''} Found
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
                    <h3 className="text-xl font-semibold text-[#374151] mb-2">No services match your filters</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <Button variant="outline" onClick={() => { setSearchQuery(''); setFilters({ category: 'All Categories', priceMin: '', priceMax: '', ratings: [], location: '' }); }}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <span>© 2025 Labbi</span>
          <div className="flex gap-4 mt-3 md:mt-0">
            <button 
              onClick={() => setOpenModal('privacy')} 
              className="hover:text-[#047857] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              onClick={() => setOpenModal('terms')} 
              className="hover:text-[#047857] transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button 
              onClick={() => setOpenModal('contact')} 
              className="hover:text-[#047857] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyModal 
        isOpen={openModal === 'privacy'} 
        onClose={() => setOpenModal(null)} 
      />
      <TermsModal 
        isOpen={openModal === 'terms'} 
        onClose={() => setOpenModal(null)} 
      />
      <ContactModal 
        isOpen={openModal === 'contact'} 
        onClose={() => setOpenModal(null)} 
      />
    </div>
  );
};

export default CustomerInterface;