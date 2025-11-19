import React, { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';

const AddService = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    pricingType: 'hourly',
    price: '',
    sessionDuration: '',
    images: []
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'language', label: 'Language' },
    { value: 'tutoring', label: 'Tutoring' },
    { value: 'home', label: 'Home Services' }
  ];

  const subcategories = {
    technology: ['Web Development', 'Mobile Development', 'Data Science'],
    design: ['UI/UX Design', 'Graphic Design', 'Logo Design'],
    language: ['Translation', 'Teaching', 'Proofreading'],
    tutoring: ['Math', 'Science', 'Language'],
    home: ['Cleaning', 'Maintenance', 'Cooking']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real implementation, you'd upload to server
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    }
    
    if (!formData.description.trim() || formData.description.length < 100) {
      newErrors.description = 'Description must be at least 100 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = 'Price must be a numeric value';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In real implementation, send to backend
      console.log('Form submitted:', formData);
      alert('Service submitted for review! You will receive a confirmation email once approved.');
      onNavigate('services');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      onNavigate('services');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="text-white shadow-sm" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                <svg className="w-5 h-5" style={{ color: '#1e3a8a' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-lg font-semibold">ServiceHub</span>
            </div>
            
            <nav className="flex items-center gap-8 text-sm">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-gray-200 transition-colors">
                Dashboard
              </button>
              <button onClick={() => onNavigate('services')} className="font-medium">
                My Services
              </button>
              <button onClick={() => onNavigate('bookings')} className="hover:text-gray-200 transition-colors">
                Bookings
              </button>
              <button onClick={() => onNavigate('availability')} className="hover:text-gray-200 transition-colors">
                Availability
              </button>
              <button onClick={() => onNavigate('profile')} className="hover:text-gray-200 transition-colors">
                Profile
              </button>
              <button onClick={() => onNavigate('reviews')} className="hover:text-gray-200 transition-colors">
                Reviews
              </button>
              <button onClick={() => onNavigate('settings')} className="hover:text-gray-200 transition-colors">
                Settings
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <button 
          onClick={() => onNavigate('services')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Services
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Service</h1>
          <p className="text-gray-600 text-sm">Create a new service offering for customers to book</p>
        </div>

        <div className="rounded-lg border border-gray-200 p-8" style={{ backgroundColor: '#f0fdf4' }}>
          <form onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
              
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

              {/* Category & Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    disabled={!formData.category}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 bg-white"
                  >
                    <option value="">Select subcategory</option>
                    {formData.category && subcategories[formData.category]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing & Duration Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing & Duration</h2>
              
              {/* Pricing Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Pricing Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricingType: 'hourly' }))}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all text-left ${
                      formData.pricingType === 'hourly' 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    style={formData.pricingType === 'hourly' ? { backgroundColor: '#065f46' } : {}}
                  >
                    Per Hour
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricingType: 'fixed' }))}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all text-left ${
                      formData.pricingType === 'fixed' 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    style={formData.pricingType === 'fixed' ? { backgroundColor: '#065f46' } : {}}
                  >
                    Fixed Price
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricingType: 'session' }))}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all text-left ${
                      formData.pricingType === 'session' 
                        ? 'text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    style={formData.pricingType === 'session' ? { backgroundColor: '#065f46' } : {}}
                  >
                    Per Session
                  </button>
                </div>
              </div>

              {/* Session Duration & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Session Duration (hours)
                  </label>
                  <input
                    type="number"
                    name="sessionDuration"
                    value={formData.sessionDuration}
                    onChange={handleChange}
                    placeholder="2"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="40"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
                      errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Images Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Service Images</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-white hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB (Max 5 images)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Choose Files
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 font-medium">
                    {formData.images.length} file(s) selected
                  </p>
                </div>
              )}

              {/* Submission Guidelines */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Submission Guidelines:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Upload high-quality images that represent your service</li>
                  <li>• First image will be used as the main thumbnail</li>
                  <li>• Recommended dimensions: 1200x800px</li>
                  <li>• Avoid watermarks or excessive text</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#065f46' }}
              >
                Submit for Review
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors bg-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddService;