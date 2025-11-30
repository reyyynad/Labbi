// Authentication utility functions
import { authAPI } from '../services/api'

export const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
}

export const getUserType = () => {
  return localStorage.getItem('userType') || sessionStorage.getItem('userType')
}

export const getUserEmail = () => {
  return localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
}

export const getUserName = () => {
  return localStorage.getItem('userName') || sessionStorage.getItem('userName')
}

export const getUserId = () => {
  return localStorage.getItem('userId') || sessionStorage.getItem('userId')
}

export const setAuthData = (token, email, userType, userName, rememberMe = false, userId = null) => {
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem('authToken', token)
  storage.setItem('userEmail', email)
  storage.setItem('userType', userType)
  if (userName) {
    storage.setItem('userName', userName)
  }
  if (userId) {
    storage.setItem('userId', userId)
  }
  if (rememberMe) {
    localStorage.setItem('rememberedEmail', email)
  }
}

export const clearAuthData = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userType')
  localStorage.removeItem('userName')
  localStorage.removeItem('userId')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('userEmail')
  sessionStorage.removeItem('userType')
  sessionStorage.removeItem('userName')
  sessionStorage.removeItem('userId')
}

export const logout = (navigate) => {
  clearAuthData()
  navigate('/')
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}

// Verify token is still valid by calling the backend
export const verifyToken = async () => {
  try {
    const token = getAuthToken()
    if (!token) return false
    
    const response = await authAPI.getMe()
    return response.success
  } catch (error) {
    clearAuthData()
    return false
  }
}
