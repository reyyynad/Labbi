import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'

function AdminServices() {
  return (
    <>
      <AdminHeader />
      <main className="bg-light min-h-[calc(100vh-80px)] p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-text mb-2">Service Management</h1>
          <p className="text-base text-gray-500 mb-8">Manage all services and categories</p>
          <div className="bg-light border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-text mb-3">SERVICE MANAGEMENT:</h3>
            <ul className="list-none p-0 m-0">
              <li className="text-sm text-text py-1">• View and moderate all services</li>
              <li className="text-sm text-text py-1">• Approve or reject new listings</li>
              <li className="text-sm text-text py-1">• Manage service categories</li>
              <li className="text-sm text-text py-1">• Monitor service quality</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminServices

