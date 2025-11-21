import React, { useState, useEffect } from 'react';
import { Plus, Edit, Eye, Trash2, X, AlertCircle, Upload, Star, MapPin, Mail, Phone } from 'lucide-react';
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

// ========== EDIT SERVICE MODAL COMPONENT ==========
const EditServiceModal = ({ isOpen, onClose, service, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    priceType: 'hourly',
    sessionDuration: '2',
    imageFile: null,
    imagePreview: ''
  });

  const [errors, setErrors] = useState({});

  // Update form data when service changes
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        category: service.category || '',
        price: service.price || '',
        priceType: service.priceType === 'hour' ? 'hourly' : service.priceType === 'session' ? 'session' : 'fixed',
        sessionDuration: '2',
        imageFile: null,
        imagePreview: service.image || ''
      });
      // Clear any previous errors
      setErrors({});
    }
  }, [service]);

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'language', label: 'Language' },
    { value: 'tutoring', label: 'Tutoring' },
    { value: 'Home Services', label: 'Home Services' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: previewURL
      }));
      
      // Clear any previous image errors
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    }
    
    if (!formData.description.trim() || formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert form data back to service format
      const updatedService = {
        ...service,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        priceType: formData.priceType === 'hourly' ? 'hour' : formData.priceType,
        // Use preview URL if new file uploaded, otherwise keep existing image
        image: formData.imageFile ? formData.imagePreview : service.image
      };
      
      // In a real app, you would upload the file to a server here
      // For now, we'll use the preview URL
      if (formData.imageFile) {
        console.log('Image file to upload:', formData.imageFile);
        // TODO: Upload file to server and get URL
      }
      
      onSave(updatedService);
      onClose();
    }
  };

  // Clean up preview URL when modal closes
  React.useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Service</h2>
            <p className="text-sm text-gray-600 mt-1">Update your service information</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Service Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Professional House Cleaning"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your service in detail..."
              rows={5}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
              }`}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Pricing Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Pricing Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priceType: 'hourly' }))}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                  formData.priceType === 'hourly' 
                    ? 'text-white border-transparent' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={formData.priceType === 'hourly' ? { backgroundColor: '#065f46' } : {}}
              >
                Per Hour
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priceType: 'fixed' }))}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                  formData.priceType === 'fixed' 
                    ? 'text-white border-transparent' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={formData.priceType === 'fixed' ? { backgroundColor: '#065f46' } : {}}
              >
                Fixed Price
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priceType: 'session' }))}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                  formData.priceType === 'session' 
                    ? 'text-white border-transparent' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={formData.priceType === 'session' ? { backgroundColor: '#065f46' } : {}}
              >
                Per Session
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="40"
              min="0"
              step="0.01"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
              }`}
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Image
            </label>
            
            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="mb-4 relative">
                <img
                  src={formData.imagePreview}
                  alt="Service preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    // Clean up blob URL if it exists
                    if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
                      URL.revokeObjectURL(formData.imagePreview);
                    }
                    setFormData(prev => ({
                      ...prev,
                      imageFile: null,
                      imagePreview: ''
                    }));
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-gray-400 transition-colors">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload-edit"
              />
              <label
                htmlFor="image-upload-edit"
                className="inline-block px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors font-medium"
              >
                Choose Image
              </label>
              {formData.imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  {formData.imageFile.name} selected
                </p>
              )}
            </div>
            
            {errors.image && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.image}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#065f46' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ========== SERVICE PREVIEW MODAL COMPONENT ==========
const ServicePreviewModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  // Mock data for preview (how customers see it)
  const servicePreview = {
    name: service.title,
    status: service.status === 'Active' ? 'Available' : 'Unavailable',
    rating: 4.8, // Mock rating
    reviews: service.bookings || 0,
    location: 'Riyadh, Saudi Arabia',
    price: service.price,
    images: service.image ? [service.image] : []
  };

  const provider = {
    name: 'Your Name', // Would come from provider profile
    title: `${service.category} Specialist`,
    rating: 4.8,
    reviews: service.bookings || 0,
    bookings: service.bookings || 0,
    email: 'provider@example.com',
    phone: '+966 50 123 4567'
  };

  const features = [
    `${service.category} service expertise`,
    `Average rating of ${servicePreview.rating} from ${servicePreview.reviews}+ reviews`,
    `Available in ${servicePreview.location}`,
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
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-50 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Service Preview</h2>
            <p className="text-sm text-gray-600 mt-1">How customers see your service</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Preview Content - Customer View */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Service Details */}
            <div className="lg:col-span-2">
              {/* Service Header */}
              <div className="bg-white border border-gray-300 rounded p-6 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-xl font-semibold">{servicePreview.name}</h1>
                  <span className={`px-3 py-1 text-xs rounded border ${
                    servicePreview.status === 'Available' 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}>
                    {servicePreview.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{servicePreview.rating} ({servicePreview.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{servicePreview.location}</span>
                  </div>
                </div>
              </div>

              {/* Service Gallery */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 row-span-2 bg-gray-100 border border-gray-300 rounded overflow-hidden h-64">
                    <img 
                      src={servicePreview.images[0] || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'} 
                      alt={servicePreview.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="bg-gray-100 border border-gray-300 rounded flex items-center justify-center h-24">
                      <span className="text-xs text-gray-400">Image {num}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Provider Info */}
              <div className="border border-gray-300 rounded p-4 mb-4 bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">
                      {provider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
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

              {/* Service Description */}
              <div className="bg-white border border-gray-300 rounded p-6 mb-4">
                <h2 className="text-lg font-semibold mb-4">About This Service</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700">• {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Reviews Section */}
              <div className="bg-white border border-gray-300 rounded p-6">
                <h2 className="text-lg font-semibold mb-4">Reviews ({servicePreview.reviews})</h2>
                <div>
                  {reviews.map((review, index) => (
                    <div key={index} className="flex gap-3 pb-4 mb-4 border-b border-gray-200 last:border-0">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold">
                          {review.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
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
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form (Preview) */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-[#047857] rounded-lg p-6 sticky top-6">
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Starting at</p>
                  <p className="text-3xl font-bold text-[#047857]">
                    ${servicePreview.price}
                    <span className="text-base font-normal">/{service.priceType}</span>
                  </p>
                </div>

                <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${servicePreview.price} USD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium">$5 USD</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2">
                    <span>Total:</span>
                    <span>${servicePreview.price + 5} USD</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    disabled
                    className="w-full px-5 py-2.5 bg-gray-300 text-gray-500 rounded font-medium cursor-not-allowed"
                  >
                    Book Now
                  </button>
                  <button 
                    disabled
                    className="w-full px-5 py-2.5 border-2 border-gray-300 text-gray-500 rounded font-medium cursor-not-allowed"
                  >
                    Save for Later
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center italic">
                    Preview Mode - Booking buttons are disabled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

const MyServices = ({ onNavigate }) => {
  const [services, setServices] = useState(mockServices);
  const [editingService, setEditingService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewingService, setViewingService] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleEdit = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setEditingService(service);
      setIsEditModalOpen(true);
    }
  };

  const handleView = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setViewingService(service);
      setIsPreviewModalOpen(true);
    }
  };

  const handleDelete = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
      alert('Service deleted successfully');
    }
  };

  const handleSaveService = (updatedService) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? updatedService : s));
      alert('Service updated successfully!');
    }
    setIsEditModalOpen(false);
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
              Delete
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

      {/* Edit Service Modal */}
      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
        onSave={handleSaveService}
      />

      {/* Service Preview Modal */}
      <ServicePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setViewingService(null);
        }}
        service={viewingService}
      />
    </div>
  );
};

export default MyServices;