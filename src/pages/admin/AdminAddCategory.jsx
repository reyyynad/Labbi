import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHeader'
import { ArrowLeft, Tag } from 'lucide-react'

function AdminAddCategory() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // In real implementation, save to backend
      console.log('Category submitted:', formData)
      alert('Category added successfully!')
      navigate('/admin-services')
    }, 1000)
  }

  const handleCancel = () => {
    navigate('/admin-services')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <button 
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#111827] mb-1">Add New Category</h1>
          <p className="text-[#6b7280] text-sm">Create a new service category for the platform</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#111827] mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Technology, Consulting, Home Services"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-[#111827] mb-2">
                Description <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent resize-none"
                placeholder="Brief description of this category..."
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#047857] text-white text-sm font-semibold rounded-lg hover:bg-[#065f46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Category'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AdminAddCategory

