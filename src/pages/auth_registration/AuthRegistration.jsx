import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AuthRegistration() {
  const navigate = useNavigate()

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
          <button className="btn-secondary" onClick={() => navigate('/')}>Log in</button>
          <button className="btn-primary">Sign up</button>
        </div>
      </header>

      <main className="join-container">
        <div className="join-content">
          <h1 className="join-title">Join Labbi</h1>
          <p className="join-subtitle">خدمتك مطلوبة وحاجتك موجودة</p>

          <div className="choice-cards">
            <div className="choice-card">
              <div className="choice-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="20" r="10" stroke="#374151" strokeWidth="2"/>
                  <path d="M15 45c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="#374151" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className="choice-title">I'm a Customer</h2>
              <p className="choice-description">Find and book services from verified providers</p>
              <ul className="choice-benefits">
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Browse thousands of services
                </li>
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Easy booking and payment
                </li>
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Rate and review providers
                </li>
              </ul>
              <button className="btn-choice" onClick={() => navigate('/signup-customer')}>
                Sign up as Customer
              </button>
            </div>

            <div className="choice-card">
              <div className="choice-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="15" y="15" width="30" height="25" rx="2" stroke="#374151" strokeWidth="2"/>
                  <path d="M20 20h20M20 25h15M20 30h20M20 35h10" stroke="#374151" strokeWidth="1.5"/>
                </svg>
              </div>
              <h2 className="choice-title">I'm a service provider</h2>
              <p className="choice-description">Offer your services and grow your business</p>
              <ul className="choice-benefits">
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Create service listings
                </li>
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Manage bookings & availability
                </li>
                <li>
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M7 10l2 2 4-4" stroke="#047857" strokeWidth="2" fill="none"/>
                  </svg>
                  Build your reputation
                </li>
              </ul>
              <button className="btn-choice" onClick={() => navigate('/signup-provider')}>
                Sign up as Provider
              </button>
            </div>
          </div>

          <p className="login-prompt">
            Already have an account? 
            <Link to="/" className="login-link">Log in</Link>
          </p>
        </div>
      </main>
    </>
  )
}

export default AuthRegistration

