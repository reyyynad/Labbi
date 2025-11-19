import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminPanel() {
  return (
    <>
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-page-title">Admin Dashboard</h1>
          <p className="admin-subtitle">System overview and key metrics</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <p className="stat-number">12,487</p>
                <p className="stat-label">Total Users</p>
                <small className="stat-detail">8,234 clients | 4,253 providers</small>
              </div>
              <div className="stat-badge positive">+24 today</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <p className="stat-number">3,842</p>
                <p className="stat-label">Active Services</p>
                <small className="stat-detail">15 pending approval</small>
              </div>
              <div className="stat-badge pending">+15 pending</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <p className="stat-number">24,891</p>
                <p className="stat-label">Total Bookings</p>
                <small className="stat-detail">This month</small>
              </div>
              <div className="stat-badge positive">+18%</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <p className="stat-number">148K SAR</p>
                <p className="stat-label">Revenue</p>
                <small className="stat-detail">This month</small>
              </div>
              <div className="stat-badge positive">+22%</div>
            </div>
          </div>

          <div className="admin-sections">
            <div className="admin-section">
              <div className="section-header">
                <h2 className="section-title">Pending Service Approvals</h2>
                <span className="badge">15 Pending</span>
              </div>
              
              <div className="approval-list">
                <div className="approval-item">
                  <div className="approval-info">
                    <h4>Advanced Web Development</h4>
                    <p className="approval-author">by Renad Elsafi</p>
                    <p className="approval-meta">Web Development • Submitted Oct 10, 2025</p>
                  </div>
                  <div className="approval-actions">
                    <button className="btn-icon btn-review">👁 Review</button>
                    <button className="btn-icon btn-approve">✓ Approve</button>
                    <button className="btn-icon btn-reject">✕ Reject</button>
                  </div>
                </div>

                <div className="approval-item">
                  <div className="approval-info">
                    <h4>Brand Strategy Consulting</h4>
                    <p className="approval-author">by Renad Elsafi</p>
                    <p className="approval-meta">Marketing • Submitted Oct 11, 2025</p>
                  </div>
                  <div className="approval-actions">
                    <button className="btn-icon btn-review">👁 Review</button>
                    <button className="btn-icon btn-approve">✓ Approve</button>
                    <button className="btn-icon btn-reject">✕ Reject</button>
                  </div>
                </div>

                <div className="approval-item">
                  <div className="approval-info">
                    <h4>Brand Strategy Consulting</h4>
                    <p className="approval-author">by Renad Elsafi</p>
                    <p className="approval-meta">Marketing • Submitted Oct 11, 2025</p>
                  </div>
                  <div className="approval-actions">
                    <button className="btn-icon btn-review">👁 Review</button>
                    <button className="btn-icon btn-approve">✓ Approve</button>
                    <button className="btn-icon btn-reject">✕ Reject</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-section">
              <div className="section-header">
                <h2 className="section-title">Recent User Activity</h2>
              </div>
              
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon user-icon">B</div>
                  <div className="activity-info">
                    <p className="activity-user">Bana Jaber</p>
                    <p className="activity-action">New client registration</p>
                    <small className="activity-time">5 minutes ago</small>
                  </div>
                  <span className="activity-badge customer">customer</span>
                </div>

                <div className="activity-item">
                  <div className="activity-icon user-icon">A</div>
                  <div className="activity-info">
                    <p className="activity-user">Adel Hassan</p>
                    <p className="activity-action">Service booking completed</p>
                    <small className="activity-time">12 minutes ago</small>
                  </div>
                  <span className="activity-badge booking">booking</span>
                </div>

                <div className="activity-item">
                  <div className="activity-icon user-icon">S</div>
                  <div className="activity-info">
                    <p className="activity-user">Shatha Alharbi</p>
                    <p className="activity-action">New provider application</p>
                    <small className="activity-time">23 minutes ago</small>
                  </div>
                  <span className="activity-badge provider">provider</span>
                </div>

                <div className="activity-item">
                  <div className="activity-icon user-icon">R</div>
                  <div className="activity-info">
                    <p className="activity-user">Rana Adel</p>
                    <p className="activity-action">Service review posted</p>
                    <small className="activity-time">1 hour ago</small>
                  </div>
                  <span className="activity-badge review">review</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-info-box">
            <h3 className="info-title">ADMIN DASHBOARD FEATURES:</h3>
            <ul className="info-list">
              <li>• Real-time system metrics and KPIs</li>
              <li>• Service approval and moderation system</li>
              <li>• User activity monitoring</li>
              <li>• Quick access to key admin functions</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminPanel

