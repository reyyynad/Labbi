import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';

const mockReviews = [
  {
    id: 1,
    customer: 'Anna Robinson',
    initials: 'AR',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely recommend! The attention to detail was outstanding.',
    service: 'Professional House Cleaning',
    date: '2 days ago'
  },
  {
    id: 2,
    customer: 'Adel Hassan',
    initials: 'AH',
    rating: 5,
    comment: 'Excellent service. Very professional and delivered exactly what I needed. Would definitely recommend!',
    service: 'Deep Cleaning Service',
    date: '1 week ago'
  },
  {
    id: 3,
    customer: 'Dana Jaber',
    initials: 'DJ',
    rating: 5,
    comment: 'Excellent service. Very professional and delivered exactly what I needed. Would definitely recommend!',
    service: 'Professional House Cleaning',
    date: '2 weeks ago'
  },
  {
    id: 4,
    customer: 'Shatha Alharbi',
    initials: 'SA',
    rating: 5,
    comment: 'Outstanding work! Sarah was punctual, thorough, and my house has never looked better. Highly recommend her services.',
    service: 'Move-In/Out Cleaning',
    date: '3 weeks ago'
  },
  {
    id: 5,
    customer: 'Viper Abdullah',
    initials: 'VA',
    rating: 4,
    comment: 'Great service overall. The cleaning was thorough and Sarah was very professional. Would use again.',
    service: 'Professional House Cleaning',
    date: '1 month ago'
  },
  {
    id: 6,
    customer: 'Mike Johnson',
    initials: 'MJ',
    rating: 5,
    comment: 'Best cleaning service I\'ve ever used. Sarah is amazing and the results speak for themselves!',
    service: 'Deep Cleaning Service',
    date: '1 month ago'
  },
  {
    id: 7,
    customer: 'Lisa Brown',
    initials: 'LB',
    rating: 4,
    comment: 'Very good service. Professional and efficient. My home looks great!',
    service: 'Professional House Cleaning',
    date: '1 month ago'
  },
  {
    id: 8,
    customer: 'Tom Wilson',
    initials: 'TW',
    rating: 5,
    comment: 'Exceptional service! Sarah went above and beyond. Highly professional and thorough.',
    service: 'Office Cleaning',
    date: '2 months ago'
  }
];

const ViewReviews = ({ onNavigate }) => {
  const [reviews] = useState(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8;

  const stats = {
    avgRating: 4.8,
    totalReviews: 127,
    positivePercent: 98
  };

  // Calculate pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="rounded-lg border border-gray-200 p-6" style={{ backgroundColor: '#f0fdf4' }}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ backgroundColor: '#065f46' }}>
          {review.initials}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{review.customer}</h3>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>

          <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

          <p className="text-sm text-gray-600">Service: {review.service}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">All Reviews</h1>
          <p className="text-gray-600 text-sm">View all reviews from your customers</p>
        </div>

        {/* Stats Cards */}
        <div className="rounded-lg border border-gray-200 p-8 mb-6" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Average Rating</p>
              <div className="text-5xl font-bold text-gray-900 mb-2">{stats.avgRating}</div>
              <div className="flex justify-center">
                <StarRating rating={Math.floor(stats.avgRating)} />
              </div>
            </div>

            <div className="text-center border-x border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Reviews</p>
              <div className="text-5xl font-bold text-gray-900">{stats.totalReviews}</div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Positive</p>
              <div className="text-5xl font-bold text-gray-900">{stats.positivePercent}%</div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 mb-6">
          {currentReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, reviews.length)} of {reviews.length} reviews
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === index + 1
                    ? 'text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
                style={currentPage === index + 1 ? { backgroundColor: '#065f46' } : {}}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewReviews;