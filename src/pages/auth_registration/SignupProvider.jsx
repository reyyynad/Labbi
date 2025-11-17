import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword, validateForm } from '../../utils/validation'

function SignupProvider() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    category: '',
    bio: '',
    experience: '',
    location: '',
    terms: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [certificateFile, setCertificateFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateFile = (file) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes

    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PDF, PNG, or JPG files only.'
    }
    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit. Please upload a smaller file.'
    }
    return null
  }

  const handleFileSelect = (file) => {
    const error = validateFile(file)
    if (error) {
      setErrors(prev => ({ ...prev, certificate: error }))
      return
    }
    setCertificateFile(file)
    setErrors(prev => ({ ...prev, certificate: '' }))
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveFile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCertificateFile(null)
    setErrors(prev => ({ ...prev, certificate: '' }))
    // Reset file input
    const fileInput = document.getElementById('certificate-input')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const rules = {
      fullName: { required: true, minLength: 2 },
      email: { required: true, email: true },
      password: { required: true, minLength: 8 },
      category: { required: true },
      bio: { required: true, minLength: 50 },
      experience: { required: true },
      terms: { required: true }
    }

    const newErrors = validateForm(formData, rules)
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    setTimeout(() => {
      // Store the name for later use
      localStorage.setItem('signupName', formData.fullName)
      setLoading(false)
      navigate('/verify-email-provider', { state: { email: formData.email, name: formData.fullName } })
    }, 1500)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-primary via-primary/90 to-secondary flex justify-center items-center p-8 relative">
        {/* Help icon in bottom right */}
        <button className="absolute bottom-8 right-8 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg hover:bg-highlight transition-colors cursor-pointer">
          ?
        </button>

        {/* Main content card */}
        <div className="bg-background rounded-2xl p-10 w-full max-w-[700px] shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Back button */}
          <Link to="/auth-registration" className="inline-flex items-center gap-2 text-text font-medium mb-6 hover:text-highlight transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
          
          <h1 className="text-3xl font-bold text-text mb-2">Create Provider Account</h1>
          <p className="text-base text-text mb-8">Start offering your professional services</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Personal Information Section */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M4 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="text" 
                      id="fullName"
                      name="fullName"
                    className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-highlight ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                      placeholder="Arwa Aldawoud"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="arwa@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative flex items-center">
                  <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Professional Details</h3>
              
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="category" className="text-sm font-semibold text-gray-700">Service Category</label>
                <div className="relative flex items-center">
                  <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="4" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 8h8M6 11h6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <select 
                    id="category"
                    name="category"
                    className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 cursor-pointer bg-white ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="home-services">Home Services</option>
                    <option value="beauty">Beauty & Wellness</option>
                    <option value="education">Education & Tutoring</option>
                    <option value="tech">Tech & IT Services</option>
                    <option value="events">Events & Entertainment</option>
                    <option value="health">Health & Fitness</option>
                    <option value="business">Business Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="bio" className="text-sm font-semibold text-gray-700">Professional Bio</label>
                <textarea 
                  id="bio"
                  name="bio"
                  className={`w-full py-3.5 px-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 resize-y ${
                    errors.bio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell clients about your experience and expertise..."
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
                <small className="block text-sm text-gray-500 mt-1">Minimum 50 characters</small>
                {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="experience" className="text-sm font-semibold text-gray-700">Years of Experience</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input 
                      type="number" 
                      id="experience"
                      name="experience"
                      className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 ${
                        errors.experience ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="5"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.experience && <div className="text-red-500 text-sm mt-1">{errors.experience}</div>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-sm font-semibold text-gray-700">Location</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/>
                      <path d="M10 2C6.5 2 3.5 4.5 3.5 8c0 5 6.5 10 6.5 10s6.5-5 6.5-10c0-3.5-3-6-6.5-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="text" 
                      id="location"
                      name="location"
                      className="w-full py-3.5 pl-12 pr-4 text-base border-2 border-gray-300 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600"
                      placeholder="New York, NY"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Certificate Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Professional Certificate (Optional)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isDragging 
                      ? 'border-highlight bg-light/50' 
                      : certificateFile 
                        ? 'border-highlight bg-light/30' 
                        : 'border-highlight/50 hover:border-highlight'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('certificate-input')?.click()}
                >
                  <input
                    type="file"
                    id="certificate-input"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  {certificateFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-highlight/20 flex items-center justify-center">
                        <svg className="text-highlight" width="32" height="32" viewBox="0 0 20 20" fill="none">
                          <path d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414a2 2 0 0 0-.586-1.414L12.586 2.586A2 2 0 0 0 11.172 2H6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M8 10h4M8 13h4M6 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-medium text-text">{certificateFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(certificateFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-sm text-highlight hover:text-secondary underline transition-colors"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                        <svg className="text-gray-400" width="32" height="32" viewBox="0 0 20 20" fill="none">
                          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                    </>
                  )}
                </div>
                {errors.certificate && <div className="text-red-500 text-sm mt-1">{errors.certificate}</div>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  id="terms"
                  name="terms"
                  className="w-5 h-5 cursor-pointer accent-secondary"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <span className="text-sm text-text select-none">
                  I agree to the <a href="#" className="text-secondary underline hover:text-highlight">Terms of Service</a>, <a href="#" className="text-secondary underline hover:text-highlight">Privacy Policy</a>, and <a href="#" className="text-secondary underline hover:text-highlight">Provider Agreement</a>
                </span>
              </label>
              {errors.terms && <div className="text-red-500 text-sm mt-1">{errors.terms}</div>}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 text-lg font-semibold text-white bg-secondary border-none rounded-lg cursor-pointer transition-all duration-300 mt-2 hover:bg-highlight disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Create Provider Account'}
            </button>
          </form>

          <p className="text-center text-sm text-text mt-6">
            Already have an account? <Link to="/login-provider" className="text-secondary font-semibold underline hover:text-highlight">Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupProvider

