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