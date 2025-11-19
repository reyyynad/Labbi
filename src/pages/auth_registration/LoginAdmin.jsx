import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validation'
import { setAuthData } from '../../utils/auth'
import Header from '../../components/header/Header'
import { User, Mail, Lock } from 'lucide-react'

function LoginAdmin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    remember: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }
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

    setTimeout(() => {
      const mockToken = 'mock_token_' + Date.now()
      const userName = formData.fullName.trim()
      
      setAuthData(mockToken, formData.email, 'admin', userName, formData.remember)
      
      setLoading(false)
      navigate('/admin-panel')
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

        <div className="relative z-10 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
            <p className="text-gray-100 text-center mb-8">Log in to your Labbi - لبِّ admin account</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name
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
                    placeholder="Admin Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-200">{errors.fullName}</p>}
              </div>

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
                    placeholder="admin@labbi.com"
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
                  <a href="#" className="text-sm text-white/80 hover:text-white">Forgot?</a>
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
                {loading ? 'Logging in...' : 'Log in as Admin'}
              </button>

              <p className="text-center text-sm text-white/80">
                Not an admin?{' '}
                <Link to="/login" className="font-medium text-white hover:underline">Customer Login</Link>
                {' | '}
                <Link to="/login-provider" className="font-medium text-white hover:underline">Provider Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin

