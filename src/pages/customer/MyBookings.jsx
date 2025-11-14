// src/pages/customer/MyBookings.jsx
import React, { useState } from 'react';
import BookingCard from '../../components/widgets/BookingCard';


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

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Pending', 'Confirmed', 'Completed'];

  const bookings = [
    {
      id: '1000',
      status: 'Confirmed',
      service: 'Web Development',
      provider: 'Renad Elsafi',
      date: 'Oct 15, 2025',
      time: '2:00 PM',
      price: '50/hr',
      actions: [
        { label: 'View Details', variant: 'outline', onClick: () => {} },
        { label: 'Cancel', variant: 'outline', onClick: () => {} }
      ]
    },
    {
      id: '1001',
      status: 'Pending',
      service: 'UI Design',
      provider: 'Renad Elsafi',
      date: 'Oct 18, 2025',
      time: '10:00 AM',
      price: '50/hr',
      actions: [
        { label: 'Awaiting Provider Confirmation', variant: 'outline', onClick: () => {} }
      ],
      statusMessage: 'Awaiting Provider Confirmation'
    },
    {
      id: '1002',
      status: 'Completed',
      service: 'Web Development',
      provider: 'Renad Elsafi',
      date: 'Oct 10, 2025',
      time: '3:00 PM',
      price: '50/hr',
      actions: [
        { label: 'Leave Review', variant: 'primary', onClick: () => {} },
        { label: 'Book Again', variant: 'outline', onClick: () => {} }
      ]
    }
  ];

  const filteredBookings = activeTab === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">My Bookings</h1>
          <p className="text-sm text-gray-600">View and manage your service bookings</p>
        </div>

        <div className="border-b border-gray-300 mb-6"></div>

        <div className="bg-white border border-gray-300 mb-6">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3 text-sm font-medium border-r border-gray-300 last:border-r-0 transition-colors ${
                  activeTab === tab
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No bookings found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;