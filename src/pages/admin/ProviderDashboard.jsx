import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserEmail, getUserName, logout } from '../../utils/auth'

function ProviderDashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Provider')
  const [userEmail, setUserEmail] = useState('provider@example.com')

  useEffect(() => {
    const email = getUserEmail()
    const name = getUserName()
    if (email) setUserEmail(email)
    if (name) setUserName(name)
  }, [])

  const handleLogout = () => {
    logout(navigate)
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
        <nav className="flex gap-8">
          <a href="#" className="text-text no-underline text-base font-medium transition-colors duration-300 border-b-2 border-transparent pb-1 hover:text-secondary hover:border-secondary">
            My Services
          </a>
          <a href="#" className="text-text no-underline text-base font-medium transition-colors duration-300 border-b-2 border-transparent pb-1 hover:text-secondary hover:border-secondary">
            Bookings
          </a>
          <a href="#" className="text-text no-underline text-base font-medium transition-colors duration-300 border-b-2 border-transparent pb-1 hover:text-secondary hover:border-secondary">
            Calendar
          </a>
          <a href="#" className="text-text no-underline text-base font-medium transition-colors duration-300 border-b-2 border-transparent pb-1 hover:text-secondary hover:border-secondary">
            Reviews
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block font-semibold text-text">{userName}</span>
            <span className="block text-sm text-gray-500">{userEmail}</span>
          </div>
          <button 
            className="py-2 px-4 bg-transparent border-2 border-text rounded text-text font-semibold cursor-pointer transition-all duration-300 hover:bg-text hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="bg-light min-h-[calc(100vh-200px)] p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-text mb-2">Provider Dashboard</h1>
          <p className="text-base text-gray-500 mb-8">Manage your services and bookings</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-background border-2 border-gray-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-text mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-primary my-2">0</p>
              <p className="text-sm text-gray-500 mb-4">This month</p>
              <button className="py-2 px-4 bg-background border-2 border-text rounded cursor-pointer transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-white">
                View Details
              </button>
            </div>

            <div className="bg-background border-2 border-gray-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-text mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-primary my-2">0 SAR</p>
              <p className="text-sm text-gray-500 mb-4">This month</p>
              <button className="py-2 px-4 bg-background border-2 border-text rounded cursor-pointer transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-white">
                View Report
              </button>
            </div>

            <div className="bg-background border-2 border-gray-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-text mb-2">Rating</h3>
              <p className="text-3xl font-bold text-primary my-2">5.0</p>
              <p className="text-sm text-gray-500 mb-4">Average rating</p>
              <button className="py-2 px-4 bg-background border-2 border-text rounded cursor-pointer transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-white">
                View Reviews
              </button>
            </div>

            <div className="bg-background border-2 border-gray-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-text mb-2">Active Services</h3>
              <p className="text-3xl font-bold text-primary my-2">0</p>
              <p className="text-sm text-gray-500 mb-4">Listed services</p>
              <button className="py-2 px-4 bg-primary text-white border-2 border-primary rounded cursor-pointer transition-all duration-300 hover:bg-secondary hover:border-secondary">
                Add Service
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProviderDashboard

