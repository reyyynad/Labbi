import React, { useMemo, useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import { Search, Filter, Download, X, User, Mail, Phone, Calendar, Activity, Shield, Ban, CheckCircle, AlertTriangle } from 'lucide-react'

// ========== USER MANAGEMENT MODAL COMPONENT ==========
const UserManagementModal = ({ isOpen, onClose, user, onStatusChange }) => {
  if (!isOpen || !user) return null;

  const [selectedStatus, setSelectedStatus] = useState(user.status);
  const [isSaving, setIsSaving] = useState(false);

  // Mock additional user data
  const userDetails = {
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    lastActive: '2 hours ago',
    totalSpent: user.type === 'Client' ? 'SR 1,240' : null,
    totalEarned: user.type === 'Provider' ? 'SR 5,680' : null,
    services: user.type === 'Provider' ? 3 : null,
    reviews: user.type === 'Provider' ? 4.8 : null,
    verificationStatus: 'Verified'
  };

  const handleStatusChange = async () => {
    if (selectedStatus === user.status) {
      onClose();
      return;
    }

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onStatusChange(user.email, selectedStatus);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleSuspend = () => {
    if (window.confirm(`Are you sure you want to suspend ${user.name}?`)) {
      setSelectedStatus('Suspended');
      handleStatusChange();
    }
  };

  const handleActivate = () => {
    setSelectedStatus('Active');
    handleStatusChange();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Manage User</h2>
            <p className="text-sm text-[#6b7280] mt-1">User Account Management</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Profile Section */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#047857] font-semibold text-xl flex items-center justify-center">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{user.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-3">
                  <div className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={16} />
                    <span>{userDetails.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.type === 'Client' 
                      ? 'bg-[#eef2ff] text-[#3730a3]' 
                      : 'bg-[#e0f2fe] text-[#075985]'
                  }`}>
                    {user.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedStatus === 'Active' 
                      ? 'bg-[#dcfce7] text-[#166534]' 
                      : selectedStatus === 'Pending'
                      ? 'bg-[#fef3c7] text-[#92400e]'
                      : 'bg-[#fee2e2] text-[#991b1b]'
                  }`}>
                    {selectedStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Account Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <User size={16} />
                Account Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Join Date:</span>
                  <span className="font-medium text-[#111827]">{user.joinDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Last Active:</span>
                  <span className="font-medium text-[#111827]">{userDetails.lastActive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Verification:</span>
                  <span className="font-medium text-[#047857] flex items-center gap-1">
                    <CheckCircle size={14} />
                    {userDetails.verificationStatus}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Location:</span>
                  <span className="font-medium text-[#111827]">{userDetails.location}</span>
                </div>
              </div>
            </div>

            {/* Activity Statistics */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Activity size={16} />
                Activity Statistics
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Total Activity:</span>
                  <span className="font-medium text-[#111827]">{user.activity}</span>
                </div>
                {user.type === 'Client' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Total Spent:</span>
                    <span className="font-medium text-[#111827]">{userDetails.totalSpent}</span>
                  </div>
                )}
                {user.type === 'Provider' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Total Earned:</span>
                      <span className="font-medium text-[#111827]">{userDetails.totalEarned}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Active Services:</span>
                      <span className="font-medium text-[#111827]">{userDetails.services}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Average Rating:</span>
                      <span className="font-medium text-[#111827]">{userDetails.reviews} ⭐</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <Shield size={16} />
              Status Management
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Change User Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <p className="text-xs text-[#6b7280] mt-2">
                  {selectedStatus === 'Suspended' && 'User will not be able to access their account'}
                  {selectedStatus === 'Pending' && 'User account is awaiting verification'}
                  {selectedStatus === 'Active' && 'User has full access to their account'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-[#6b7280] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            {selectedStatus === 'Suspended' && user.status !== 'Suspended' && (
              <button
                onClick={handleSuspend}
                className="px-6 py-2.5 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors flex items-center gap-2"
                disabled={isSaving}
              >
                <Ban size={16} />
                Suspend User
              </button>
            )}
            {selectedStatus === 'Active' && user.status !== 'Active' && (
              <button
                onClick={handleActivate}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors flex items-center gap-2"
                disabled={isSaving}
              >
                <CheckCircle size={16} />
                Activate User
              </button>
            )}
            <button
              onClick={handleStatusChange}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#1e3a8a] rounded-lg hover:bg-[#1e40af] transition-colors"
              disabled={isSaving || selectedStatus === user.status}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [allUsers, setAllUsers] = useState([
    { name: 'Renad Elsafi', email: 'renad@example.com', type: 'Client', status: 'Active', joinDate: 'Sep 15, 2025', activity: '12 bookings', avatar: 'R' },
    { name: 'Shatha Alharbi', email: 'shatha@example.com', type: 'Provider', status: 'Active', joinDate: 'Aug 22, 2025', activity: '89 bookings', avatar: 'S' },
    { name: 'Arwa Aldawoud', email: 'arwa@example.com', type: 'Provider', status: 'Pending', joinDate: 'Oct 10, 2025', activity: '0 bookings', avatar: 'A' },
    { name: 'Adel Hassan', email: 'adel@example.com', type: 'Client', status: 'Suspended', joinDate: 'Jul 05, 2025', activity: '3 bookings', avatar: 'A' },
    { name: 'Mohammed Ali', email: 'm.ali@example.com', type: 'Provider', status: 'Active', joinDate: 'Jun 12, 2025', activity: '54 bookings', avatar: 'M' }
  ])

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

  const handleManage = (user) => {
    setSelectedUser(user)
    setIsManageModalOpen(true)
  }

  const handleStatusChange = (userEmail, newStatus) => {
    setAllUsers(prevUsers => 
      prevUsers.map(user => 
        user.email === userEmail 
          ? { ...user, status: newStatus }
          : user
      )
    )
    alert(`User status updated to ${newStatus}`)
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
                        <button 
                          onClick={() => handleManage(user)}
                          className="text-sm font-medium text-[#047857] hover:text-[#065f46]"
                        >
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

      {/* User Management Modal */}
      <UserManagementModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        user={selectedUser}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

export default AdminUsers
