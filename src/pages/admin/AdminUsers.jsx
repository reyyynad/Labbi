import React, { useMemo, useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import { Search, Filter, Download } from 'lucide-react'

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const allUsers = [
    { name: 'Renad Elsafi', email: 'renad@example.com', type: 'Client', status: 'Active', joinDate: 'Sep 15, 2025', activity: '12 bookings', avatar: 'R' },
    { name: 'Shatha Alharbi', email: 'shatha@example.com', type: 'Provider', status: 'Active', joinDate: 'Aug 22, 2025', activity: '89 bookings', avatar: 'S' },
    { name: 'Arwa Aldawoud', email: 'arwa@example.com', type: 'Provider', status: 'Pending', joinDate: 'Oct 10, 2025', activity: '0 bookings', avatar: 'A' },
    { name: 'Adel Hassan', email: 'adel@example.com', type: 'Client', status: 'Suspended', joinDate: 'Jul 05, 2025', activity: '3 bookings', avatar: 'A' },
    { name: 'Mohammed Ali', email: 'm.ali@example.com', type: 'Provider', status: 'Active', joinDate: 'Jun 12, 2025', activity: '54 bookings', avatar: 'M' }
  ]

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = !userTypeFilter || user.type === userTypeFilter
      const matchesStatus = !statusFilter || user.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, userTypeFilter, statusFilter, allUsers])

  const statusVariants = {
    Active: 'bg-[#dcfce7] text-[#166534]',
    Pending: 'bg-[#fef3c7] text-[#92400e]',
    Suspended: 'bg-[#fee2e2] text-[#991b1b]'
  }

  const typeVariants = {
    Client: 'bg-[#eef2ff] text-[#3730a3]',
    Provider: 'bg-[#e0f2fe] text-[#075985]'
  }

  const handleExportList = () => {
    // Create CSV headers
    const headers = ['Name', 'Email', 'Type', 'Status', 'Join Date', 'Activity']
    
    // Convert users data to CSV rows
    const csvRows = [
      headers.join(','),
      ...filteredUsers.map(user => [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.type}"`,
        `"${user.status}"`,
        `"${user.joinDate}"`,
        `"${user.activity}"`
      ].join(','))
    ]
    
    // Create CSV content
    const csvContent = csvRows.join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up the URL
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">User Management</h1>
          <p className="text-[#6b7280] mt-2">Search, filter, and moderate all clients and providers</p>
        </div>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-[#111827]"
                placeholder="Search users by name or email"
              />
            </div>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-[#111827]"
              >
                <option value="">All User Types</option>
                <option value="Client">Client</option>
                <option value="Provider">Provider</option>
              </select>
            </div>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5">
              <Filter className="w-5 h-5 rotate-90 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-[#111827]"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">All Users</h2>
              <p className="text-sm text-[#6b7280]">
                Showing {filteredUsers.length} of {allUsers.length} users
              </p>
            </div>
            <button 
              onClick={handleExportList}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors inline-flex items-center gap-2"
            >
              <Download size={16} />
              Export List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-[#f9fafb] text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Join Date</th>
                  <th className="px-6 py-3 text-left">Activity</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-[#111827]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[#6b7280]">
                      No users found. Adjust your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#047857] font-semibold flex items-center justify-center">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-[#6b7280]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeVariants[user.type]}`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusVariants[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#6b7280]">{user.joinDate}</td>
                      <td className="px-6 py-4 text-[#6b7280]">{user.activity}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm font-medium text-[#047857] hover:text-[#065f46]">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminUsers
