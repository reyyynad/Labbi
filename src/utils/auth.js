// Authentication utility functions

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

export const setAuthData = (token, email, userType, userName, rememberMe = false) => {
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem('authToken', token)
  storage.setItem('userEmail', email)
  storage.setItem('userType', userType)
  if (userName) {
    storage.setItem('userName', userName)
  }
  if (rememberMe) {
    localStorage.setItem('rememberedEmail', email)
  }
}

export const clearAuthData = () => {
  localStorage.clear()
  sessionStorage.clear()
}

export const logout = (navigate) => {
  clearAuthData()
  navigate('/')
}

