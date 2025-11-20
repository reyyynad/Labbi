import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserEmail, getUserName, logout } from '../../utils/auth'

function ProviderDashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Provider')
  const [userEmail, setUserEmail] = useState('provider@example.com')

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
          <a href="#" className="nav-link">My Services</a>
          <a href="#" className="nav-link">Bookings</a>
          <a href="#" className="nav-link">Calendar</a>
          <a href="#" className="nav-link">Reviews</a>
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
          <h1 className="dashboard-title">Provider Dashboard</h1>
          <p className="dashboard-subtitle">Manage your services and bookings</p>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3>Total Bookings</h3>
              <p className="card-number">0</p>
              <p className="card-label">This month</p>
              <button className="btn-card">View Details</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">💰</div>
              <h3>Revenue</h3>
              <p className="card-number">0 SR</p>
              <p className="card-label">This month</p>
              <button className="btn-card">View Report</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⭐</div>
              <h3>Rating</h3>
              <p className="card-number">5.0</p>
              <p className="card-label">Average rating</p>
              <button className="btn-card">View Reviews</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📝</div>
              <h3>Active Services</h3>
              <p className="card-number">0</p>
              <p className="card-label">Listed services</p>
              <button className="btn-card btn-primary">Add Service</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProviderDashboard

