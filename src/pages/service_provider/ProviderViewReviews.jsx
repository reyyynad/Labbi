import React from 'react';
import ViewReviews from './ViewReviews';
import { useProviderNavigation } from '../../utils/providerNavigation';

const ProviderViewReviews = () => {
  const handleNavigate = useProviderNavigation();
  return <ViewReviews onNavigate={handleNavigate} />;
};

export default ProviderViewReviews;

