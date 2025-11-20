import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword, validateForm } from '../../utils/validation'
import Header from '../../components/header/Header'
import { User, Mail, Lock, Phone, Briefcase, MapPin, ArrowLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      <Header transparent showAuthButtons />
      
      {/* Gradient Background with Animated Blobs */}
      <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1e3a8a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#065f46] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#047857] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link 
            to="/auth-registration" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-2 text-center">Become a Service Provider</h1>
            <p className="text-gray-100 text-center mb-8">Create your professional profile and start offering your services</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/20">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-white/70" />
                      </div>
                      <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.fullName ? 'border-red-300' : ''}`}
                        placeholder="Renad Al-xxx"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-200">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-white/70" />
                      </div>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.email ? 'border-red-300' : ''}`}
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-200">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/70" />
                      </div>
                      <input 
                        type="password" 
                        id="password"
                        name="password"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.password ? 'border-red-300' : ''}`}
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-200">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-white/70" />
                      </div>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="+966 50 000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/20">Professional Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                      Primary Skill Category *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-white/70" />
                      </div>
                      <select 
                        id="category"
                        name="category"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.category ? 'border-red-300' : ''}`}
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="bg-gray-800">Select a category</option>
                        <option value="home-services" className="bg-gray-800">Home Services</option>
                        <option value="beauty" className="bg-gray-800">Beauty & Wellness</option>
                        <option value="education" className="bg-gray-800">Education & Tutoring</option>
                        <option value="tech" className="bg-gray-800">Tech & IT Services</option>
                        <option value="events" className="bg-gray-800">Events & Entertainment</option>
                        <option value="health" className="bg-gray-800">Health & Fitness</option>
                        <option value="business" className="bg-gray-800">Business Services</option>
                        <option value="other" className="bg-gray-800">Other</option>
                      </select>
                    </div>
                    {errors.category && <p className="mt-1 text-sm text-red-200">{errors.category}</p>}
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-white mb-2">
                      Professional Bio *
                    </label>
                    <textarea 
                      id="bio"
                      name="bio"
                      className={`block w-full px-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.bio ? 'border-red-300' : ''}`}
                      placeholder="Tell clients about your experience and expertise..."
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-white/70 text-xs mt-1 block">Minimum 50 characters</small>
                    {errors.bio && <p className="mt-1 text-sm text-red-200">{errors.bio}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-white mb-2">
                        Years of Experience *
                      </label>
                      <select 
                        id="experience"
                        name="experience"
                        className={`block w-full px-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.experience ? 'border-red-300' : ''}`}
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="bg-gray-800">Select years</option>
                        <option value="0-1" className="bg-gray-800">Less than 1 year</option>
                        <option value="1-3" className="bg-gray-800">1-3 years</option>
                        <option value="3-5" className="bg-gray-800">3-5 years</option>
                        <option value="5-10" className="bg-gray-800">5-10 years</option>
                        <option value="10+" className="bg-gray-800">10+ years</option>
                      </select>
                      {errors.experience && <p className="mt-1 text-sm text-red-200">{errors.experience}</p>}
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-white/70" />
                        </div>
                        <input 
                          type="text" 
                          id="location"
                          name="location"
                          className="block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#047857] focus:ring-[#047857] border-white/30 rounded mt-1"
                    required
                  />
                  <span className="ml-2 block text-sm text-white">
                    I agree to the Provider Terms and understand that my profile will be reviewed before approval
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-sm text-red-200">{errors.terms}</p>}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupProvider

