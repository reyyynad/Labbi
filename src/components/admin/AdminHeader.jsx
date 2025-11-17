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
    return location.pathname === path
  }

  return (
    <header className="bg-primary px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="3" width="12" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4" y="8" width="12" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4" y="13" width="12" height="4" rx="0.5" fill="currentColor"/>
        </svg>
        <span className="text-xl font-bold text-white">Labbi <span className="font-arabic">لبِّ</span></span>
      </div>
      <nav className="flex gap-1">
        <Link 
          to="/admin-panel" 
          className={`flex items-center gap-2 no-underline font-medium py-2 px-4 rounded transition-all duration-300 ${
            isActive('/admin-panel') 
              ? 'bg-highlight text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 8v4M10 6v6M13 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Dashboard
        </Link>
        <Link 
          to="/admin-users" 
          className={`flex items-center gap-2 no-underline font-medium py-2 px-4 rounded transition-all duration-300 ${
            isActive('/admin-users') 
              ? 'bg-highlight text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5M13 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          Users
        </Link>
        <Link 
          to="/admin-services" 
          className={`flex items-center gap-2 no-underline font-medium py-2 px-4 rounded transition-all duration-300 ${
            isActive('/admin-services') 
              ? 'bg-highlight text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <rect x="4" y="3" width="12" height="4" rx="0.5" fill="currentColor"/>
            <rect x="4" y="8" width="12" height="4" rx="0.5" fill="currentColor"/>
            <rect x="4" y="13" width="12" height="4" rx="0.5" fill="currentColor"/>
          </svg>
          Services
        </Link>
        <Link 
          to="/analytics" 
          className={`flex items-center gap-2 no-underline font-medium py-2 px-4 rounded transition-all duration-300 ${
            isActive('/analytics') 
              ? 'bg-highlight text-white' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 8v4M10 6v6M13 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Analytics
        </Link>
      </nav>
    </header>
  )
}

export default AdminHeader

