import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth & Registration Pages
import Login from './pages/auth_registration/Login';
import LoginProvider from './pages/auth_registration/LoginProvider';
import LoginAdmin from './pages/auth_registration/LoginAdmin';
import AuthRegistration from './pages/auth_registration/AuthRegistration';
import SignupCustomer from './pages/auth_registration/SignupCustomer';
import SignupProvider from './pages/auth_registration/SignupProvider';
import VerifyEmail from './pages/auth_registration/VerifyEmail';
import VerifyEmailProvider from './pages/auth_registration/VerifyEmailProvider';

// Customer Pages
import CustomerInterface from './pages/customer/CustomerInterface';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerSettings from './pages/customer/CustomerSettings';
import CustomerBookingConfirmation from './pages/customer/CustomerBookingConfirmation';
import CustomerDateTimeSelection from './pages/customer/CustomerDateTimeSelection';
import CustomerServiceDetails from './pages/customer/CustomerServiceDetails';

// Provider Pages
import ProviderDashboard from './pages/service_provider/ProviderDashboard';
import ProviderMyServices from './pages/service_provider/ProviderMyServices';
import ProviderAddService from './pages/service_provider/ProviderAddService';
import ProviderManageBookings from './pages/service_provider/ProviderManageBookings';
import ProviderAvailability from './pages/service_provider/ProviderAvailability';
import ProviderProfileWrapper from './pages/service_provider/ProviderProfileWrapper';
import ProviderViewReviews from './pages/service_provider/ProviderViewReviews';
import ProviderSettings from './pages/service_provider/ProviderSettings';

// Admin Pages
import AdminPanel from './pages/admin/AdminPanel';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';
import Analytics from './pages/admin/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-provider" element={<LoginProvider />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/auth-registration" element={<AuthRegistration />} />
        <Route path="/signup-customer" element={<SignupCustomer />} />
        <Route path="/signup-provider" element={<SignupProvider />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email-provider" element={<VerifyEmailProvider />} />

        {/* Public Customer Interface */}
        <Route path="/" element={<CustomerInterface />} />
        <Route path="/services/:id" element={<CustomerServiceDetails />} />

        {/* Customer Protected Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerInterface />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/settings"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/booking/confirmation"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerBookingConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/booking/datetime/:id"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerDateTimeSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/services/:id"
          element={
            <ProtectedRoute allowedUserTypes={['customer']}>
              <CustomerServiceDetails />
            </ProtectedRoute>
          }
        />

        {/* Legacy customer routes (redirect to new paths) */}
        <Route path="/bookings" element={<Navigate to="/customer/bookings" replace />} />
        <Route path="/profile" element={<Navigate to="/customer/profile" replace />} />
        <Route path="/settings" element={<Navigate to="/customer/settings" replace />} />
        <Route path="/booking/confirmation" element={<Navigate to="/customer/booking/confirmation" replace />} />
        <Route path="/booking/datetime/:id" element={<Navigate to="/customer/booking/datetime/:id" replace />} />

        {/* Provider Protected Routes */}
        <Route
          path="/provider"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/services"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderMyServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/services/add"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderAddService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/bookings"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderManageBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/availability"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderAvailability />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/profile"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderProfileWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/reviews"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderViewReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/settings"
          element={
            <ProtectedRoute allowedUserTypes={['provider']}>
              <ProviderSettings />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedUserTypes={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute allowedUserTypes={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-services"
          element={
            <ProtectedRoute allowedUserTypes={['admin']}>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedUserTypes={['admin']}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

