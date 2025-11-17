import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminPanel() {
  const navigate = useNavigate()
  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-light relative">
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold text-text mb-2">Admin Dashboard</h1>
            <p className="text-base text-text mb-8">Overview of platform performance and metrics</p>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-light rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M2 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5M13 16c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-text m-0">2,543</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">12%</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <rect x="4" y="4" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M6 8h8M6 11h6" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Active Services</p>
                    <p className="text-3xl font-bold text-gray-800 m-0">487</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">8%</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3l14 14M3 17V3h14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M5 14l3-3 2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
                  <span className="text-sm font-semibold">23%</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v16M6 6l4-4 4 4M6 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800 m-0">$45,230</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 16V4M4 10l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">3%</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity - Left Column */}
              <div className="lg:col-span-2">
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-text mb-6">Recent Activity</h2>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 p-4 bg-light rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-semibold flex-shrink-0">
                        B
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text m-0">Bana Jaber</p>
                        <p className="text-sm text-gray-500 m-1">New client registration</p>
                        <small className="text-xs text-gray-400">5 minutes ago</small>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold flex-shrink-0">
                        A
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 m-0">Adel Hassan</p>
                        <p className="text-sm text-gray-500 m-1">Service booking completed</p>
                        <small className="text-xs text-gray-400">12 minutes ago</small>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold flex-shrink-0">
                        S
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 m-0">Shatha Alharbi</p>
                        <p className="text-sm text-gray-500 m-1">New provider application</p>
                        <small className="text-xs text-gray-400">23 minutes ago</small>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold flex-shrink-0">
                        R
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 m-0">Rana Adel</p>
                        <p className="text-sm text-gray-500 m-1">Service review posted</p>
                        <small className="text-xs text-gray-400">1 hour ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Right Column */}
              <div className="lg:col-span-1">
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-text mb-6">Quick Actions</h2>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => navigate('/admin-users')}
                      className="w-full py-3 px-4 bg-secondary text-white rounded-lg font-medium hover:bg-highlight transition-colors text-left cursor-pointer"
                    >
                      Manage Users
                    </button>
                    <button 
                      onClick={() => navigate('/admin-services')}
                      className="w-full py-3 px-4 bg-secondary text-white rounded-lg font-medium hover:bg-highlight transition-colors text-left cursor-pointer"
                    >
                      Review Services
                    </button>
                    <button 
                      onClick={() => navigate('/analytics')}
                      className="w-full py-3 px-4 bg-secondary text-white rounded-lg font-medium hover:bg-highlight transition-colors text-left cursor-pointer"
                    >
                      View Analytics
                    </button>
                    <button className="w-full py-3 px-4 bg-light text-text border-2 border-gray-200 rounded-lg font-medium hover:bg-light/80 transition-colors text-left cursor-pointer">
                      Generate Report
                    </button>
                    <button className="w-full py-3 px-4 bg-light text-text border-2 border-gray-200 rounded-lg font-medium hover:bg-light/80 transition-colors text-left cursor-pointer">
                      Platform Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards at Bottom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text mb-4">Pending Approvals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text">New Services</span>
                    <span className="text-lg font-bold text-yellow-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Provider Requests</span>
                    <span className="text-lg font-bold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Refund Requests</span>
                    <span className="text-lg font-bold text-yellow-600">3</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">This Month</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Customers</span>
                    <span className="text-lg font-bold text-text">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Providers</span>
                    <span className="text-lg font-bold text-gray-800">67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed Bookings</span>
                    <span className="text-lg font-bold text-gray-800">891</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Health</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <span className="text-lg font-bold text-green-600">2.3 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Satisfaction</span>
                    <span className="text-lg font-bold text-green-600">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">System Uptime</span>
                    <span className="text-lg font-bold text-green-600">99.9%</span>
                  </div>
                </div>
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

export default AdminPanel

