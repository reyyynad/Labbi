import React from 'react';
import Service_Provider from './Service_Provider';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderDashboard = () => {
  const handleNavigate = useProviderNavigation();
  return <Service_Provider onNavigate={handleNavigate} />;
};

export default ProviderDashboard;

