import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === 'auth' && (location.pathname.includes('auth') || location.pathname.includes('signup') || location.pathname.includes('login') || location.pathname.includes('verify'))) {
      return 'active'
    }
    if (path === 'customer' && location.pathname.includes('customer')) {
      return 'active'
    }
    if (path === 'provider' && location.pathname.includes('provider')) {
      return 'active'
    }
    if (path === 'admin' && (location.pathname.includes('admin') || location.pathname.includes('analytics'))) {
      return 'active'
    }
    return ''
  }

  const handleNavClick = (path) => {
    navigate(path)
  }

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <span className="wireframe-label">WIREFRAME PROTOTYPE</span>
      </div>
      <div className="nav-right">
        <button 
          className={`nav-btn ${isActive('auth')}`}
          onClick={() => handleNavClick('/auth-registration')}
        >
          Auth/Registration
        </button>
        <button 
          className="nav-btn"
          title="Under development"
          onClick={() => {}}
        >
          Customer Interface
        </button>
        <button 
          className="nav-btn"
          title="Under development"
          onClick={() => {}}
        >
          Provider Interface
        </button>
        <button 
          className={`nav-btn ${isActive('admin')}`}
          onClick={() => handleNavClick('/admin-panel')}
        >
          Admin Panel
        </button>
      </div>
    </nav>
  )
}

export default TopNav

