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
    <nav className="bg-nav-dark px-8 py-3 flex justify-between items-center border-b-2 border-primary">
      <div>
        <span className="text-white text-sm font-semibold tracking-wide border-2 border-white px-3 py-1.5">
          WIREFRAME PROTOTYPE
        </span>
      </div>
      <div className="flex gap-2">
        <button 
          className={`bg-transparent text-white border border-white/30 px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-primary hover:bg-secondary hover:border-secondary ${
            isActive('auth') ? 'bg-primary border-primary' : ''
          }`}
          onClick={() => handleNavClick('/auth-registration')}
        >
          Auth/Registration
        </button>
        <button 
          className="bg-transparent text-white border border-white/30 px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-primary hover:bg-secondary hover:border-secondary"
          title="Under development"
          onClick={() => {}}
        >
          Customer Interface
        </button>
        <button 
          className="bg-transparent text-white border border-white/30 px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-primary hover:bg-secondary hover:border-secondary"
          title="Under development"
          onClick={() => {}}
        >
          Provider Interface
        </button>
        <button 
          className={`bg-transparent text-white border border-white/30 px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-primary hover:bg-secondary hover:border-secondary ${
            isActive('admin') ? 'bg-primary border-primary' : ''
          }`}
          onClick={() => handleNavClick('/admin-panel')}
        >
          Admin Panel
        </button>
      </div>
    </nav>
  )
}

export default TopNav

