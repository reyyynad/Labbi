import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Mail, Phone } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import { getAuthToken } from '../../utils/auth';
import { getServiceById } from '../../data/services';


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
const BookingForm = ({ price, serviceId, navigate, isAuthenticated }) => {
  const subtotal = 50;
  const serviceFee = 5;
  const total = subtotal + serviceFee;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/auth-registration', { state: { from: `/services/${serviceId}` } });
      return;
    }
    navigate(`/customer/booking/datetime/${serviceId}`);
  };

  return (
    <div className="bg-white border-2 border-[#047857] rounded-lg p-6 sticky top-6">
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Starting at</p>
        <p className="text-3xl font-bold text-[#047857]">{price} SR<span className="text-base font-normal">/hr</span></p>
      </div>

      <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{subtotal} SR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Fee:</span>
          <span className="font-medium">{serviceFee} SR</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2">
          <span>Total:</span>
          <span>{total} SR</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button variant="primary" size="medium" onClick={handleBookNow}>
          Book Now
        </Button>
        <Button variant="outline" size="medium">
          Save for Later
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
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
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
  const serviceData = getServiceById(id);
  
  // Check if viewing from bookings page
  const fromBooking = location.state?.fromBooking || false;

  const buildGalleryImages = (baseUrl) => {
    if (!baseUrl) return [];
    const separator = baseUrl.includes('?') ? '&' : '?';
    return [
      baseUrl,
      `${baseUrl}${separator}variant=center`,
      `${baseUrl}${separator}variant=entropy`,
      `${baseUrl}${separator}variant=faces`,
      `${baseUrl}${separator}variant=edge`
    ];
  };

  const service = serviceData
    ? {
        name: serviceData.title,
        status: 'Available',
        rating: serviceData.rating,
        reviews: serviceData.reviews,
        location: serviceData.location,
        price: serviceData.price,
        images: buildGalleryImages(serviceData.image)
      }
    : {
        name: 'Professional Web Development',
        status: 'Online',
        rating: 4.9,
        reviews: 127,
        location: 'Riyadh, Saudi Arabia',
        price: 50,
        images: []
      };

  const provider = {
    name: serviceData?.provider || 'Renad Elsafi',
    title: serviceData ? `${serviceData.category} Specialist` : 'Full-Stack Developer',
    rating: serviceData?.rating ?? 4.0,
    reviews: serviceData?.reviews ?? 127,
    bookings: serviceData ? Math.max(60, Math.round(serviceData.reviews * 0.7)) : 89,
    email: 'support@labbi.com',
    phone: '+966501234567'
  };

  const description =
    serviceData?.description ||
    'I provide professional full-stack web development services using modern technologies including React, Node.js, and PostgreSQL. With over 5 years of experience, I can help you build scalable web applications.';

  const features = [
    `${serviceData?.category || 'Premium'} service expertise`,
    `Average rating of ${service.rating} from ${service.reviews}+ reviews`,
    `Available in ${service.location}`,
    'Flexible scheduling and quick response'
  ];

  const reviews = [
    {
      author: 'Shatha Alharbi',
      rating: 5,
      comment: 'Excellent service! Very professional and delivered exactly what I needed.',
      date: '2 days ago'
    },
    {
      author: 'Arwa Aldawoud',
      rating: 4,
      comment: 'Great quality and friendly communication. Looking forward to booking again.',
      date: '1 week ago'
    },
    {
      author: 'Adel Hassan',
      rating: 5,
      comment: 'Super smooth experience and fast turnaround. Highly recommended.',
      date: '2 weeks ago'
    }
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
                serviceId={id}
                navigate={navigate}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceDetails;