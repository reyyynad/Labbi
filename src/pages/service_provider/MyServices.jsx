import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Clock, MapPin, DollarSign } from 'lucide-react';

// Mock services data
const mockServices = [
  {
    id: 1,
    title: "Web Development",
    category: "Technology",
    description: "Full-stack web development using React and Node.js",
    price: 500,
    status: "Active",
    bookings: 15,
    rating: 4.8,
    availability: "Mon-Fri, 9 AM - 5 PM",
    location: "Riyadh"
  },
  {
    id: 2,
    title: "UI/UX Design",
    category: "Design",
    description: "Modern and user-friendly interface design",
    price: 350,
    status: "Active",
    bookings: 12,
    rating: 4.9,
    availability: "Flexible",
    location: "Remote"
  },
  {
    id: 3,
    title: "Arabic Translation",
    category: "Language",
    description: "Professional Arabic to English translation",
    price: 200,
    status: "Pending Review",
    bookings: 8,
    rating: 5.0,
    availability: "Weekends",
    location: "Remote"
  }
];

const MyServices = () => {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter services based on search and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || service.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending Review": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(service.status)}`}>
              {service.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{service.category}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="View Details">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit Service">
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete Service">
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-2">{service.description}</p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold text-gray-900">{service.price} SAR</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{service.availability}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{service.location}</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{service.bookings}</span> bookings
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
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
              <button className="text-gray-400 hover:text-white">Dashboard</button>
              <button className="text-white">My Services</button>
              <button className="text-gray-400 hover:text-white">Bookings</button>
              <button className="text-gray-400 hover:text-white">Availability</button>
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4">
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Services</h1>
            <p className="text-gray-600">Manage and track all your service listings</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-6">
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Services Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredServices.length}</span> of <span className="font-semibold text-gray-900">{services.length}</span> services
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border-2 border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyServices;