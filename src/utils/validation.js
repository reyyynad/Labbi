// Validation utility functions

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password, minLength = 6) => {
  return password.length >= minLength
}

export const validateForm = (formData, rules) => {
  const errors = {}
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field]
    const value = formData[field]
    
    if (rule.required && !value) {
      errors[field] = `${field} is required`
    } else if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address'
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`
    } else if (rule.match && value && value !== formData[rule.match]) {
      errors[field] = `${field} does not match`
    }
  })
  
  return errors
}

