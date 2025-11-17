import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AuthRegistration() {
  const navigate = useNavigate()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-primary via-primary/90 to-secondary flex flex-col items-center justify-center p-8 relative">
        {/* Help icon in bottom right */}
        <button className="absolute bottom-8 right-8 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg hover:bg-highlight transition-colors cursor-pointer">
          ?
        </button>

        {/* Main content */}
        <div className="w-full max-w-6xl text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Welcome to Labbi</h1>
          <p className="text-xl text-white/90 font-arabic">خدمتك مطلوبة وحاجتك موجودة</p>
        </div>

        {/* Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Customer Card */}
          <div className="bg-light rounded-2xl p-10 text-center shadow-xl">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                <svg width="50" height="50" viewBox="0 0 60 60" fill="none" className="text-white">
                  <circle cx="30" cy="20" r="10" stroke="white" strokeWidth="2.5" fill="none"/>
                  <path d="M15 45c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="white" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-text mb-4">I'm a Customer</h2>
            <p className="text-base text-text mb-8">Looking to book services from professional providers</p>
            <button 
              className="w-full py-4 text-lg font-semibold text-white bg-secondary rounded-lg cursor-pointer transition-all duration-300 hover:bg-highlight mb-4"
              onClick={() => navigate('/signup-customer')}
            >
              Sign Up as Customer
            </button>
            <p className="text-sm text-text">
              Already have an account? <Link to="/" className="text-secondary font-semibold underline hover:text-highlight">Log in</Link>
            </p>
          </div>

          {/* Provider Card */}
          <div className="bg-light rounded-2xl p-10 text-center shadow-xl">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                <svg width="50" height="50" viewBox="0 0 60 60" fill="none" className="text-white">
                  <rect x="15" y="15" width="30" height="25" rx="2" stroke="white" strokeWidth="2.5" fill="none"/>
                  <path d="M20 20h20M20 25h15M20 30h20M20 35h10" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-text mb-4">I'm a Service Provider</h2>
            <p className="text-base text-text mb-8">Ready to offer my services and grow my business</p>
            <button 
              className="w-full py-4 text-lg font-semibold text-white bg-secondary rounded-lg cursor-pointer transition-all duration-300 hover:bg-highlight mb-4"
              onClick={() => navigate('/signup-provider')}
            >
              Sign Up as Provider
            </button>
            <p className="text-sm text-text">
              Already have an account? <Link to="/" className="text-secondary font-semibold underline hover:text-highlight">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthRegistration

