import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

function VerifyEmailProvider() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'Renad@example.com'

  const handleResend = () => {
    console.log('Resending verification email to:', email)
    // In a real app, this would call an API
  }

  return (
    <>
      <header className="bg-primary px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-800">L</span>
          </div>
          <span className="text-xl font-bold text-white font-arabic">Labbi - لُبّ</span>
        </div>
      </header>

      <main className="flex justify-center items-center min-h-[calc(100vh-150px)] p-8">
        <div className="bg-background border-2 border-gray-200 rounded-lg p-12 w-full max-w-[500px] shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <svg className="text-text" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#374151" strokeWidth="2"/>
              <path d="M20 30h40a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V32a2 2 0 0 1 2-2z" stroke="#374151" strokeWidth="2" fill="none"/>
              <path d="M18 32l22 14 22-14" stroke="#374151" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-text mb-5">Verify your email</h1>
          
          <p className="text-base text-gray-500 leading-relaxed mb-6">
            We've sent a verification link to <strong className="text-text font-semibold">{email}</strong>
            <br />
            Please check your inbox and click the link to activate your account.
          </p>

          <div className="bg-light border-2 border-gray-200 rounded-md p-6 mb-6">
            <p className="text-sm text-text mb-4">Didn't receive the email?</p>
            <button 
              className="w-full py-3 px-6 text-base font-semibold text-text bg-background border-2 border-text rounded-md cursor-pointer transition-all duration-300 font-primary hover:bg-secondary hover:border-secondary hover:text-white hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleResend}
            >
              Resend verification email
            </button>
          </div>

          <div className="bg-light border-2 border-gray-200 rounded-md p-6 mb-6 text-left">
            <h3 className="text-sm font-bold text-text mb-3 text-center tracking-wide">SYSTEM PROCESS:</h3>
            <ul className="list-none p-0 m-0">
              <li className="text-sm text-text leading-relaxed py-1 pl-2">• Verification email sent automatically</li>
              <li className="text-sm text-text leading-relaxed py-1 pl-2">• Account activated upon link click</li>
              <li className="text-sm text-text leading-relaxed py-1 pl-2">• User redirected to dashboard after verification</li>
            </ul>
          </div>

          <Link to="/login-provider" className="inline-block text-base text-text underline font-semibold transition-colors duration-300 mt-2 hover:text-highlight">
            Back to login
          </Link>
        </div>
      </main>
    </>
  )
}

export default VerifyEmailProvider

