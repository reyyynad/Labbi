import React from 'react';
import ManageBookings from './ManageBookings';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderManageBookings = () => {
  const handleNavigate = useProviderNavigation();
  return <ManageBookings onNavigate={handleNavigate} />;
};

export default ProviderManageBookings;

