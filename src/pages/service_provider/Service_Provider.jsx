import React, { useState, useEffect } from "react";
import { Briefcase, Calendar, Star, TrendingUp, Clock } from "lucide-react";

// Temporary mock data (replace with API later)
const mockData = {
  stats: {
    totalServices: 12,
    activeBookings: 8,
    avgRating: 4.8,
    monthlyEarnings: 4450,
    weekChange: 3,
    todayBookings: 2,
    totalReviews: 45,
    earningsChange: 12
  },
  pendingBookings: [
    {
      id: 1,
      service: "Web Development",
      customer: "Arwa Aldawoud",
      date: "Oct 15, 2025",
      time: "2:00 PM"
    },
    {
      id: 2,
      service: "UI Design Review",
      customer: "Shatha Alharbi",
      date: "Oct 16, 2025",
      time: "10:00 AM"
    }
  ],
  recentReviews: [
    {
      id: 1,
      customer: "Bana Jaber",
      rating: 5,
      comment:
        "Excellent service! Very professional and delivered exactly what I needed.",
      initials: "BJ"
    },
    {
      id: 2,
      customer: "Adel Hassan",
      rating: 5,
      comment: "Great experience. Highly recommend!",
      initials: "AH"
    }
  ]
};

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState(null);

  // Simulate API call (replace later with real fetch)
  useEffect(() => {
    const fetchData = async () => {
      const res = await new Promise((resolve) =>
        setTimeout(() => resolve(mockData), 500)
      );
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>
    );
  }

  const { stats, pendingBookings, recentReviews } = data;

  // Reusable Components
  const StatCard = ({ icon: Icon, value, label, badge, trend }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        {badge && (
          <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">
            {badge}
          </span>
        )}
        {trend && (
          <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">
            +{trend}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  const handleBookingAction = (id, action) => {
    console.log(`Booking ${id} - ${action}`);
    // Later: axios.post(`/api/bookings/${id}/${action}`);
  };

  const BookingRequest = ({ booking }) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <h4 className="font-semibold text-gray-900 mb-1">{booking.service}</h4>
      <p className="text-sm text-gray-600 mb-2">
        Customer: {booking.customer}
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {booking.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {booking.time}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleBookingAction(booking.id, "accept")}
          className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
        >
          Accept
        </button>
        <button
          onClick={() => handleBookingAction(booking.id, "reschedule")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Reschedule
        </button>
        <button
          onClick={() => handleBookingAction(booking.id, "decline")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Decline
        </button>
      </div>
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-gray-700">
            {review.initials}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900">{review.customer}</h4>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );

  // Configuration for stat cards
  const statCards = [
    {
      icon: Briefcase,
      value: stats.totalServices,
      label: "Total Services",
      badge: "+3 this week"
    },
    {
      icon: Calendar,
      value: stats.activeBookings,
      label: "[Active Bookings]",
      badge: `${stats.todayBookings} today`
    },
    { icon: Star, value: stats.avgRating, label: "Average Rating" },
    {
      icon: TrendingUp,
      value: `${stats.monthlyEarnings} SAR`,
      label: "This Month",
      trend: stats.earningsChange
    }
  ];

  // ---------------------- UI -----------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
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
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`${
                  activeTab === "dashboard" ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`${
                  activeTab === "services" ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                My Services
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`${
                  activeTab === "bookings" ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`${
                  activeTab === "availability" ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                Availability
              </button>

              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4">
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, Renad!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Bookings and Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Booking Requests */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Pending Booking Requests
              </h2>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {pendingBookings.length} New
              </span>
            </div>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <BookingRequest key={booking.id} booking={booking} />
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              View All Bookings
            </button>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Reviews
              </h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Additional info text */}
        <div className="mt-6 text-sm text-gray-500">
          <p className="mb-1">{stats.totalReviews} total reviews</p>
          <p>2 pending approval</p>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
