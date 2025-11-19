import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days')

  const periods = ['Last 30 Days', 'Last Quarter', 'Last Year', 'Custom']

  return (
    <>
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-page-title">Analytics & Insights</h1>
          <p className="admin-subtitle">Platform performance and trends</p>

          <div className="time-filters">
            {periods.map(period => (
              <button 
                key={period}
                className={`time-btn ${selectedPeriod === period ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="analytics-grid">
            <div className="chart-card">
              <h3 className="chart-title">Revenue Growth</h3>
              <div className="chart-placeholder">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="5" y="30" width="8" height="20" fill="#1e3a8a"/>
                  <rect x="17" y="20" width="8" height="30" fill="#1e3a8a"/>
                  <rect x="29" y="25" width="8" height="25" fill="#047857"/>
                  <rect x="41" y="15" width="8" height="35" fill="#047857"/>
                </svg>
                <p className="chart-label">Line Chart: Revenue over time</p>
              </div>
            </div>

            <div className="chart-card">
              <h3 className="chart-title">User Registration</h3>
              <div className="chart-placeholder">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="5" y="35" width="12" height="20" fill="#065f46"/>
                  <rect x="20" y="25" width="12" height="30" fill="#065f46"/>
                  <rect x="35" y="30" width="12" height="25" fill="#065f46"/>
                </svg>
                <p className="chart-label">Bar Chart: New users per month</p>
              </div>
            </div>

            <div className="chart-card">
              <h3 className="chart-title">Service Categories</h3>
              <div className="chart-placeholder">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="25" stroke="#1e3a8a" strokeWidth="8" fill="none" strokeDasharray="50 100"/>
                  <circle cx="30" cy="30" r="25" stroke="#047857" strokeWidth="8" fill="none" strokeDasharray="30 120" transform="rotate(72 30 30)"/>
                  <circle cx="30" cy="30" r="25" stroke="#065f46" strokeWidth="8" fill="none" strokeDasharray="20 130" transform="rotate(144 30 30)"/>
                </svg>
                <p className="chart-label">Pie Chart: Services by category</p>
              </div>
            </div>

            <div className="chart-card">
              <h3 className="chart-title">Booking Trends</h3>
              <div className="chart-placeholder">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M5 50 L15 40 L25 45 L35 30 L45 35 L55 25" stroke="#047857" strokeWidth="3" fill="none"/>
                  <path d="M5 50 L15 40 L25 45 L35 30 L45 35 L55 25 L55 55 L5 55 Z" fill="#047857" opacity="0.2"/>
                </svg>
                <p className="chart-label">Area Chart: Bookings over time</p>
              </div>
            </div>
          </div>

          <div className="insights-section">
            <h2 className="section-title">Key Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <p className="insight-metric">+24%</p>
                <p className="insight-label">User Growth (MoM)</p>
              </div>
              <div className="insight-card">
                <p className="insight-metric">148K</p>
                <p className="insight-label">Monthly Revenue</p>
              </div>
              <div className="insight-card">
                <p className="insight-metric">4.7</p>
                <p className="insight-label">Avg Service Rating</p>
              </div>
            </div>
          </div>

          <div className="admin-info-box">
            <h3 className="info-title">ANALYTICS FEATURES:</h3>
            <ul className="info-list">
              <li>• Real-time data visualization</li>
              <li>• Custom date range selection</li>
              <li>• Export reports (CSV, PDF)</li>
              <li>• Trend analysis and forecasting</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default Analytics

