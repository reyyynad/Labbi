import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHeader'
import { adminAPI } from '../../services/api'
import { Layers, ShieldCheck, Eye, Plus, AlertCircle, CheckCircle2, X, User, Mail, Phone, MapPin, FileText, Clock, Star, TrendingUp, Edit, Trash2 } from 'lucide-react'

// ========== REVIEW MODAL COMPONENT ==========
const ReviewModal = ({ isOpen, onClose, service, onApprove, onReject }) => {
  if (!isOpen || !service) return null;

  // Mock service details - in a real app, this would come from the service data
  const serviceDetails = {
    description: 'Professional service offering with comprehensive features and excellent customer support. This service has been carefully crafted to meet the highest standards of quality and reliability.',
    price: 80,
    location: 'Riyadh, Saudi Arabia',
    duration: '2 hours',
    features: [
      'Professional service delivery',
      'Quality guaranteed',
      'Flexible scheduling',
      'Customer support',
      'Satisfaction guarantee'
    ],
    providerEmail: `${service.provider.toLowerCase().replace(' ', '.')}@example.com`,
    providerPhone: '+966 50 123 4567',
    bio: 'Experienced professional with expertise in the field.',
    experience: '5+ years'
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Review Service Approval</h2>
            <p className="text-sm text-[#6b7280] mt-1">Service ID: #{service.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Service Overview */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{service.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-2">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{service.provider}</span>
                  </div>
                  <span>•</span>
                  <span>{service.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Submitted {service.submitted}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    service.risk === 'High' 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : service.risk === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : 'bg-green-100 text-green-800 border border-green-300'
                  }`}>
                    Risk: {service.risk}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                  <FileText size={16} />
                  Service Description
                </h4>
                <p className="text-sm text-[#6b7280] leading-relaxed bg-white border border-gray-200 rounded-lg p-4 break-words whitespace-pre-wrap overflow-wrap-anywhere">
                  {serviceDetails.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Service Features</h4>
                <ul className="space-y-2">
                  {serviceDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-[#6b7280]">
                      <CheckCircle2 size={16} className="text-[#047857]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Pricing & Details</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Price:</span>
                    <span className="font-semibold text-[#111827]">SR{serviceDetails.price}/hr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Duration:</span>
                    <span className="font-semibold text-[#111827]">{serviceDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Provider Information</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-[#6b7280]" />
                    <span className="text-[#111827] font-medium">{service.provider}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.providerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.providerPhone}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-[#6b7280] mb-1">Bio:</p>
                    <p className="text-sm text-[#111827]">{serviceDetails.bio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280]">Experience: <span className="font-medium text-[#111827]">{serviceDetails.experience}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-[#6b7280] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to reject "${service.title}"?`)) {
                  onReject(service.id);
                  onClose();
                }
              }}
              className="px-6 py-2.5 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => {
                onApprove(service.id);
                onClose();
              }}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              Approve Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== MANAGE LISTING MODAL COMPONENT ==========
