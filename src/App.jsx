import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Settings from './pages/service_provider/Settings';
import ViewReviews from './pages/service_provider/ViewReviews';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewReviews />
  </React.StrictMode>
);



// import React, { useState } from "react";

// // Import all Provider pages
// import Service_Provider from "./pages/service_provider/Service_Provider";
// import MyServices from "./pages/service_provider/MyServices";
// import ManageBookings from "./pages/service_provider/ManageBookings";
// import AddService from "./pages/service_provider/AddService";
// import ProviderProfile from "./pages/service_provider/ProviderProfile";
// import ViewReviews from "./pages/service_provider/ViewReviews";
// import Settings from "./pages/service_provider/Settings";

// // TODO: Import Customer pages when ready
// // import Customer from "./pages/customer/Customer";
// // import BrowseServices from "./pages/customer/BrowseServices";

// // TODO: Import Admin pages when ready  
// // import Admin from "./pages/admin/Admin";
// // import ManageUsers from "./pages/admin/ManageUsers";

// // TODO: Import Auth pages when ready
// // import Registration from "./pages/auth_registration/Registration";
// // import Login from "./pages/auth_registration/Login";

// function App() {
//   // State to control which page to show
//   const [currentPage, setCurrentPage] = useState("dashboard");

//   // Navigation function to be passed to all pages
//   const handleNavigate = (page) => {
//     setCurrentPage(page);
//     window.scrollTo(0, 0); // Scroll to top on page change
//   };

//   // Render the appropriate page based on currentPage state
//   const renderPage = () => {
//     switch (currentPage) {
//       // Provider Pages
//       case "dashboard":
//         return <Service_Provider onNavigate={handleNavigate} />;
//       case "services":
//         return <MyServices onNavigate={handleNavigate} />;
//       case "bookings":
//         return <ManageBookings onNavigate={handleNavigate} />;
//       case "availability":
//         return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Availability Page</h1>
//             <p className="text-gray-600 mb-6">Calendar component coming soon...</p>
//             <button 
//               onClick={() => handleNavigate('dashboard')}
//               className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>;
//       case "add-service":
//         return <AddService onNavigate={handleNavigate} />;
//       case "profile":
//         return <ProviderProfile onNavigate={handleNavigate} />;
//       case "reviews":
//         return <ViewReviews onNavigate={handleNavigate} />;
//       case "settings":
//         return <Settings onNavigate={handleNavigate} />;

//       // Customer Pages (placeholder for teammates)
//       case "customer":
//         return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Interface</h1>
//             <p className="text-gray-600 mb-2">This section will be built by Teammate 1</p>
//             <p className="text-sm text-gray-500 mb-6">Coming soon...</p>
//             <button 
//               onClick={() => handleNavigate('dashboard')}
//               className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//             >
//               Back to Provider Dashboard
//             </button>
//           </div>
//         </div>;

//       // Admin Pages (placeholder for teammates)
//       case "admin":
//         return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Interface</h1>
//             <p className="text-gray-600 mb-2">This section will be built by Teammate 2</p>
//             <p className="text-sm text-gray-500 mb-6">Coming soon...</p>
//             <button 
//               onClick={() => handleNavigate('dashboard')}
//               className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//             >
//               Back to Provider Dashboard
//             </button>
//           </div>
//         </div>;

//       default:
//         return <Service_Provider onNavigate={handleNavigate} />;
//     }
//   };

//   return (
//     <div className="App">
//       {/* Development Navigation Panel - Remove this in production */}
//       <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-gray-900 rounded-lg shadow-2xl p-4 max-w-xs">
//         <p className="font-bold mb-3 text-gray-900 border-b pb-2">🛠️ Dev Navigation</p>
        
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-gray-600 mb-1">Provider Pages:</p>
//           <button
//             onClick={() => handleNavigate("dashboard")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "dashboard"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             📊 Dashboard
//           </button>
//           <button
//             onClick={() => handleNavigate("services")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "services"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             📝 My Services
//           </button>
//           <button
//             onClick={() => handleNavigate("bookings")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "bookings"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             📅 Bookings
//           </button>
//           <button
//             onClick={() => handleNavigate("add-service")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "add-service"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             ➕ Add Service
//           </button>
//           <button
//             onClick={() => handleNavigate("profile")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "profile"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             👤 Profile
//           </button>
//           <button
//             onClick={() => handleNavigate("reviews")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "reviews"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             ⭐ Reviews
//           </button>
//           <button
//             onClick={() => handleNavigate("settings")}
//             className={`block w-full text-left px-3 py-2 rounded text-sm ${
//               currentPage === "settings"
//                 ? "bg-gray-900 text-white font-semibold"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             ⚙️ Settings
//           </button>

//           <p className="text-xs font-semibold text-gray-600 mt-4 mb-1 pt-3 border-t">Other Interfaces:</p>
//           <button
//             onClick={() => handleNavigate("customer")}
//             className="block w-full text-left px-3 py-2 rounded text-sm bg-blue-100 hover:bg-blue-200 text-blue-900"
//           >
//             🛒 Customer (Teammate 1)
//           </button>
//           <button
//             onClick={() => handleNavigate("admin")}
//             className="block w-full text-left px-3 py-2 rounded text-sm bg-purple-100 hover:bg-purple-200 text-purple-900"
//           >
//             🔧 Admin (Teammate 2)
//           </button>
//         </div>

//         <p className="text-xs text-gray-500 mt-3 pt-3 border-t">
//           💡 Click navigation links in headers too!
//         </p>
//       </div>

//       {/* Main Page Content */}
//       {renderPage()}
//     </div>
//   );
// }

// export default App;