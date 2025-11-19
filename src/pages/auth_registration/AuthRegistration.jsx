import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import { User, Briefcase, Check } from 'lucide-react'

function AuthRegistration() {
  const navigate = useNavigate()

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

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Labbi</h1>
            <p className="text-xl text-gray-100" style={{ direction: 'rtl' }}>خدمتك مطلوبة وحاجتك موجودة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Customer Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-3">I'm a Customer</h2>
              <p className="text-gray-100 text-center mb-6">Find and book services from verified providers</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Browse thousands of services</span>
                </li>
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Easy booking and payment</span>
                </li>
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Rate and review providers</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/signup-customer')}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Sign up as Customer
              </button>
            </div>

            {/* Provider Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-3">I'm a Service Provider</h2>
              <p className="text-gray-100 text-center mb-6">Offer your services and grow your business</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Create service listings</span>
                </li>
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Manage bookings & availability</span>
                </li>
                <li className="flex items-center gap-3 text-gray-100">
                  <Check className="w-5 h-5 text-[#047857] flex-shrink-0" />
                  <span>Build your reputation</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/signup-provider')}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Sign up as Provider
              </button>
            </div>
          </div>

          <div className="text-center text-white/80 mt-8 space-y-2">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-white hover:underline">Log in as Customer</Link>
              {' | '}
              <Link to="/login-provider" className="font-medium text-white hover:underline">Log in as Provider</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthRegistration

