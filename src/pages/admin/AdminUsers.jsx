import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const allUsers = [
    { name: 'Bana Jaber', email: 'rana@example.com', type: 'Client', status: 'Active', joinDate: 'Sep 15, 2025', activity: '12 bookings', avatar: 'R' },
    { name: 'Arwa Aldawoud', email: 'arwa@example.com', type: 'Provider', status: 'Active', joinDate: 'Aug 22, 2025', activity: '89 bookings', avatar: 'A' },
    { name: 'Sarah Mohammed', email: 'sarah@example.com', type: 'Provider', status: 'Pending', joinDate: 'Oct 10, 2025', activity: '0 bookings', avatar: 'S' },
    { name: 'Yaser Abdullah', email: 'yaser@example.com', type: 'Client', status: 'Suspended', joinDate: 'Jul 05, 2025', activity: '3 bookings', avatar: 'Y' }
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

  return (
    <>
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-page-title">User Management</h1>
          <p className="admin-subtitle">Manage all users (clients and providers)</p>

          <div className="filters-bar">
            <div className="search-box">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 12l6 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search users by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <option value="">User Type</option>
              <option value="Client">Client</option>
              <option value="Provider">Provider</option>
            </select>
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Activity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                      No users found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{user.avatar}</div>
                        <div>
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={`type-badge ${user.type.toLowerCase()}`}>{user.type}</span></td>
                    <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                    <td>{user.joinDate}</td>
                    <td>{user.activity}</td>
                    <td>
                      <button className="btn-table-action">⋮</button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-info-box">
            <h3 className="info-title">USER MANAGEMENT:</h3>
            <ul className="info-list">
              <li>• View all users with filtering and search</li>
              <li>• Approve/reject provider applications</li>
              <li>• Suspend/activate user accounts</li>
              <li>• View detailed user profiles and activity</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminUsers

