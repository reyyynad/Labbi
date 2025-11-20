import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/validation'
import Header from '../../components/header/Header'
import { Mail, ArrowLeft } from 'lucide-react'

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <Header transparent showAuthButtons />

      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white flex items-center justify-center py-16 px-6">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">

            {!submitted ? (
              <>
                <h1 className="text-3xl font-bold mb-2 text-center">Forgot Password?</h1>
                <p className="text-gray-100 text-center mb-8">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-white/70" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${errors.email ? 'border-red-300' : ''}`}
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-200">{errors.email}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>

                  <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Login
                  </Link>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-[#047857] rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-gray-100 mb-6">
                  We've sent a password reset link to <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-white/80 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors border border-white/30"
                  >
                    Resend Email
                  </button>
                  <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Login
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword