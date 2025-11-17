import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validation'
import { setAuthData } from '../../utils/auth'

function LoginProvider() {
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
      // Use the full name from the form
      const userName = formData.fullName.trim()
      
      setAuthData(mockToken, formData.email, 'admin', userName, formData.remember)
      
      setLoading(false)
      navigate('/admin-panel')
    }, 1500)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: '#1e3a8a' }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#065f46' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#047857' }}></div>
        </div>

        {/* Main content */}
        <main className="relative z-10 flex justify-center items-center min-h-screen p-8">
          <div className="w-full max-w-[480px]">
            {/* Glassmorphic card */}
            <div className="bg-light/90 backdrop-blur-xl border border-white/30 rounded-2xl p-10 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-text mb-3">Welcome back</h1>
                <p className="text-base text-text">Log in to your Labbi - <span className="font-arabic">لبِّ</span> account</p>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-text">Full Name</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-text/60 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M4 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="text" 
                      id="fullName"
                      name="fullName"
                      className={`w-full py-3.5 pl-12 pr-4 text-base bg-background border-2 rounded-xl text-text placeholder-text/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-highlight/20 ${
                        errors.fullName ? 'border-red-400' : 'border-gray-300 focus:border-highlight'
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
                  <label htmlFor="email" className="text-sm font-semibold text-text">Email Address</label>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-text/60 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className={`w-full py-3.5 pl-12 pr-4 text-base bg-background border-2 rounded-xl text-text placeholder-text/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-highlight/20 ${
                        errors.email ? 'border-red-400' : 'border-gray-300 focus:border-highlight'
                      }`}
                      placeholder="example@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-semibold text-text">Password</label>
                    <a href="#" className="text-sm text-text underline transition-colors duration-300 hover:text-highlight">Forgot?</a>
                  </div>
                  <div className="relative flex items-center">
                    <svg className="absolute left-4 text-text/60 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <input 
                      type="password" 
                      id="password"
                      name="password"
                      className={`w-full py-3.5 pl-12 pr-4 text-base bg-background border-2 rounded-xl text-text placeholder-text/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-highlight/20 ${
                        errors.password ? 'border-red-400' : 'border-gray-300 focus:border-highlight'
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
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="remember"
                      name="remember"
                      className="w-[18px] h-[18px] cursor-pointer accent-secondary"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <span className="text-sm text-text select-none">Remember me</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 text-lg font-semibold text-white bg-secondary border-none rounded-xl cursor-pointer transition-all duration-300 mt-2 shadow-lg hover:bg-highlight hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>

                <div className="flex items-center text-center my-6">
                  <div className="flex-1 border-b border-gray-300"></div>
                  <span className="px-4 text-text/60 text-sm">Or continue with</span>
                  <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <button 
                  type="button" 
                  className="w-full py-3.5 text-base font-semibold text-text bg-background border-2 border-gray-300 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 hover:bg-light hover:border-secondary"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                    <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                    <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                    <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>

                <p className="text-center text-sm text-text mt-4">
                  Don't have an account? 
                  <Link to="/signup-provider" className="text-secondary font-semibold underline transition-colors duration-300 hover:text-highlight">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default LoginProvider

