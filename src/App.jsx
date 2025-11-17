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
  );
}

export default App;

