import React, { useState, useEffect } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import { adminAPI } from '../../services/api'

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days')
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const periods = ['Last 30 Days', 'Last Quarter', 'Last Year', 'Custom']

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const periodMap = {
          'Last 30 Days': '30',
          'Last Quarter': '90',
          'Last Year': '365',
          'Custom': '30'
        }
        const days = periodMap[selectedPeriod] || '30'
        const response = await adminAPI.getAnalytics(days)
        
        if (response.success) {
          setAnalyticsData(response.data)
        }
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err.message || 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [selectedPeriod])

  return (
    <>
      <AdminHeader />
      <main className="admin-main" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
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

          {loading && (
            <div className="text-center py-12">
              <p className="text-[#6b7280]">Loading analytics data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {!loading && !error && analyticsData && (
            <>
              <div className="analytics-grid">
                <div className="chart-card">
                  <h3 className="chart-title">Revenue Growth</h3>
                  <div className="chart-placeholder">
                    {analyticsData.revenue?.monthly && analyticsData.revenue.monthly.length > 0 ? (
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', justifyContent: 'center' }}>
                          {analyticsData.revenue.monthly.slice(-6).map((item, index) => {
                            const maxValue = Math.max(...analyticsData.revenue.monthly.map(r => r.value), 1)
                            const height = (item.value / maxValue) * 100
                            return (
                              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div
                                  style={{
                                    width: '30px',
                                    height: `${Math.max(height, 5)}px`,
                                    backgroundColor: index >= analyticsData.revenue.monthly.length - 2 ? '#047857' : '#1e3a8a',
                                    borderRadius: '4px 4px 0 0'
                                  }}
                                />
                                <span style={{ fontSize: '9px', color: '#9ca3af' }}>
                                  {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        <p className="chart-label" style={{ marginTop: '10px', textAlign: 'center' }}>
                          Revenue: SR{analyticsData.revenue.period.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="chart-label">No revenue data available</p>
                    )}
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-title">User Registration</h3>
                  <div className="chart-placeholder">
                    {analyticsData.users?.byMonth && analyticsData.users.byMonth.length > 0 ? (
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', justifyContent: 'center' }}>
                          {analyticsData.users.byMonth.slice(-6).map((item, index) => {
                            const maxValue = Math.max(...analyticsData.users.byMonth.map(u => u.value), 1)
                            const height = (item.value / maxValue) * 100
                            return (
                              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div
                                  style={{
                                    width: '40px',
                                    height: `${Math.max(height, 5)}px`,
                                    backgroundColor: '#065f46',
                                    borderRadius: '4px 4px 0 0'
                                  }}
                                />
                                <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>
                                  {item.value}
                                </span>
                                <span style={{ fontSize: '9px', color: '#9ca3af' }}>
                                  {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        <p className="chart-label" style={{ marginTop: '10px', textAlign: 'center' }}>
                          Total: {analyticsData.users.byMonth.reduce((sum, item) => sum + item.value, 0)} users
                        </p>
                      </div>
                    ) : (
                      <p className="chart-label">No user data available</p>
                    )}
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-title">Service Categories</h3>
                  <div className="chart-placeholder">
                    {analyticsData.services?.byCategory && analyticsData.services.byCategory.length > 0 ? (
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {analyticsData.services.byCategory.slice(0, 5).map((item, index) => {
                            const total = analyticsData.services.byCategory.reduce((sum, cat) => sum + cat.count, 0)
                            const percentage = total > 0 ? (item.count / total * 100).toFixed(0) : 0
                            const colors = ['#1e3a8a', '#047857', '#065f46', '#92400e', '#9d174d']
                            return (
                              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '60px', fontSize: '12px', textTransform: 'capitalize' }}>
                                  {item.category}
                                </div>
                                <div style={{ flex: 1, height: '20px', backgroundColor: '#e5e7eb', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                                  <div
                                    style={{
                                      width: `${percentage}%`,
                                      height: '100%',
                                      backgroundColor: colors[index % colors.length],
                                      transition: 'width 0.3s'
                                    }}
                                  />
                                </div>
                                <div style={{ width: '40px', fontSize: '12px', textAlign: 'right' }}>
                                  {item.count}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <p className="chart-label">No service data available</p>
                    )}
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-title">Booking Trends</h3>
                  <div className="chart-placeholder">
                    {analyticsData.bookings?.byMonth && analyticsData.bookings.byMonth.length > 0 ? (
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', justifyContent: 'center' }}>
                          {analyticsData.bookings.byMonth.slice(-6).map((item, index) => {
                            const maxValue = Math.max(...analyticsData.bookings.byMonth.map(b => b.value), 1)
                            const height = (item.value / maxValue) * 100
                            return (
                              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div
                                  style={{
                                    width: '30px',
                                    height: `${Math.max(height, 5)}px`,
                                    backgroundColor: '#047857',
                                    borderRadius: '4px 4px 0 0',
                                    opacity: 0.8
                                  }}
                                />
                                <span style={{ fontSize: '9px', color: '#9ca3af' }}>
                                  {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        <p className="chart-label" style={{ marginTop: '10px', textAlign: 'center' }}>
                          Total: {analyticsData.bookings.byMonth.reduce((sum, item) => sum + item.value, 0)} bookings
                        </p>
                      </div>
                    ) : (
                      <p className="chart-label">No booking data available</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="insights-section">
                <h2 className="section-title">Key Insights</h2>
                <div className="insights-grid">
                  <div className="insight-card">
                    <p className="insight-metric">{analyticsData.insights?.userGrowth || '+0%'}</p>
                    <p className="insight-label">User Growth (MoM)</p>
                  </div>
                  <div className="insight-card">
                    <p className="insight-metric">
                      {analyticsData.insights?.monthlyRevenue 
                        ? `${(analyticsData.insights.monthlyRevenue / 1000).toFixed(0)}K`
                        : '0K'}
                    </p>
                    <p className="insight-label">Monthly Revenue (SR)</p>
                  </div>
                  <div className="insight-card">
                    <p className="insight-metric">{analyticsData.insights?.avgRating || '0.0'}</p>
                    <p className="insight-label">Avg Service Rating</p>
                  </div>
                </div>
              </div>
            </>
          )}


        </div>
      </main>
    </>
  )
}

export default Analytics

