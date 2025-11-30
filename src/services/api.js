// API Service for Labbi Application
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ============ AUTH API ============

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  // Get current user
  getMe: async () => {
    return authFetch('/auth/me');
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    return authFetch('/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// ============ USER API ============

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return authFetch('/users/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return authFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Update notification preferences
  updateNotifications: async (notifications) => {
    return authFetch('/users/notifications', {
      method: 'PUT',
      body: JSON.stringify(notifications),
    });
  },

  // Delete account
  deleteAccount: async () => {
    return authFetch('/users/account', {
      method: 'DELETE',
    });
  },
};

// ============ BOOKINGS API ============

export const bookingsAPI = {
  // Get all bookings
  getAll: async (status = null) => {
    const query = status && status !== 'All Bookings' ? `?status=${status}` : '';
    return authFetch(`/bookings${query}`);
  },

  // Get single booking
  getById: async (id) => {
    return authFetch(`/bookings/${id}`);
  },

  // Create new booking
  create: async (bookingData) => {
    return authFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Reschedule booking
  reschedule: async (id, date, displayDate, time) => {
    return authFetch(`/bookings/${id}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify({ date, displayDate, time }),
    });
  },

  // Cancel booking
  cancel: async (id, reason = '') => {
    return authFetch(`/bookings/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  },

  // Update booking status
  updateStatus: async (id, status) => {
    return authFetch(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// ============ REVIEWS API ============

export const reviewsAPI = {
  // Get user's reviews
  getAll: async () => {
    return authFetch('/reviews');
  },

  // Create new review
  create: async (bookingId, rating, comment) => {
    return authFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify({ bookingId, rating, comment }),
    });
  },

  // Get provider reviews
  getProviderReviews: async (providerId) => {
    const response = await fetch(`${API_BASE_URL}/reviews/provider/${providerId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get reviews');
    }
    return data;
  },

  // Get my reviews (for providers)
  getMyReviews: async () => {
    return authFetch('/reviews/my-reviews');
  },
};

// ============ SERVICES API ============

export const servicesAPI = {
  // Get all active services (public)
  getAll: async (category = null) => {
    const query = category ? `?category=${category}` : '';
    const response = await fetch(`${API_BASE_URL}/services${query}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get services');
    }
    return data;
  },

  // Get single service (public)
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get service');
    }
    return data;
  },

  // Get my services (provider only)
  getMyServices: async () => {
    return authFetch('/services/my-services');
  },

  // Create new service (provider only)
  create: async (serviceData) => {
    return authFetch('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },

  // Update service (provider only)
  update: async (id, serviceData) => {
    return authFetch(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  },

  // Delete service (provider only)
  delete: async (id) => {
    return authFetch(`/services/${id}`, {
      method: 'DELETE',
    });
  },

  // Update service status
  updateStatus: async (id, status) => {
    return authFetch(`/services/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Get services by provider (public)
  getByProvider: async (providerId) => {
    const response = await fetch(`${API_BASE_URL}/services/provider/${providerId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get provider services');
    }
    return data;
  },
};

// ============ PROVIDER API ============

export const providerAPI = {
  // Get provider bookings
  getBookings: async (status = null) => {
    const query = status && status !== 'All Bookings' ? `?status=${status}` : '';
    return authFetch(`/bookings/provider${query}`);
  },

  // Get provider stats for dashboard
  getStats: async () => {
    return authFetch('/bookings/provider/stats');
  },

  // Accept booking
  acceptBooking: async (bookingId) => {
    return authFetch(`/bookings/${bookingId}/accept`, {
      method: 'PUT',
    });
  },

  // Decline booking
  declineBooking: async (bookingId, reason = '') => {
    return authFetch(`/bookings/${bookingId}/decline`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  },

  // Complete booking
  completeBooking: async (bookingId) => {
    return authFetch(`/bookings/${bookingId}/complete`, {
      method: 'PUT',
    });
  },

  // Get provider profile
  getProfile: async () => {
    return authFetch('/users/profile');
  },

  // Update provider profile
  updateProfile: async (profileData) => {
    return authFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get provider reviews
  getReviews: async () => {
    return authFetch('/reviews/my-reviews');
  },

  // Get provider services
  getServices: async () => {
    return authFetch('/services/my-services');
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  bookings: bookingsAPI,
  reviews: reviewsAPI,
  services: servicesAPI,
  provider: providerAPI,
};

