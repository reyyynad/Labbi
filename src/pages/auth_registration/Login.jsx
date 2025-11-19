import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../utils/validation'
import { setAuthData } from '../utils/auth'

function Login() {
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
    // Clear error when user starts typing
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

    // Simulate API call
    setTimeout(() => {
      const mockToken = 'mock_token_' + Date.now()
      // Use the full name from the form
      const userName = formData.fullName.trim()
      
      setAuthData(mockToken, formData.email, 'admin', userName, formData.remember)
      
      setLoading(false)
      navigate('/admin-panel')
    }, 1500)
  }

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked')
    // In a real application, redirect to Google OAuth
  }

  return (
    <>
      <header className="main-header">
        <div className="logo">
          <div className="logo-icon">L</div>
          <span className="logo-text">Labbi - لبِّ</span>
        </div>
        <nav className="main-nav">
          <a href="#" className="nav-link">Find Services</a>
          <a href="#" className="nav-link">Become a Provider</a>
          <a href="#" className="nav-link">How it works</a>
        </nav>
        <div className="auth-buttons">
          <button className="btn-secondary">Log in</button>
          <button className="btn-primary" onClick={() => navigate('/auth-registration')}>Sign up</button>
        </div>
      </header>

      <main className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Log in to your Labbi - لبِّ account</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M4 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Arwa Aldawoud"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">Password</label>
                <a href="#" className="forgot-link">Forgot?</a>
              </div>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <div className="divider">
              <span className="divider-text">Or continue with</span>
            </div>

            <button type="button" className="btn-google" onClick={handleGoogleSignIn}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <p className="signup-prompt">
              Don't have an account? 
              <Link to="/auth-registration" className="signup-link">Sign up</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login

