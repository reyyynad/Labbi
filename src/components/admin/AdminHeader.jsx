import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserEmail, getUserName, logout } from '../../utils/auth'
import logoPath from '../../assets/images/labbi_logo.svg'
import { LayoutDashboard, Users, Layers, BarChart3, LogOut } from 'lucide-react'

const navLinks = [
  { label: 'Dashboard', path: '/admin-panel', icon: LayoutDashboard },
  { label: 'Users', path: '/admin-users', icon: Users },
  { label: 'Services', path: '/admin-services', icon: Layers },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 }
]

const getInitials = (name, email) => {
  if (name) {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0].substring(0, 2).toUpperCase()
  }
  if (email) {
    const prefix = email.split('@')[0]
    const segments = prefix.split('.')
    if (segments.length >= 2) {
      return `${segments[0][0]}${segments[1][0]}`.toUpperCase()
    }
    return prefix.substring(0, 2).toUpperCase()
  }
  return 'AD'
}

function AdminHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Admin')
  const [userEmail, setUserEmail] = useState('')
  const [userInitials, setUserInitials] = useState('AD')

  useEffect(() => {
    const name = getUserName()
    const email = getUserEmail()
    if (name) setUserName(name)
    if (email) setUserEmail(email)
    setUserInitials(getInitials(name, email))
  }, [])

  const handleLogout = () => {
    logout(navigate)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-[#1e3a8a] text-white shadow-md py-4 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
            <img
              src={logoPath}
              alt="Labbi Logo"
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.parentElement.innerHTML = '<span class="text-white font-bold text-4xl">لبِّ</span>'
              }}
            />
          </div>
          <div className="hidden md:flex flex-col text-xs">
            <span className="font-semibold text-white">
              {userName || 'Admin'}
            </span>
            {userEmail && <span className="text-white/70">{userEmail}</span>}
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
          {navLinks.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`text-white hover:text-gray-200 inline-flex items-center gap-1 ${
                isActive(path) ? 'border-b-2 border-white pb-1' : ''
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-semibold"
            title={userName || 'Admin'}
          >
            {userInitials}
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-white/40 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

