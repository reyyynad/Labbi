import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react'
import { isAuthenticated } from '../../utils/auth'
import { authAPI } from '../../services/api'

function VerifyEmailProvider() {
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
          navigate('/provider')
        } else {
          navigate('/login-provider')
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

  return (
    <>
      <Header transparent showAuthButtons />

      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white flex items-center justify-center py-16 px-6">
        <div className="max-w-md w-full">
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
                <h1 className="text-3xl font-bold mb-4">Verify your email</h1>
                <p className="text-gray-100 mb-6">
                  We've sent a verification link to <strong className="text-white">{email}</strong>
                  <br />
                  Please check your inbox and click the link to activate your account.
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
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-white/80 text-sm mb-3">Didn't receive the email?</p>
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full bg-[#047857] hover:bg-[#065f46] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {resending ? 'Sending...' : 'Resend verification email'}
                </button>
              </div>
            )}

            <Link
              to="/login-provider"
              className="text-white/80 hover:text-white text-sm font-medium inline-flex items-center gap-2"
            >
              ← Back to login
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyEmailProvider