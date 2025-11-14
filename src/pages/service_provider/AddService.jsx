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

  const handleSaveDraft = () => {
    // Save to local storage or backend as draft
    console.log('Saved as draft:', formData);
    alert('Service saved as draft!');
  };

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
              <button onClick={() => onNavigate('services')} className="text-white">My Services</button>
              <button onClick={() => onNavigate('bookings')} className="text-gray-400 hover:text-white">Bookings</button>
              <button onClick={() => onNavigate('availability')} className="text-gray-400 hover:text-white">Availability</button>
              
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ml-4">
                <span className="text-sm font-semibold">SA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <button 
          onClick={() => onNavigate('services')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to services
        </button>

        <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Service</h2>

          <form onSubmit={handleSubmit}>
            {/* Service Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Professional Web Development"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                  errors.title ? 'border-red-500' : 'border-gray-200'
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
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service in detail..."
                rows={6}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                  errors.description ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500">Minimum 100 characters</p>
                <p className="text-sm text-gray-500">{formData.description.length} characters</p>
              </div>
              {errors.description && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.category ? 'border-red-500' : 'border-gray-200'
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:bg-gray-100"
                >
                  <option value="">Select subcategory</option>
                  {formData.category && subcategories[formData.category]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Pricing Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, pricingType: 'hourly' }))}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.pricingType === 'hourly' 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">Per Hour</h4>
                  <p className="text-sm text-gray-600">Charge by the hour</p>
                </div>
                
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, pricingType: 'fixed' }))}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.pricingType === 'fixed' 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">Fixed Price</h4>
                  <p className="text-sm text-gray-600">One-time fee</p>
                </div>
                
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, pricingType: 'session' }))}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.pricingType === 'session' 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">Per Session</h4>
                  <p className="text-sm text-gray-600">Charge per session</p>
                </div>
              </div>
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="SAR"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errors.price ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    SAR
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Must be a numeric value</p>
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Session Duration
                </label>
                <select
                  name="sessionDuration"
                  value={formData.sessionDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Select duration</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>

            {/* Service Images */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Service Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB (recommended: 1200x800)</p>
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
                  className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Choose Files
                </label>
              </div>
              {formData.images.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {formData.images.length} file(s) selected
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
              <button
                type="submit"
                className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
              >
                Submit for Review
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Save as Draft
              </button>
            </div>

            {/* Validation Info */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">SERVICE VALIDATION:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All required fields must be filled</li>
                <li>• Price must be numeric and positive</li>
                <li>• Description min 100 characters</li>
                <li>• Status: "Pending Admin Approval"</li>
                <li>• Confirmation email after approval</li>
              </ul>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddService;