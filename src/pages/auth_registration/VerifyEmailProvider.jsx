import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

function VerifyEmailProvider() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'Renad@example.com'

  const handleResend = () => {
    console.log('Resending verification email to:', email)
    // In a real app, this would call an API
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

      <main className="verification-container">
        <div className="verification-card">
          <div className="email-icon-wrapper">
            <svg className="email-icon" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#374151" strokeWidth="2"/>
              <path d="M20 30h40a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V32a2 2 0 0 1 2-2z" stroke="#374151" strokeWidth="2" fill="none"/>
              <path d="M18 32l22 14 22-14" stroke="#374151" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          <h1 className="verification-title">Verify your email</h1>
          
          <p className="verification-message">
            We've sent a verification link to <strong>{email}</strong>
            <br />
            Please check your inbox and click the link to activate your account.
          </p>

          <div className="info-box">
            <p className="info-text">Didn't receive the email?</p>
            <button className="btn-resend" onClick={handleResend}>Resend verification email</button>
          </div>

          <div className="system-info-box">
            <h3 className="system-title">SYSTEM PROCESS:</h3>
            <ul className="system-list">
              <li>• Verification email sent automatically</li>
              <li>• Account activated upon link click</li>
              <li>• User redirected to dashboard after verification</li>
            </ul>
          </div>

          <Link to="/login-provider" className="back-link">Back to login</Link>
        </div>
      </main>
    </>
  )
}

export default VerifyEmailProvider

