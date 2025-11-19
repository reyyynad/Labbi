import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserName, getUserEmail, logout } from '../../utils/auth'
import { LogOut } from 'lucide-react'

function AdminHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userInitials, setUserInitials] = useState('AD')

  const handleLogout = () => {
    logout(navigate)
  }

  useEffect(() => {
    const name = getUserName()
    const email = getUserEmail()
    
    if (name) {
      // Extract initials from full name
      const nameParts = name.trim().split(' ')
      if (nameParts.length >= 2) {
        const firstInitial = nameParts[0].charAt(0).toUpperCase()
        const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        setUserInitials(firstInitial + lastInitial)
      } else if (nameParts.length === 1) {
        // If only one name, use first two letters
        const nameStr = nameParts[0]
        setUserInitials(nameStr.substring(0, 2).toUpperCase())
      }
    } else if (email) {
      // Fallback to email initials
      const emailParts = email.split('@')[0].split('.')
      if (emailParts.length >= 2) {
        setUserInitials(
          emailParts[0].charAt(0).toUpperCase() + 
          emailParts[1].charAt(0).toUpperCase()
        )
      } else {
        setUserInitials(email.substring(0, 2).toUpperCase())
      }
    }
  }, [])

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="admin-header">
      <div className="admin-brand">
        <div className="admin-icon">A</div>
        <span className="admin-title">Admin Panel</span>
      </div>
      <nav className="admin-nav">
        <Link to="/admin-panel" className={`admin-link ${isActive('/admin-panel')}`}>
          Dashboard
        </Link>
        <Link to="/admin-users" className={`admin-link ${isActive('/admin-users')}`}>
          Users
        </Link>
        <Link to="/admin-services" className={`admin-link ${isActive('/admin-services')}`}>
          Services
        </Link>
        <Link to="/analytics" className={`admin-link ${isActive('/analytics')}`}>
          Analytics
        </Link>
      </nav>
      <div className="admin-header-actions">
        <button className="btn-user-avatar" title={getUserName() || 'Admin'}>
          {userInitials}
        </button>
        <button 
          onClick={handleLogout}
          className="btn-logout-admin"
          title="Logout"
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  )
}

export default AdminHeader

