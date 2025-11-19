import React from 'react';
import Settings from './Settings';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderSettings = () => {
  const handleNavigate = useProviderNavigation();
  return <Settings onNavigate={handleNavigate} />;
};

export default ProviderSettings;

