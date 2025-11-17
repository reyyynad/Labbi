import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth_registration/Login'
import AuthRegistration from './pages/auth_registration/AuthRegistration'
import SignupCustomer from './pages/auth_registration/SignupCustomer'
import SignupProvider from './pages/auth_registration/SignupProvider'
import LoginProvider from './pages/auth_registration/LoginProvider'
import VerifyEmail from './pages/auth_registration/VerifyEmail'
import VerifyEmailProvider from './pages/auth_registration/VerifyEmailProvider'
import CustomerDashboard from './pages/admin/CustomerDashboard'
import ProviderDashboard from './pages/admin/ProviderDashboard'
import AdminPanel from './pages/admin/AdminPanel'
import AdminUsers from './pages/admin/AdminUsers'
import AdminServices from './pages/admin/AdminServices'
import Analytics from './pages/admin/Analytics'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth-registration" element={<AuthRegistration />} />
          <Route path="/signup-customer" element={<SignupCustomer />} />
          <Route path="/signup-provider" element={<SignupProvider />} />
          <Route path="/login-provider" element={<LoginProvider />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-email-provider" element={<VerifyEmailProvider />} />
          
          <Route 
            path="/customer-dashboard" 
            element={<Navigate to="/" replace />} 
          />
          <Route 
            path="/provider-dashboard" 
            element={<Navigate to="/" replace />} 
          />
          <Route 
            path="/admin-panel" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-users" 
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-services" 
            element={
              <ProtectedRoute>
                <AdminServices />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

