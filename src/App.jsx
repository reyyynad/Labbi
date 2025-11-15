import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerInterface from './pages/customer/CustomerInterface';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomerInterface />
  </React.StrictMode>
);


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // === CUSTOMER PAGES ===
// import CustomerInterface from './pages/customer/CustomerInterface';
// import CustomerProfile from './pages/customer/CustomerProfile';
// import CustomerSettings from './pages/customer/CustomerSettings';
// import CustomerServiceDetails from './pages/customer/CustomerServiceDetails';
// import CustomerBookings from './pages/customer/CustomerBookings';
// import CustomerBookingConfirmation from './pages/customer/CustomerBookingConfirmation';
// import CustomerDateTimeSelection from './pages/customer/CustomerDateTimeSelection';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/services" replace />} />

//         <Route path="/services" element={<CustomerInterface />} />
//         <Route path="/services/:id" element={<CustomerServiceDetails />} />

//         <Route path="/profile" element={<CustomerProfile />} />
//         <Route path="/settings" element={<CustomerSettings />} />
//         <Route path="/bookings" element={<CustomerBookings />} />
//         <Route path="/bookings/:id" element={<CustomerBookingConfirmation />} />

//         {/* ← ADD THIS LINE */}
//         <Route path="/booking/datetime/:serviceId" element={<CustomerDateTimeSelection />} />


//       </Routes>
//     </Router>
//   );
// }

// export default App;