import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword, validateForm } from '../../utils/validation'

function SignupCustomer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      confirmPassword: { required: true, match: 'password' },
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
      navigate('/verify-email', { state: { email: formData.email, name: formData.fullName } })
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
        <div className="bg-background rounded-2xl p-10 w-full max-w-[550px] shadow-2xl">
          {/* Back button */}
          <Link to="/auth-registration" className="inline-flex items-center gap-2 text-text font-medium mb-6 hover:text-highlight transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
          
          <h1 className="text-3xl font-bold text-text mb-2">Create Customer Account</h1>
          <p className="text-base text-text mb-8">Join Labbi to book amazing services</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative flex items-center">
                <svg className="absolute left-4 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <input 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full py-3.5 pl-12 pr-4 text-base border-2 rounded-lg transition-all duration-300 font-primary focus:outline-none focus:border-teal-600 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
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
                  I agree to the <a href="#" className="text-secondary underline hover:text-highlight">Terms of Service</a> and <a href="#" className="text-secondary underline hover:text-highlight">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <div className="text-red-500 text-sm mt-1">{errors.terms}</div>}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 text-lg font-semibold text-white bg-secondary border-none rounded-lg cursor-pointer transition-all duration-300 mt-2 hover:bg-highlight disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-text mt-6">
            Already have an account? <Link to="/" className="text-secondary font-semibold underline hover:text-highlight">Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupCustomer

