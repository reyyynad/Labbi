import React from 'react';
import AddService from './AddService';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderAddService = () => {
  const handleNavigate = useProviderNavigation();
  return <AddService onNavigate={handleNavigate} />;
};

export default ProviderAddService;

