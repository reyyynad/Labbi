import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { validatePassword } from '../../utils/validation'
import { authAPI } from '../../services/api'
import { setAuthData } from '../../utils/auth'
import Header from '../../components/header/Header'
import { Lock, CheckCircle, XCircle } from 'lucide-react'

function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useParams()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setApiError('Invalid reset token')
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (apiError) setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setApiError('')
    
    try {
      const response = await authAPI.resetPassword(token, formData.password)
      
      if (response.success) {
        setSuccess(true)
        
        // Auto-login if token is provided
        if (response.data && response.data.token) {
          const { token: authToken, user } = response.data
          setAuthData(
            authToken,
            user.email,
            user.userType,
            user.fullName,
            false,
            user.id
          )
          
          // Redirect after 2 seconds
          setTimeout(() => {
            if (user.userType === 'admin') {
              navigate('/admin-panel')
            } else if (user.userType === 'provider') {
              navigate('/provider')
            } else {
              navigate('/customer')
            }
          }, 2000)
        } else {
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      }
    } catch (error) {
      setApiError(error.message || 'Failed to reset password. The link may be invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header transparent showAuthButtons />
      
      {/* Gradient Background with Animated Blobs */}
      <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white py-24 px-6 overflow-hidden flex-1 flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1e3a8a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#065f46] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#047857] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {success ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Password Reset Successful!</h2>
                <p className="text-gray-100 mb-6">
                  Your password has been reset successfully. Redirecting you...
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2 text-center">Reset Password</h1>
                <p className="text-gray-100 text-center mb-8">
                  Enter your new password below.
                </p>

                {apiError && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-300" />
                      <p className="text-sm text-red-100">{apiError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/70" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.password ? 'border-red-300' : ''}`}
                        placeholder="Enter new password (min 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-200">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/70" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.confirmPassword ? 'border-red-300' : ''}`}
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-200">{errors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>

                  <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    ← Back to Login
                  </Link>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

