import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 8

  const allUsers = [
    { name: 'Bana Jaber', email: 'rana@example.com', type: 'Client', status: 'Active', joinDate: 'Sep 15, 2025', activity: '12 bookings', avatar: 'BJ' },
    { name: 'Arwa Aldawoud', email: 'arwa@example.com', type: 'Provider', status: 'Active', joinDate: 'Aug 22, 2025', activity: '89 bookings', avatar: 'AA' },
    { name: 'Sarah Mohammed', email: 'sarah@example.com', type: 'Provider', status: 'Pending', joinDate: 'Oct 10, 2025', activity: '0 bookings', avatar: 'SM' },
    { name: 'Yaser Abdullah', email: 'yaser@example.com', type: 'Client', status: 'Suspended', joinDate: 'Jul 05, 2025', activity: '3 bookings', avatar: 'YA' }
  ]

  // Filter users based on search term and filters
  const filteredUsers = allUsers.filter(user => {
    // Search filter - check name and email
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    // User type filter
    const matchesType = !userTypeFilter || user.type === userTypeFilter
    
    // Status filter
    const matchesStatus = !statusFilter || user.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-light relative">
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold text-text mb-2">User Management</h1>
            <p className="text-base text-text mb-8">Manage all platform users and their permissions</p>

            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-[300px]">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input 
                  type="text" 
                  className="w-full py-3 pl-12 pr-4 border-2 border-emerald-200 rounded-lg font-primary focus:outline-none focus:border-emerald-400" 
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="py-3 pl-4 pr-10 border-2 border-gray-300 rounded-lg font-primary focus:outline-none focus:border-highlight cursor-pointer appearance-none bg-background"
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                >
                  <option value="">All User Types</option>
                  <option value="Client">Client</option>
                  <option value="Provider">Provider</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="relative">
                <select 
                  className="py-3 pl-4 pr-10 border-2 border-gray-300 rounded-lg font-primary focus:outline-none focus:border-highlight cursor-pointer appearance-none bg-background"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <button className="py-3 px-4 border-2 border-gray-300 rounded-lg font-primary hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="none">
                  <path d="M3 4h14M3 8h14M3 12h14M3 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                More Filters
              </button>
            </div>

            {/* Table */}
            <div className="bg-background rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary">
                      <th className="p-4 text-left font-semibold text-white">User</th>
                      <th className="p-4 text-left font-semibold text-white">Email</th>
                      <th className="p-4 text-left font-semibold text-white">Type</th>
                      <th className="p-4 text-left font-semibold text-white">Status</th>
                      <th className="p-4 text-left font-semibold text-white">Joined</th>
                      <th className="p-4 text-left font-semibold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center p-8 text-gray-500">
                          No users found matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      currentUsers.map((user, index) => (
                        <tr key={index} className="border-b border-light hover:bg-light/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                {user.avatar}
                              </div>
                              <span className="font-medium text-text">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-text">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.type === 'Customer' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {user.status === 'Active' && (
                                <>
                                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="none">
                                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                      <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  <span className="text-green-600 font-medium text-sm">Active</span>
                                </>
                              )}
                              {user.status === 'Pending' && (
                                <>
                                  <svg className="w-4 h-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                                    <circle cx="10" cy="10" r="6"/>
                                  </svg>
                                  <span className="text-orange-600 font-medium text-sm">Pending</span>
                                </>
                              )}
                              {user.status === 'Suspended' && (
                                <>
                                  <svg className="w-4 h-4 text-red-600" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                                    <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  </svg>
                                  <span className="text-red-600 font-medium text-sm">Suspended</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-text">{user.joinDate}</td>
                          <td className="p-4">
                            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="10" cy="4" r="1.5"/>
                                <circle cx="10" cy="10" r="1.5"/>
                                <circle cx="10" cy="16" r="1.5"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(3, totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-secondary text-white'
                            : 'border border-gray-300 text-text hover:bg-light'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
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

export default AdminUsers

