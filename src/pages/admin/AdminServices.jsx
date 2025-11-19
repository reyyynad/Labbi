import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminServices() {
  return (
    <>
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-page-title">Service Management</h1>
          <p className="admin-subtitle">Manage all services and categories</p>
          <div className="admin-info-box">
            <h3 className="info-title">SERVICE MANAGEMENT:</h3>
            <ul className="info-list">
              <li>• View and moderate all services</li>
              <li>• Approve or reject new listings</li>
              <li>• Manage service categories</li>
              <li>• Monitor service quality</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminServices

