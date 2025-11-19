import React from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthToken, getUserType } from '../../utils/auth'

function ProtectedRoute({ children, allowedUserTypes = [] }) {
  const token = getAuthToken()
  const userType = getUserType()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If specific user types are required, check them
  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
    // Redirect based on user type
    if (userType === 'customer') {
      return <Navigate to="/customer" replace />
    } else if (userType === 'provider') {
      return <Navigate to="/provider" replace />
    } else if (userType === 'admin') {
      return <Navigate to="/admin-panel" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }

  return children
}

export default ProtectedRoute

