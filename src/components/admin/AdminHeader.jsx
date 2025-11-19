import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getUserName, getUserEmail } from '../../utils/auth'

function AdminHeader() {
  const location = useLocation()
  const [userInitials, setUserInitials] = useState('AD')

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
        <button className="btn-user-avatar" title="Settings">
          {userInitials}
        </button>
      </div>
    </header>
  )
}

export default AdminHeader

