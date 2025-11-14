import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Mail, Phone, Calendar, Clock } from 'lucide-react';

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
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-black hover:bg-gray-50',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
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

// ========== HEADER COMPONENT ==========
const Header = () => {
  return (
    <header className="bg-white border-b border-gray-300 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-bold text-lg">
            L
          </div>
          <h1 className="text-lg font-normal">Labbi - لَبّي</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-700 hover:text-black underline">Find Services</a>
          <a href="#" className="text-sm text-gray-700 hover:text-black underline">My Bookings</a>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-400">
            <span className="text-sm font-semibold">AA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// ========== SERVICE GALLERY WIDGET ==========
const ServiceGallery = ({ images, serviceName }) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Primary Image */}
        <div className="col-span-2 row-span-2 bg-gray-100 border border-gray-300 rounded flex items-center justify-center h-64">
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-gray-300 rounded"></div>
            <span className="text-sm">[Primary Image]</span>
          </div>
        </div>
        
        {/* Secondary Images */}
        {[1, 2, 3, 4].map((num) => (
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
    <div className="border border-gray-300 rounded p-4 mb-4">
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
const BookingForm = ({ price }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    duration: ''
  });

  const subtotal = 50;
  const serviceFee = 5;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-white border border-gray-300 rounded p-6 sticky top-6">
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Starting at</p>
        <p className="text-3xl font-bold">{price} SAR<span className="text-base font-normal">/hr</span></p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Service Type</label>
          <select 
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select service</option>
            <option>Web Development</option>
            <option>UI/UX Design</option>
            <option>Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Select date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Time</label>
          <div className="relative">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Select time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <select 
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select duration</option>
            <option>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
            <option>4+ hours</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{subtotal} SAR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Fee:</span>
          <span className="font-medium">{serviceFee} SAR</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2">
          <span>Total:</span>
          <span>{total} SAR</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button variant="primary" size="medium">
          Book Now
        </Button>
        <Button variant="outline" size="medium">
          Save for Later
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-xs font-semibold mb-2">BOOKING FLOW:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Select date/time</li>
          <li>• Provider confirms</li>
          <li>• Payment processed</li>
        </ul>
      </div>
    </div>
  );
};

// ========== SERVICE DESCRIPTION WIDGET ==========
const ServiceDescription = ({ description, features }) => {
  return (
    <div className="border border-gray-300 rounded p-6 mb-4">
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
    <div className="border border-gray-300 rounded p-6">
      <h2 className="text-lg font-semibold mb-4">[Reviews ({totalReviews})]</h2>
      <div>
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

// ========== MAIN SERVICE DETAILS PAGE ==========
const ServiceDetails = () => {
  const service = {
    name: '[Professional Web Development]',
    status: 'Online',
    rating: 4.9,
    reviews: 127,
    location: 'San Francisco, CA',
    price: 50,
    images: []
  };

  const provider = {
    name: 'Renad Elsafi',
    title: 'Full-Stack Developer',
    rating: 4.0,
    reviews: 127,
    bookings: 89,
    email: 'renadelafi@example.com',
    phone: '+966501234567'
  };

  const description = "I provide professional full-stack web development services using modern technologies including React, Node.js, and PostgreSQL. With over 5 years of experience, I can help you build scalable web applications.";

  const features = [
    'Custom web application development',
    'API development and integration',
    'Database design and optimization',
    'Performance optimization'
  ];

  const reviews = [
    {
      author: 'Shatha Alharbi',
      rating: 5,
      comment: 'Excellent service! Very professional and delivered exactly what I needed.',
      date: '2 days ago'
    },
    {
      author: 'Shatha Alharbi',
      rating: 5,
      comment: 'Excellent service! Very professional and delivered exactly what I needed.',
      date: '2 days ago'
    },
    {
      author: 'Shatha Alharbi',
      rating: 5,
      comment: 'Excellent service! Very professional and delivered exactly what I needed.',
      date: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black mb-6">
          <ArrowLeft size={16} />
          Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2">
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

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm price={service.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;