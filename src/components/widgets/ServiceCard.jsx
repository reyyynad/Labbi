// src/components/widgets/ServiceCard.jsx
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import Button from '../common/Button';

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
      {/* Service Image Placeholder */}
      <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center relative">
        <div className="text-gray-400">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>
        {service.badge && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
            {service.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={service.rating} />
          <span className="text-sm text-gray-600">
            {service.rating} ({service.reviews})
          </span>
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

export default ServiceCard;