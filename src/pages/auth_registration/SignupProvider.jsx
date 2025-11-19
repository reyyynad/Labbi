import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword, validateForm } from '../utils/validation'

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
          <button className="btn-secondary" onClick={() => navigate('/login-provider')}>Log in</button>
          <button className="btn-primary">Sign up</button>
        </div>
      </header>

      <main className="signup-container">
        <div className="signup-card signup-card-wide">
          <Link to="/auth-registration" className="back-link">← Back</Link>
          
          <h1 className="signup-title">Become a Service Provider</h1>
          <p className="signup-subtitle">Create your professional profile and start offering your services</p>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Renad Al-xxx"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
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
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password *</label>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+966 50 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Professional Details</h3>
              
              <div className="form-group">
                <label htmlFor="category" className="form-label">Primary Skill Category *</label>
                <select 
                  id="category"
                  name="category"
                  className={`form-input ${errors.category ? 'error' : ''}`}
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
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">Professional Bio *</label>
                <textarea 
                  id="bio"
                  name="bio"
                  className={`form-textarea ${errors.bio ? 'error' : ''}`}
                  placeholder="Tell clients about your experience and expertise..."
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
                <small className="form-hint">Minimum 50 characters</small>
                {errors.bio && <div className="error-message">{errors.bio}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">Years of Experience *</label>
                  <select 
                    id="experience"
                    name="experience"
                    className={`form-input ${errors.experience ? 'error' : ''}`}
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select years</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.experience && <div className="error-message">{errors.experience}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input 
                    type="text" 
                    id="location"
                    name="location"
                    className="form-input"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <span className="checkbox-label">
                  I agree to the Provider Terms and understand that my profile will be reviewed before approval
                </span>
              </label>
              {errors.terms && <div className="error-message">{errors.terms}</div>}
            </div>

            <button type="submit" className="btn-signup" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          <div className="system-info-box" style={{ marginTop: '1.5rem' }}>
            <h3 className="system-title">SYSTEM VALIDATION:</h3>
            <ul className="system-list">
              <li>• All required fields validated</li>
              <li>• Email uniqueness check</li>
              <li>• Bio minimum length validation</li>
              <li>• Account pending admin approval</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupProvider

