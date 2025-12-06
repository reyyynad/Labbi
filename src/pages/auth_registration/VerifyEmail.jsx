import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react'
import { isAuthenticated } from '../../utils/auth'
import { authAPI } from '../../services/api'

function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { token } = useParams()
  const email = location.state?.email || 'your@email.com'
  const name = location.state?.name || 'User'
  const [resent, setResent] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)

  // Auto-verify if token is in URL
  useEffect(() => {
    if (token) {
      handleVerify(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleVerify = async (verificationToken) => {
    setVerifying(true)
    setError('')
    try {
      await authAPI.verifyEmail(verificationToken)
      setVerified(true)
      // Redirect after 2 seconds
      setTimeout(() => {
        if (isAuthenticated()) {
          navigate('/customer')
        } else {
          navigate('/login')
        }
      }, 2000)
    } catch (err) {
      setError(err.message || 'Verification failed. The link may be invalid or expired.')
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!email || email === 'your@email.com') {
      setError('Email address is required to resend verification. Please log in again or contact support.')
      return
    }
    
    setResending(true)
    setError('')
    try {
      const result = await authAPI.resendVerification(email)
      setResent(true)
      setTimeout(() => setResent(false), 5000)
      
      // If email was logged (development), show the link
      if (result.logged && result.link) {
        console.log('Verification link (SMTP not configured):', result.link)
        setError(`Email not configured. Check console for link: ${result.link}`)
      }
    } catch (err) {
      console.error('Resend verification error:', err)
      setError(err.message || 'Failed to resend verification email. Please check your connection and try again.')
    } finally {
      setResending(false)
    }
  }

  const handleContinue = () => {
    // If user is authenticated, go to customer interface
    if (isAuthenticated()) {
      navigate('/customer')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header transparent showAuthButtons />
      
      {/* Gradient Background with Animated Blobs */}
      <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1e3a8a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#065f46] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#047857] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                {verifying ? (
                  <Loader className="w-12 h-12 text-white animate-spin" />
                ) : verified ? (
                  <CheckCircle className="w-12 h-12 text-green-300" />
                ) : (
                  <Mail className="w-12 h-12 text-white" />
                )}
              </div>
            </div>

            {verified ? (
              <>
                <h1 className="text-3xl font-bold mb-4">Email Verified!</h1>
                <p className="text-gray-100 mb-6">
                  Your email has been successfully verified. Redirecting you to your dashboard...
                </p>
              </>
            ) : verifying ? (
              <>
                <h1 className="text-3xl font-bold mb-4">Verifying Email...</h1>
                <p className="text-gray-100 mb-6">
                  Please wait while we verify your email address.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">Welcome, {name}!</h1>
                <p className="text-gray-100 mb-6">
                  We've sent a verification link to <strong className="text-white">{email}</strong>
                  <br />
                  Please check your inbox and click the link to verify your email.
                </p>
              </>
            )}

            {error && (
              <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-red-500/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-300" />
                <span className="text-red-100 text-sm">{error}</span>
              </div>
            )}

            {resent && !error && (
              <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-green-100 text-sm">Verification email resent!</span>
              </div>
            )}

            {!verified && !verifying && (
              <>
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm mb-3">Didn't receive the email?</p>
                  <button 
                    onClick={handleResend}
                    disabled={resending}
                    className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors mb-3"
                  >
                    {resending ? 'Sending...' : 'Resend verification email'}
                  </button>
                </div>

                {/* Continue button - allows users to proceed */}
                <button 
                  onClick={handleContinue}
                  className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4"
                >
                  Continue to Dashboard
                </button>
              </>
            )}

            <Link 
              to="/login" 
              className="text-white/80 hover:text-white text-sm font-medium inline-flex items-center gap-2"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
