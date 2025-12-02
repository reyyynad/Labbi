import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import { getAuthToken } from '../../utils/auth';
import { servicesAPI, reviewsAPI } from '../../services/api';

// Helper to format date
const formatReviewDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};


// ========== BUTTON COMPONENT ==========
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none inline-flex items-center justify-center w-full';
  
  const variants = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46]', 
    secondary: 'bg-white text-[#047857] border-2 border-[#047857] hover:bg-[#f0fdf4]',
    outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
  };
  
  const sizes = {
    small: 'px-4 py-1.5 text-sm',
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

// ========== SERVICE GALLERY WIDGET ==========
const ServiceGallery = ({ images = [], serviceName }) => {
  const fallbackImage = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image';
  const primaryImage = images[0] || fallbackImage;
  const thumbnails = images.slice(1, 5);

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 row-span-2 bg-gray-100 border border-gray-300 rounded overflow-hidden h-64">
          <img 
            src={primaryImage} 
            alt={serviceName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Not+Found';
            }}
          />
        </div>
        {/* Thumbnails */}
        {thumbnails.length > 0
          ? thumbnails.map((thumb, index) => (
              <div key={`${thumb}-${index}`} className="bg-gray-100 border border-gray-300 rounded overflow-hidden h-24">
                <img
                  src={thumb}
                  alt={`${serviceName} preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
            ))
          : [1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-gray-100 border border-gray-300 rounded flex items-center justify-center h-24">
                <span className="text-xs text-gray-400">({num})</span>
              </div>
            ))}
      </div>
    </div>
  );
};

// ========== PROVIDER INFO WIDGET ==========
const ProviderInfo = ({ provider }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 bg-white">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold">RE</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">{provider.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{provider.title}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>{provider.rating}</span>
            </div>
            <span>• {provider.reviews} reviews</span>
            <span>• {provider.bookings} bookings</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold mb-3">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mail size={16} />
            <span>{provider.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone size={16} />
            <span>{provider.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== BOOKING FORM WIDGET ==========
const BookingForm = ({ price, priceType, serviceId, navigate, isAuthenticated, serviceName, providerName, providerId, location, serviceImage, sessionDuration = 1 }) => {
  const subtotal = price || 50;
  const serviceFee = 5;
  const total = subtotal + serviceFee;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/auth-registration', { state: { from: `/services/${serviceId}` } });
      return;
    }
    // Pass all service data to datetime selection including duration
    navigate(`/customer/booking/datetime/${serviceId}`, {
      state: {
        serviceName,
        providerName,
        providerId,
        location,
        serviceCost: price,
        serviceImage,
        serviceId,
        sessionDuration: sessionDuration || 1
      }
    });
  };

  return (
    <div className="bg-white border-2 border-[#047857] rounded-lg p-6 sticky top-6">
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Starting at</p>
        <p className="text-3xl font-bold text-[#047857]">SR{price}<span className="text-base font-normal">/{priceType || 'hr'}</span></p>
      </div>

      <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">SR{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Fee:</span>
          <span className="font-medium">SR{serviceFee}</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2">
          <span>Total:</span>
          <span>SR{total}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button variant="primary" size="medium" onClick={handleBookNow}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

// ========== SERVICE DESCRIPTION WIDGET ==========
const ServiceDescription = ({ description, features }) => {
  return (
    <div className="bg-white border border-gray-300 rounded p-6 mb-4">
      <h2 className="text-lg font-semibold mb-4">About This Service</h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700">• {feature}</li>
        ))}
      </ul>
    </div>
  );
};

// ========== REVIEW ITEM WIDGET ==========
const ReviewItem = ({ review }) => {
  return (
    <div className="flex gap-3 pb-4 mb-4 border-b border-gray-200 last:border-0">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold">SA</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">{review.author}</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
    </div>
  );
};

// ========== REVIEWS SECTION WIDGET ==========
const ReviewsSection = ({ reviews, totalReviews }) => {
  return (
    <div className="bg-white border border-gray-300 rounded p-6">
      <h2 className="text-lg font-semibold mb-4">Reviews ({totalReviews})</h2>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

// ========== MAIN SERVICE DETAILS PAGE ==========
const CustomerServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isAuthenticated = !!getAuthToken();
  const [serviceData, setServiceData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Check if viewing from bookings page
  const fromBooking = location.state?.fromBooking || false;

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await servicesAPI.getById(id);
      
      if (response.success) {
        setServiceData(response.data);
        
        // Fetch reviews for this specific service (not all provider reviews)
        try {
          const reviewsResponse = await reviewsAPI.getServiceReviews(id);
          if (reviewsResponse.success && reviewsResponse.data) {
            setReviews(reviewsResponse.data.map(r => ({
              author: r.customerName || 'Customer',
              rating: r.rating,
              comment: r.comment,
              date: formatReviewDate(r.createdAt)
            })));
          }
        } catch (reviewErr) {
          console.log('Could not fetch reviews:', reviewErr);
          // Don't fail the whole page if reviews fail
        }
      } else {
        setError('Service not found');
      }
    } catch (err) {
      console.error('Fetch service error:', err);
      setError(err.message || 'Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const buildGalleryImages = (images) => {
    if (!images || images.length === 0) return [];
    return images;
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

  // Format category for display
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showAuthButtons />
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 size={48} className="animate-spin text-[#047857] mb-4" />
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !serviceData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showAuthButtons />
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#047857] mb-6 font-medium"
          >
            <ArrowLeft size={16} />
            Back to services
          </button>
          
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Not Found</h3>
            <p className="text-gray-600 mb-6">{error || 'The service you are looking for does not exist or has been removed.'}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#047857] text-white rounded-lg font-medium hover:bg-[#065f46] transition-colors"
            >
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  const service = {
    name: serviceData.title,
    status: serviceData.status === 'Active' ? 'Available' : serviceData.status,
    rating: serviceData.rating || 0,
    reviews: serviceData.reviewsCount || 0,
    location: serviceData.location || serviceData.provider?.location || 'Saudi Arabia',
    price: serviceData.price,
    priceType: serviceData.priceType || 'hour',
    images: serviceData.images?.length > 0 ? serviceData.images : [getDefaultImage(serviceData.category)]
  };

  const provider = {
    name: serviceData.provider?.fullName || 'Service Provider',
    title: `${formatCategory(serviceData.category)} Specialist`,
    rating: serviceData.rating || 0,
    reviews: serviceData.reviewsCount || 0,
    bookings: serviceData.bookings || 0,
    email: serviceData.provider?.email || 'contact@labbi.com',
    phone: serviceData.provider?.phone || '+966 50 000 0000'
  };

  const description = serviceData.description || 'Professional service with high quality standards.';

  const features = [
    `${formatCategory(serviceData.category)} service expertise`,
    `Average rating of ${service.rating} from ${service.reviews}+ reviews`,
    `Available in ${service.location}`,
    'Flexible scheduling and quick response'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuthButtons />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(fromBooking ? '/customer/bookings' : '/')}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#047857] mb-6 font-medium"
        >
          <ArrowLeft size={16} />
          {fromBooking ? 'Back to Bookings' : 'Back to results'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Service Details */}
          <div className={fromBooking ? 'lg:col-span-3' : 'lg:col-span-2'}>
            {/* Service Header */}
            <div className="bg-white border border-gray-300 rounded p-6 mb-4">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-xl font-semibold">{service.name}</h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded border border-green-300">
                  {service.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>{service.rating} ({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{service.location}</span>
                </div>
              </div>
            </div>

            <ServiceGallery images={service.images} serviceName={service.name} />
            <ProviderInfo provider={provider} />
            <ServiceDescription description={description} features={features} />
            <ReviewsSection reviews={reviews} totalReviews={service.reviews} />
          </div>

          {/* Right Column - Booking Form (only show if not from booking) */}
          {!fromBooking && (
            <div className="lg:col-span-1">
              <BookingForm
                price={service.price}
                priceType={service.priceType}
                serviceId={id}
                navigate={navigate}
                isAuthenticated={isAuthenticated}
                serviceName={service.name}
                providerName={provider.name}
                providerId={serviceData.provider?._id}
                location={service.location}
                serviceImage={service.images?.[0] || ''}
                sessionDuration={serviceData.sessionDuration || 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceDetails;