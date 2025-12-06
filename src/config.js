// API Configuration for Labbi Application
// Supports both Vite (VITE_API_URL) and Create React App (REACT_APP_API_URL) environment variable formats

const API_URL = 
  import.meta.env.VITE_API_URL || 
  import.meta.env.REACT_APP_API_URL || 
  'http://localhost:5001'; // Default to localhost for development

// Export the full API base URL with /api prefix
export const API_BASE_URL = `${API_URL}/api`;

// Export just the base URL if needed
export default API_URL;

