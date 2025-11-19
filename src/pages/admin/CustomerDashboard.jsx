import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserEmail, getUserName, logout } from '../../utils/auth'

function CustomerDashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Customer')
  const [userEmail, setUserEmail] = useState('customer@example.com')

  useEffect(() => {
    const email = getUserEmail()
    const name = getUserName()
    if (email) setUserEmail(email)
    if (name) setUserName(name)
  }, [])

  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="logo">
          <div className="logo-icon">L</div>
          <span className="logo-text">Labbi - لبِّ</span>
        </div>
        <nav className="dashboard-nav">
          <a href="#" className="nav-link">Browse Services</a>
          <a href="#" className="nav-link">My Bookings</a>
          <a href="#" className="nav-link">Favorites</a>
          <a href="#" className="nav-link">Messages</a>
        </nav>
        <div className="user-menu">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-email">{userEmail}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Welcome Back!</h1>
          <p className="dashboard-subtitle">Find and book services from verified providers</p>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">📅</div>
              <h3>My Bookings</h3>
              <p className="card-number">0</p>
              <p className="card-label">Active bookings</p>
              <button className="btn-card">View All</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⭐</div>
              <h3>Favorites</h3>
              <p className="card-number">0</p>
              <p className="card-label">Saved providers</p>
              <button className="btn-card">Browse</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">💬</div>
              <h3>Messages</h3>
              <p className="card-number">0</p>
              <p className="card-label">Unread messages</p>
              <button className="btn-card">Check Messages</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🔍</div>
              <h3>Find Services</h3>
              <p>Discover thousands of verified service providers</p>
              <button className="btn-card btn-primary">Browse Now</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CustomerDashboard

