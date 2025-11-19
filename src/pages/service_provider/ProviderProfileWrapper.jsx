import React from 'react';
import ProviderProfile from './ProviderProfile';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderProfileWrapper = () => {
  const handleNavigate = useProviderNavigation();
  return <ProviderProfile onNavigate={handleNavigate} />;
};

export default ProviderProfileWrapper;

