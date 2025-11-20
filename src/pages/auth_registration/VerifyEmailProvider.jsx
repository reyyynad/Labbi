import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Mail } from 'lucide-react'

function VerifyEmailProvider() {
  const location = useLocation()
  const email = location.state?.email || 'Arwa@example.com'

  const handleResend = () => {
    console.log('Resending verification email to:', email)
  }

  return (
    <>
      <Header transparent showAuthButtons />

      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/95 to-[#047857] text-white flex items-center justify-center py-16 px-6">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-center">

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Verify your email</h1>
           
            <p className="text-gray-100 mb-6">
              We've sent a verification link to <strong className="text-white">{email}</strong>
              <br />
              Please check your inbox and click the link to activate your account.
            </p>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-white/80 text-sm mb-3">Didn't receive the email?</p>
              <button
                onClick={handleResend}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Resend verification email
              </button>
            </div>

            <Link
              to="/login"
              className="text-white/80 hover:text-white text-sm font-medium inline-flex items-center gap-2"
            >
              Back to login
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyEmailProvider