import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validation'
import { setAuthData } from '../../utils/auth'
import { authAPI } from '../../services/api'
import Header from '../../components/header/Header'
import { Mail, Lock } from 'lucide-react'

function LoginProvider() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail, remember: true }))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (apiError) {
      setApiError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setApiError('')

    try {
      const response = await authAPI.login(formData.email, formData.password)
      
      if (response.success) {
        const { token, user } = response.data
        
        // Check if user is a provider or admin
        if (user.userType !== 'provider' && user.userType !== 'admin') {
          setApiError('This account is not registered as a service provider. Please use the customer login.')
          setLoading(false)
          return
        }
        
        setAuthData(
          token, 
          user.email, 
          user.userType, 
          user.fullName, 
          formData.remember,
          user.id
        )
        
        // Redirect based on user type
        if (user.userType === 'admin') {
          navigate('/admin-panel')
        } else {
          navigate('/provider')
        }
      }
    } catch (error) {
      // Check if error is about email verification
      if (error.message && error.message.includes('verify your email')) {
        setApiError(error.message + ' Click "Resend Verification" below to receive a new email.')
      } else {
        setApiError(error.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!formData.email) {
      setApiError('Please enter your email address first')
      return
    }
    
    setLoading(true)
    setApiError('')
    
    try {
      await authAPI.resendVerification(formData.email)
      setApiError('Verification email sent! Please check your inbox.')
    } catch (error) {
      setApiError(error.message || 'Failed to resend verification email')
    } finally {
      setLoading(false)
    }
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

        <div className="relative z-10 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome back</h1>
            <p className="text-gray-100 text-center mb-8">Log in to your Labbi - لبِّ provider account</p>
            
            {apiError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
                <p className="text-sm text-red-100 mb-2">{apiError}</p>
                {apiError.includes('verify your email') && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={loading}
                    className="text-sm text-white underline hover:no-underline disabled:opacity-50"
                  >
                    Resend Verification Email
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
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
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-white/80 hover:text-white">Forgot password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/70" />
                  </div>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.password ? 'border-red-300' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-200">{errors.password}</p>}
              </div>

              <div className="flex items-center">
                <input 
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#047857] focus:ring-[#047857] border-white/30 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>





              <p className="text-center text-sm text-white/80">
                Don't have an account?{' '}
                <Link to="/signup-provider" className="font-medium text-white hover:underline">
                  Sign up
                </Link>
              </p>

              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/80">Or</span>
                </div>
              </div>

              <p className="text-center text-sm text-white/80 mt-4">
                Are you a customer?{' '}
                <Link to="/login" className="font-medium text-white hover:underline">
                  Log in as Customer
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginProvider

