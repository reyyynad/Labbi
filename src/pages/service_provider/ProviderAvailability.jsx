import React from 'react';
import AvailabilityManagement from './AvailabilityManagement';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderAvailability = () => {
  const handleNavigate = useProviderNavigation();
  return <AvailabilityManagement onNavigate={handleNavigate} />;
};

export default ProviderAvailability;

