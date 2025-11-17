import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function Analytics() {
  // Revenue data for area chart (Jan to Nov)
  const revenueData = [28000, 30000, 35000, 32000, 38000, 42000, 45000, 48000, 50000, 50000, 48000]
  const maxRevenue = 60000
  
  // Bookings data for bar chart (Jan to Nov)
  const bookingsData = [120, 145, 165, 145, 175, 195, 205, 195, 215, 235, 185]
  const maxBookings = 240

  // Tooltip state
  const [revenueTooltip, setRevenueTooltip] = useState({ show: false, month: '', value: 0, x: 0, y: 0 })
  const [bookingsTooltip, setBookingsTooltip] = useState({ show: false, month: '', value: 0, x: 0, y: 0 })

  // Service categories data
  const serviceCategories = [
    { name: 'Home Services', bookings: 534 },
    { name: 'Professional Services', bookings: 412 },
    { name: 'Health & Wellness', bookings: 378 },
    { name: 'Education & Training', bookings: 289 },
    { name: 'Creative Services', bookings: 279 }
  ]
  const maxBookingsCategory = 534

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-light relative">
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold text-text mb-2">Analytics Dashboard</h1>
            <p className="text-base text-text mb-8">Detailed insights and performance metrics</p>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-light rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">$</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-text m-0">$45,230</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">+23% from last month</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="4" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M3 8h14M7 4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-800 m-0">1,892</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">+18% from last month</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="13" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M2 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5M13 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Active Users</p>
                    <p className="text-3xl font-bold text-gray-800 m-0">2,543</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">+12% from last month</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <path d="M3 15L7 10L11 12L17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Avg. Booking Value</p>
                    <p className="text-3xl font-bold text-gray-800 m-0">$95</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">+8% from last month</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trend Chart */}
              <div className="bg-background rounded-lg p-6 shadow-sm relative">
                <h3 className="text-lg font-semibold text-text mb-6">Revenue Trend</h3>
                <div className="relative h-64">
                  <svg 
                    className="w-full h-full" 
                    viewBox="0 0 600 200" 
                    preserveAspectRatio="none"
                    onMouseLeave={() => setRevenueTooltip({ show: false, month: '', value: 0, x: 0, y: 0 })}
                  >
                    {/* Grid lines */}
                    {[0, 15000, 30000, 45000, 60000].map((val, i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={180 - (val / maxRevenue) * 160}
                        x2="580"
                        y2={180 - (val / maxRevenue) * 160}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    ))}
                    {/* Y-axis labels */}
                    {[0, 15000, 30000, 45000, 60000].map((val, i) => (
                      <text
                        key={i}
                        x="35"
                        y={185 - (val / maxRevenue) * 160}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="end"
                      >
                        {val.toLocaleString()}
                      </text>
                    ))}
                    {/* Area fill */}
                    <path
                      d={`M 40 ${180 - (revenueData[0] / maxRevenue) * 160} ${revenueData.map((val, i) => `L ${40 + (i * 540) / 10} ${180 - (val / maxRevenue) * 160}`).join(' ')} L ${40 + (540)} ${180} L 40 ${180} Z`}
                      fill="#065f46"
                      fillOpacity="0.2"
                    />
                    {/* Line */}
                    <path
                      d={`M 40 ${180 - (revenueData[0] / maxRevenue) * 160} ${revenueData.map((val, i) => `L ${40 + (i * 540) / 10} ${180 - (val / maxRevenue) * 160}`).join(' ')}`}
                      stroke="#047857"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Data points with hover areas */}
                    {revenueData.map((val, i) => {
                      const x = 40 + (i * 540) / 10
                      const y = 180 - (val / maxRevenue) * 160
                      return (
                        <g key={i}>
                          {/* Invisible hover area */}
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(e) => {
                              const container = e.currentTarget.closest('.relative')
                              if (container) {
                                const rect = container.getBoundingClientRect()
                                setRevenueTooltip({
                                  show: true,
                                  month: months[i],
                                  value: val,
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top
                                })
                              }
                            }}
                            onMouseMove={(e) => {
                              const container = e.currentTarget.closest('.relative')
                              if (container) {
                                const rect = container.getBoundingClientRect()
                                setRevenueTooltip({
                                  show: true,
                                  month: months[i],
                                  value: val,
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top
                                })
                              }
                            }}
                          />
                          {/* Visible point (only when hovered) */}
                          {revenueTooltip.show && revenueTooltip.month === months[i] && (
                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              fill="white"
                              stroke="#065f46"
                              strokeWidth="2"
                            />
                          )}
                        </g>
                      )
                    })}
                    {/* X-axis labels */}
                    {months.map((month, i) => (
                      <text
                        key={i}
                        x={40 + (i * 540) / 10}
                        y="195"
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        {month}
                      </text>
                    ))}
                  </svg>
                  {/* Tooltip */}
                  {revenueTooltip.show && (
                    <div
                      className="absolute bg-white rounded-lg shadow-lg p-3 border border-gray-200 pointer-events-none z-10"
                      style={{
                        left: `${revenueTooltip.x + 10}px`,
                        top: `${revenueTooltip.y - 50}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="text-sm font-semibold text-text">{revenueTooltip.month}</div>
                      <div className="text-sm text-secondary">revenue : {revenueTooltip.value.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bookings Trend Chart */}
              <div className="bg-background rounded-lg p-6 shadow-sm relative">
                <h3 className="text-lg font-semibold text-text mb-6">Bookings Trend</h3>
                <div className="relative h-64 bg-light rounded-lg p-4">
                  <svg 
                    className="w-full h-full" 
                    viewBox="0 0 600 200" 
                    preserveAspectRatio="none"
                    onMouseLeave={() => setBookingsTooltip({ show: false, month: '', value: 0, x: 0, y: 0 })}
                  >
                    {/* Grid lines */}
                    {[0, 60, 120, 180, 240].map((val, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1={180 - (val / maxBookings) * 160}
                        x2="580"
                        y2={180 - (val / maxBookings) * 160}
                        stroke="#d1fae5"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    ))}
                    {/* Y-axis labels */}
                    {[0, 60, 120, 180, 240].map((val, i) => (
                      <text
                        key={i}
                        x="35"
                        y={185 - (val / maxBookings) * 160}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="end"
                      >
                        {val}
                      </text>
                    ))}
                    {/* Bars */}
                    {bookingsData.map((val, i) => {
                      const barHeight = (val / maxBookings) * 160
                      const barWidth = 35
                      const spacing = 49
                      const startX = 60
                      const barX = startX + (i * spacing) - barWidth / 2
                      const isHovered = bookingsTooltip.show && bookingsTooltip.month === months[i]
                      return (
                        <g key={i}>
                          {/* Bar with rounded top */}
                          <rect
                            x={barX}
                            y={180 - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill="#065f46"
                            rx="3"
                            ry="3"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(e) => {
                              const container = e.currentTarget.closest('.relative')
                              if (container) {
                                const rect = container.getBoundingClientRect()
                                setBookingsTooltip({
                                  show: true,
                                  month: months[i],
                                  value: val,
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top
                                })
                              }
                            }}
                            onMouseMove={(e) => {
                              const container = e.currentTarget.closest('.relative')
                              if (container) {
                                const rect = container.getBoundingClientRect()
                                setBookingsTooltip({
                                  show: true,
                                  month: months[i],
                                  value: val,
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top
                                })
                              }
                            }}
                          />
                          {/* Hover overlay */}
                          {isHovered && (
                            <rect
                              x={barX}
                              y={180 - barHeight}
                              width={barWidth}
                              height={barHeight}
                              fill="rgba(0, 0, 0, 0.1)"
                              rx="3"
                              ry="3"
                            />
                          )}
                        </g>
                      )
                    })}
                    {/* X-axis labels */}
                    {months.map((month, i) => {
                      const spacing = 49
                      const startX = 60
                      const labelX = startX + (i * spacing)
                      return (
                        <text
                          key={i}
                          x={labelX}
                          y="195"
                          fontSize="10"
                          fill="#6b7280"
                          textAnchor="middle"
                        >
                          {month}
                        </text>
                      )
                    })}
                  </svg>
                  {/* Tooltip */}
                  {bookingsTooltip.show && (
                    <div
                      className="absolute bg-white rounded-lg shadow-lg p-3 border border-gray-200 pointer-events-none z-10"
                      style={{
                        left: `${bookingsTooltip.x + 10}px`,
                        top: `${bookingsTooltip.y - 50}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="text-sm font-semibold text-secondary">{bookingsTooltip.month}</div>
                      <div className="text-sm text-secondary">bookings : {bookingsTooltip.value}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Service Categories */}
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text mb-6">Top Service Categories</h3>
              <div className="space-y-4">
                {serviceCategories.map((category, index) => {
                  const percentage = (category.bookings / maxBookingsCategory) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-text">{category.name}</span>
                        <span className="text-sm text-text">{category.bookings} bookings</span>
                      </div>
                      <div className="w-full bg-light rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-secondary h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>

        {/* Help icon in bottom right */}
        <button className="fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg hover:bg-highlight transition-colors cursor-pointer z-50">
          ?
        </button>
      </div>
    </>
  )
}

export default Analytics

