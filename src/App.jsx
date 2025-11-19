import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerInterface from './pages/customer/CustomerInterface';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerSettings from './pages/customer/CustomerSettings';
import CustomerBookingConfirmation from './pages/customer/CustomerBookingConfirmation';
import CustomerDateTimeSelection from './pages/customer/CustomerDateTimeSelection';
import CustomerServiceDetails from './pages/customer/CustomerServiceDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerInterface />} />
        <Route path="/bookings" element={<CustomerBookings />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/settings" element={<CustomerSettings />} />
        <Route path="/booking/confirmation" element={<CustomerBookingConfirmation />} />
        <Route path="/booking/datetime/:id" element={<CustomerDateTimeSelection />} />
        <Route path="/services/:id" element={<CustomerServiceDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
import React, { useState } from 'react';
import Service_Provider from './pages/service_provider/Service_Provider';
import ManageBookings from './pages/service_provider/ManageBookings';
import AvailabilityManagement from './pages/service_provider/AvailabilityManagement';
import AddService from './pages/service_provider/AddService';
import MyServices from './pages/service_provider/MyServices';
import ProviderProfile from './pages/service_provider/ProviderProfile';
import Settings from './pages/service_provider/Settings';
import ViewReviews from './pages/service_provider/ViewReviews';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Service_Provider onNavigate={handleNavigate} />;
      case 'services':
        return <MyServices onNavigate={handleNavigate} />;
      case 'add-service':
        return <AddService onNavigate={handleNavigate} />;
      case 'bookings':
        return <ManageBookings onNavigate={handleNavigate} />;
      case 'availability':
        return <AvailabilityManagement onNavigate={handleNavigate} />;
      case 'profile':
        return <ProviderProfile onNavigate={handleNavigate} />;
      case 'reviews':
        return <ViewReviews onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      default:
        return <Service_Provider onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;

// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import TopNav from './components/common/TopNav'
// import Login from './pages/Login'
// import AuthRegistration from './pages/AuthRegistration'
// import SignupCustomer from './pages/SignupCustomer'
// import SignupProvider from './pages/SignupProvider'
// import LoginProvider from './pages/LoginProvider'
// import VerifyEmail from './pages/VerifyEmail'
// import VerifyEmailProvider from './pages/VerifyEmailProvider'
// import CustomerDashboard from './pages/CustomerDashboard'
// import ProviderDashboard from './pages/ProviderDashboard'
// import AdminPanel from './pages/AdminPanel'
// import AdminUsers from './pages/AdminUsers'
// import AdminServices from './pages/AdminServices'
// import Analytics from './pages/Analytics'
// import ProtectedRoute from './components/common/ProtectedRoute'

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <TopNav />
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/auth-registration" element={<AuthRegistration />} />
//           <Route path="/signup-customer" element={<SignupCustomer />} />
//           <Route path="/signup-provider" element={<SignupProvider />} />
//           <Route path="/login-provider" element={<LoginProvider />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/verify-email-provider" element={<VerifyEmailProvider />} />
          
//           <Route 
//             path="/customer-dashboard" 
//             element={<Navigate to="/" replace />} 
//           />
//           <Route 
//             path="/provider-dashboard" 
//             element={<Navigate to="/" replace />} 
//           />
//           <Route 
//             path="/admin-panel" 
//             element={
//               <ProtectedRoute>
//                 <AdminPanel />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/admin-users" 
//             element={
//               <ProtectedRoute>
//                 <AdminUsers />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/admin-services" 
//             element={
//               <ProtectedRoute>
//                 <AdminServices />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/analytics" 
//             element={
//               <ProtectedRoute>
//                 <Analytics />
//               </ProtectedRoute>
//             } 
//           />
          
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App

