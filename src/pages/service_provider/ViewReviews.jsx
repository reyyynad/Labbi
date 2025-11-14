import React, { useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    customer: 'Arwa Aldawoud',
    initials: 'AA',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely work with again.',
    service: 'Professional Web Development',
    date: '2 days ago'
  },
  {
    id: 2,
    customer: 'Adel Hassan',
    initials: 'AH',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely work with again.',
    service: 'UI/UX Design Consultation',
    date: '5 days ago'
  },
  {
    id: 3,
    customer: 'Bana Jaber',
    initials: 'BJ',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely work with again.',
    service: 'Full-Stack Development',
    date: '1 week ago'
  },
  {
    id: 4,
    customer: 'Shatha Alharbi',
    initials: 'SA',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely work with again.',
    service: 'UI/UX Design Consultation',
    date: '2 days ago'
  },
  {
    id: 5,
    customer: 'Yaser Abdullah',
    initials: 'YA',
    rating: 5,
    comment: 'Excellent service! Very professional and delivered exactly what I needed. Would definitely work with again.',
    service: 'Professional Web Development',
    date: '2 days ago'
  }
];

const ViewReviews = ({ onNavigate }) => {
  const [reviews] = useState(mockReviews);

  const stats = {
    avgRating: 4.8,
    totalReviews: 127,
    positivePercent: 98
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-gray-700">{review.initials}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">{review.customer}</h3>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-3">{review.comment}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Service: {review.service}</span>
            <span>•</span>
            <span>{review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-gray-900 rounded flex items-center justify-center font-bold">
                L
              </div>
              <span className="text-xl font-semibold">Labbi - لَبِّ</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-white">Dashboard</button>
              <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-white">My Services</button>
              <button onClick={() => onNavigate('bookings')} className="text-gray-400 hover:text-white">Bookings</button>
              <button onClick={() => onNavigate('availability')} className="text-gray-400 hover:text-white">Availability</button>
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4 cursor-pointer"
                   onClick={() => onNavigate('profile')}>
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Reviews</h1>
          <p className="text-gray-600">View all reviews from your clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{stats.avgRating}</div>
            <p className="text-gray-600">Average Rating</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{stats.totalReviews}</div>
            <p className="text-gray-600">Total Reviews</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{stats.positivePercent}%</div>
            <p className="text-gray-600">Positive</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination or Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Load More Reviews
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewReviews;