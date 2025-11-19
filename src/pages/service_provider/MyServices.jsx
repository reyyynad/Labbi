import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import ProviderHeader from '../../components/header/ProviderHeader';

// Mock services data
const mockServices = [
  {
    id: 1,
    title: "Professional House Cleaning",
    category: "Home Services",
    description: "Comprehensive cleaning service with eco-friendly products",
    price: 40,
    priceType: "hour",
    status: "Active",
    bookings: 127,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400"
  },
  {
    id: 2,
    title: "Deep Cleaning Service",
    category: "Home Services",
    description: "Intensive cleaning for homes and offices",
    price: 60,
    priceType: "hour",
    status: "Active",
    bookings: 45,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400"
  },
  {
    id: 3,
    title: "Move-In/Out Cleaning",
    category: "Home Services",
    description: "Complete cleaning for moving in or out of properties",
    price: 150,
    priceType: "session",
    status: "Inactive",
    bookings: 32,
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400"
  },
  {
    id: 4,
    title: "Office Cleaning",
    category: "Home Services",
    description: "Professional office and workplace cleaning services",
    price: 50,
    priceType: "hour",
    status: "Active",
    bookings: 81,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
  }
];

const MyServices = ({ onNavigate }) => {
  const [services, setServices] = useState(mockServices);

  const handleEdit = (serviceId) => {
    alert(`Edit service #${serviceId}`);
  };

  const handleView = (serviceId) => {
    alert(`View details for service #${serviceId}`);
  };

  const handleDelete = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
      alert('Service deleted successfully');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": 
        return { bg: '#065f46', text: '#ffffff' };
      case "Inactive": 
        return { bg: '#9ca3af', text: '#ffffff' };
      case "Pending": 
        return { bg: '#fbbf24', text: '#ffffff' };
      default: 
        return { bg: '#9ca3af', text: '#ffffff' };
    }
  };

  const ServiceCard = ({ service }) => {
    const statusColors = getStatusColor(service.status);
    
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow" style={{ backgroundColor: '#f0fdf4' }}>
        {/* Service Image */}
        <div className="relative h-48 bg-gray-200">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Status Badge */}
          <div 
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
          >
            {service.status}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
              {service.title}
            </h3>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">${service.price}/{service.priceType}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {service.description}
          </p>

          {/* Category and Bookings */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {service.category} • {service.bookings} bookings
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button 
              onClick={() => handleEdit(service.id)}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button 
              onClick={() => handleView(service.id)}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button 
              onClick={() => handleDelete(service.id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-red-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <ProviderHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Services</h1>
            <p className="text-gray-600 text-sm">Manage your service offerings</p>
          </div>
          <button 
            onClick={() => onNavigate('add-service')}
            className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#065f46' }}
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-16 text-center" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-6">Create your first service to start accepting bookings</p>
            <button 
              onClick={() => onNavigate('add-service')}
              className="px-6 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#065f46' }}
            >
              Add New Service
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyServices;