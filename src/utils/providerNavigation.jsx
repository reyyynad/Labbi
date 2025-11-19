import { useNavigate } from 'react-router-dom';

export const useProviderNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    switch(page) {
      case 'dashboard':
        navigate('/provider');
        break;
      case 'services':
        navigate('/provider/services');
        break;
      case 'add-service':
        navigate('/provider/services/add');
        break;
      case 'bookings':
        navigate('/provider/bookings');
        break;
      case 'availability':
        navigate('/provider/availability');
        break;
      case 'profile':
        navigate('/provider/profile');
        break;
      case 'reviews':
        navigate('/provider/reviews');
        break;
      case 'settings':
        navigate('/provider/settings');
        break;
      default:
        navigate('/provider');
    }
  };

  return handleNavigate;
};

