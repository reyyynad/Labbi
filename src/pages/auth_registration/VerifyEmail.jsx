import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Mail } from 'lucide-react'

function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'Arwa@example.com'

  const handleResend = () => {
    console.log('Resending verification email to:', email)
    // In a real app, this would call an API
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

            <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-white mb-2">SYSTEM PROCESS:</h3>
              <ul className="text-xs text-white/80 space-y-1">
                <li>• Verification email sent automatically</li>
                <li>• Account activated upon link click</li>
                <li>• User redirected to dashboard after verification</li>
              </ul>
            </div>

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

