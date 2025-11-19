import React from 'react';
import MyServices from './MyServices';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderMyServices = () => {
  const handleNavigate = useProviderNavigation();
  return <MyServices onNavigate={handleNavigate} />;
};

export default ProviderMyServices;