const ManageListingModal = ({ isOpen, onClose, services, onStatusChange, onDelete }) => {
  if (!isOpen) return null;

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (serviceId) => {
    setSelectedServiceId(serviceId);
    setSelectedService(services.find(s => s.id === serviceId));
  };

  const handleStatusChange = (serviceId, newStatus) => {
    onStatusChange(serviceId, newStatus);
    setSelectedService(null);
    setSelectedServiceId(null);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm(`Are you sure you want to delete this service? This action cannot be undone.`)) {
      onDelete(serviceId);
      setSelectedService(null);
      setSelectedServiceId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Manage Listings</h2>
            <p className="text-sm text-[#6b7280] mt-1">Manage active service listings</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Services List */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Select a Service</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedServiceId === service.id
                        ? 'border-[#1e3a8a] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-[#111827]">{service.title}</h4>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          service.status === 'Featured'
                            ? 'bg-[#e0f2fe] text-[#0c4a6e]'
                            : 'bg-[#dcfce7] text-[#166534]'
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b7280] mb-1">{service.provider}</p>
                    <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        {service.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{service.bookings} bookings</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Service Details */}
            <div className="lg:col-span-2">
              {selectedService ? (
                <div className="space-y-6">
                  {/* Service Overview */}
                  <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#111827] mb-2">{selectedService.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-2">
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{selectedService.provider}</span>
                          </div>
                          <span>•</span>
                          <span>{selectedService.category}</span>
                          <span>•</span>
                          <span className="text-xs text-[#9ca3af]">{selectedService.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              selectedService.status === 'Featured'
                                ? 'bg-[#e0f2fe] text-[#0c4a6e]'
                                : 'bg-[#dcfce7] text-[#166534]'
                            }`}
                          >
                            {selectedService.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium text-[#111827]">Rating</span>
                      </div>
                      <p className="text-2xl font-bold text-[#111827]">{selectedService.rating.toFixed(1)}</p>
                      <p className="text-xs text-[#6b7280] mt-1">Average rating</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-[#047857]" />
                        <span className="text-sm font-medium text-[#111827]">Bookings</span>
                      </div>
                      <p className="text-2xl font-bold text-[#111827]">{selectedService.bookings}</p>
                      <p className="text-xs text-[#6b7280] mt-1">Total bookings</p>
                    </div>
                  </div>

                  {/* Management Actions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-sm font-semibold text-[#111827] mb-4">Management Actions</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#111827] mb-2">
                          Change Status
                        </label>
                        <select
                          value={selectedService.status}
                          onChange={(e) => handleStatusChange(selectedService.id, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                        >
                          <option value="Active">Active</option>
                          <option value="Featured">Featured</option>
                        </select>
                        <p className="text-xs text-[#6b7280] mt-2">
                          {selectedService.status === 'Featured' 
                            ? 'Featured services appear prominently in search results'
                            : 'Active services are visible to all users'}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleDelete(selectedService.id)}
                          className="px-4 py-2 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete Service
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] text-center">
                  <div>
                    <Eye size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-[#6b7280]">Select a service from the list to manage</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-[#6b7280] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function AdminServices() {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [pendingServices, setPendingServices] = useState([])
  const [activeServices, setActiveServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const summaryCards = [
    { label: 'Total Services', value: activeServices.length + pendingServices.length, change: 'All services', icon: Layers },
    { label: 'Pending Reviews', value: pendingServices.length, change: 'Awaiting approval', icon: AlertCircle },
    { label: 'Active Listings', value: activeServices.length, change: 'Currently live', icon: ShieldCheck },
    { label: 'Categories', value: new Set([...activeServices, ...pendingServices].map(s => s.category)).size, change: 'Unique categories', icon: Plus }
  ]

  // Dynamically generate categories from actual services
  const categoryColors = {
    'Consulting': 'bg-[#eef2ff] text-[#3730a3]',
    'Home Services': 'bg-[#ecfccb] text-[#3f6212]',
    'Creative': 'bg-[#ede9fe] text-[#5b21b6]',
    'Technology': 'bg-[#cffafe] text-[#155e75]',
    'technology': 'bg-[#cffafe] text-[#155e75]',
    'design': 'bg-[#fce7f3] text-[#9d174d]',
    'language': 'bg-[#fef3c7] text-[#92400e]',
    'tutoring': 'bg-[#d1fae5] text-[#065f46]',
    'home': 'bg-[#ecfccb] text-[#3f6212]',
    'beauty': 'bg-[#fce7f3] text-[#9d174d]',
    'education': 'bg-[#e0e7ff] text-[#1e3a8a]',
    'tech': 'bg-[#cffafe] text-[#155e75]',
    'events': 'bg-[#fef3c7] text-[#92400e]',
    'health': 'bg-[#d1fae5] text-[#065f46]',
    'business': 'bg-[#eef2ff] text-[#3730a3]',
    'other': 'bg-[#f3f4f6] text-[#374151]'
  };

  // Get unique categories from actual services
  const allServices = [...activeServices, ...pendingServices];
  const uniqueCategories = [...new Set(allServices.map(s => s.category).filter(Boolean))];
  
  // Create categories array with actual data
  const categories = uniqueCategories.map(category => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
    const serviceCount = allServices.filter(s => s.category === category).length;
    return {
      name: categoryName,
      services: serviceCount,
      growth: '+0%', // TODO: Calculate actual growth
      highlight: categoryColors[category] || categoryColors['other']
    };
  }).sort((a, b) => b.services - a.services); // Sort by service count descending

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Fetch pending services
        const pendingResponse = await adminAPI.getServices('pending', '', 1, 100);
        if (pendingResponse.success) {
          setPendingServices(pendingResponse.data.services || []);
        }
        
        // Fetch active services
        const activeResponse = await adminAPI.getServices('Active', '', 1, 100);
        if (activeResponse.success) {
          setActiveServices(activeResponse.data.services || []);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleReview = (service) => {
    setSelectedService(service)
    setIsReviewModalOpen(true)
  }

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveService(id);
      setPendingServices(pendingServices.filter(service => service.id !== id));
      alert(`Service has been approved!`);
      // Refresh services
      const response = await adminAPI.getServices('Active', '', 1, 100);
      if (response.success) {
        setActiveServices(response.data.services || []);
      }
    } catch (err) {
      console.error('Error approving service:', err);
      alert('Failed to approve service. Please try again.');
    }
  }

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectService(id, 'Rejected by admin');
      setPendingServices(pendingServices.filter(service => service.id !== id));
      alert(`Service has been rejected.`);
    } catch (err) {
      console.error('Error rejecting service:', err);
      alert('Failed to reject service. Please try again.');
    }
  }

  const handleManageListings = () => {
    setIsManageModalOpen(true)
  }

  const handleStatusChange = (serviceId, newStatus) => {
    setActiveServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, status: newStatus }
          : service
      )
    )
    alert(`Service status updated to ${newStatus}`)
  }

  const handleDeleteService = (serviceId) => {
    setActiveServices(prevServices => prevServices.filter(service => service.id !== serviceId))
    alert('Service has been deleted')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Service Management</h1>
            <p className="text-[#6b7280] mt-2">
              Moderate listings, monitor categories, and keep the marketplace healthy
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/add-category')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#047857] text-white text-sm font-semibold rounded-lg shadow hover:bg-[#065f46] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-[#6b7280]">Loading services...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {summaryCards.map(({ label, value, change, icon: Icon }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{label}</p>
                  <p className="text-3xl font-bold text-[#111827] mt-1">{value.toLocaleString()}</p>
                </div>
                <span className="w-11 h-11 rounded-xl bg-[#ecfdf5] text-[#047857] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <p className="text-sm text-[#047857] font-medium mt-4">{change}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">Pending Approvals</h2>
                <p className="text-sm text-[#6b7280]">Review the latest service submissions</p>
              </div>
              <button className="text-sm font-semibold text-[#047857] hover:text-[#065f46]">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {pendingServices.map((service) => (
                <div key={service.id} className="p-4 border border-gray-100 rounded-xl bg-[#f8fafc]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[#111827]">{service.title}</h3>
                      <p className="text-sm text-[#6b7280]">
                        by {service.provider} • {service.category}
                      </p>
                      <p className="text-xs text-[#9ca3af] mt-1">Submitted {service.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#4b5563]">
                        Risk: {service.risk}
                      </span>
                      <button 
                        onClick={() => handleReview(service)}
                        className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-4 h-4 inline-block mr-2" />
                        Review
                      </button>
                      <button 
                        onClick={() => handleApprove(service.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 inline-block mr-2" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#111827] mb-1">Categories</h2>
            <p className="text-sm text-[#6b7280] mb-6">Performance snapshot per vertical</p>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-4 border border-gray-100 rounded-xl bg-[#f8fafc] flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{category.name}</p>
                    <p className="text-xs text-[#6b7280]">{category.services} services live</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${category.highlight}`}>
                    {category.growth}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#111827]">Top Active Services</h2>
              <p className="text-sm text-[#6b7280]">
                Monitor performance across the platform
              </p>
            </div>
            <button 
              onClick={handleManageListings}
              className="px-4 py-2 text-sm font-semibold text-[#047857] border border-[#047857] rounded-lg hover:bg-[#ecfdf5]"
            >
              Manage Listings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-[#f9fafb] text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                <tr>
                  <th className="px-6 py-3 text-left">Service</th>
                  <th className="px-6 py-3 text-left">Provider</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Bookings</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-[#111827]">
                {activeServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/70">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{service.title}</p>
                        <p className="text-xs text-[#9ca3af]">{service.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6b7280]">{service.provider}</td>
                    <td className="px-6 py-4">{service.category}</td>
                    <td className="px-6 py-4">{service.rating.toFixed(1)}</td>
                    <td className="px-6 py-4">{service.bookings}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          service.status === 'Featured'
                            ? 'bg-[#e0f2fe] text-[#0c4a6e]'
                            : 'bg-[#dcfce7] text-[#166534]'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
          </>
        )}
      </main>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        service={selectedService}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Manage Listing Modal */}
      <ManageListingModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        services={activeServices}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteService}
      />
    </div>
  )
}

export default AdminServices
