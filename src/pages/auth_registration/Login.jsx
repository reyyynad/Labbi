import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validation'
import { setAuthData } from '../../utils/auth'
import { authAPI } from '../../services/api'
import Header from '../../components/header/Header'
import { Mail, Lock } from 'lucide-react'

function Login() {
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
        
        setAuthData(
          token, 
          user.email, 
          user.userType, 
          user.fullName, 
          formData.remember,
          user.id
        )
        
        // Redirect based on user type
        switch (user.userType) {
          case 'admin':
            navigate('/admin-panel')
            break
          case 'provider':
            navigate('/provider')
            break
          default:
            navigate('/customer')
        }
      }
    } catch (error) {
      setApiError(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked')
    // TODO: Implement Google OAuth
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
            <p className="text-gray-100 text-center mb-8">Log in to your Labbi - لبِّ account</p>
            
            {apiError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
                <p className="text-sm text-red-100">{apiError}</p>
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/80">Or continue with</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                  <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                  <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                  <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <p className="text-center text-sm text-white/80">
                Don't have an account?{' '}
                <Link to="/auth-registration" className="font-medium text-white hover:underline">
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
                Are you a service provider?{' '}
                <Link to="/login-provider" className="font-medium text-white hover:underline">
                  Log in as Provider
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
