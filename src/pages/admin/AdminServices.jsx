import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHeader'
import { Layers, ShieldCheck, Eye, Plus, AlertCircle, CheckCircle2 } from 'lucide-react'

function AdminServices() {
  const navigate = useNavigate()
  
  const summaryCards = [
    { label: 'Total Services', value: 3842, change: '+92 this month', icon: Layers },
    { label: 'Pending Reviews', value: 27, change: 'Avg 6 hrs review time', icon: AlertCircle },
    { label: 'Flagged Listings', value: 8, change: 'Needs manual review', icon: ShieldCheck },
    { label: 'Categories', value: 18, change: '3 new this quarter', icon: Plus }
  ]

  const pendingServices = [
    {
      id: 101,
      title: 'Luxury Event Planning',
      provider: 'Renad Elsafi',
      submitted: '2 hours ago',
      category: 'Events',
      risk: 'Low'
    },
    {
      id: 102,
      title: 'Executive Coaching',
      provider: 'Adel Hassan',
      submitted: '6 hours ago',
      category: 'Consulting',
      risk: 'Medium'
    },
    {
      id: 103,
      title: 'Premium Home Cleaning',
      provider: 'Shatha Alharbi',
      submitted: '8 hours ago',
      category: 'Home Services',
      risk: 'Low'
    }
  ]

  const activeServices = [
    { id: 'SRV-2101', title: 'Business Consulting', provider: 'Mohammed Ali', category: 'Consulting', rating: 4.9, bookings: 212, status: 'Active' },
    { id: 'SRV-2087', title: 'Corporate Photography', provider: 'Arwa Aldawoud', category: 'Creative', rating: 4.8, bookings: 143, status: 'Featured' },
    { id: 'SRV-1999', title: 'Fitness Coaching', provider: 'Renad Elsafi', category: 'Health', rating: 4.7, bookings: 188, status: 'Active' },
    { id: 'SRV-1881', title: 'Custom Web Apps', provider: 'Adel Hassan', category: 'Technology', rating: 5.0, bookings: 265, status: 'Active' }
  ]

  const categories = [
    { name: 'Consulting', services: 620, growth: '+12%', highlight: 'bg-[#eef2ff] text-[#3730a3]' },
    { name: 'Home Services', services: 540, growth: '+8%', highlight: 'bg-[#ecfccb] text-[#3f6212]' },
    { name: 'Creative', services: 410, growth: '+5%', highlight: 'bg-[#ede9fe] text-[#5b21b6]' },
    { name: 'Technology', services: 380, growth: '+15%', highlight: 'bg-[#cffafe] text-[#155e75]' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Service Management</h1>
            <p className="text-[#6b7280] mt-2">
              Moderate listings, monitor categories, and keep the marketplace healthy
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/add-category')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#047857] text-white text-sm font-semibold rounded-lg shadow hover:bg-[#065f46] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {summaryCards.map(({ label, value, change, icon: Icon }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{label}</p>
                  <p className="text-3xl font-bold text-[#111827] mt-1">{value.toLocaleString()}</p>
                </div>
                <span className="w-11 h-11 rounded-xl bg-[#ecfdf5] text-[#047857] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <p className="text-sm text-[#047857] font-medium mt-4">{change}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">Pending Approvals</h2>
                <p className="text-sm text-[#6b7280]">Review the latest service submissions</p>
              </div>
              <button className="text-sm font-semibold text-[#047857] hover:text-[#065f46]">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {pendingServices.map((service) => (
                <div key={service.id} className="p-4 border border-gray-100 rounded-xl bg-[#f8fafc]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[#111827]">{service.title}</h3>
                      <p className="text-sm text-[#6b7280]">
                        by {service.provider} • {service.category}
                      </p>
                      <p className="text-xs text-[#9ca3af] mt-1">Submitted {service.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#4b5563]">
                        Risk: {service.risk}
                      </span>
                      <button className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Eye className="w-4 h-4 inline-block mr-2" />
                        Review
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46]">
                        <CheckCircle2 className="w-4 h-4 inline-block mr-2" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#111827] mb-1">Categories</h2>
            <p className="text-sm text-[#6b7280] mb-6">Performance snapshot per vertical</p>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-4 border border-gray-100 rounded-xl bg-[#f8fafc] flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{category.name}</p>
                    <p className="text-xs text-[#6b7280]">{category.services} services live</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${category.highlight}`}>
                    {category.growth}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#111827]">Top Active Services</h2>
              <p className="text-sm text-[#6b7280]">
                Monitor performance across the platform
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-[#047857] border border-[#047857] rounded-lg hover:bg-[#ecfdf5]">
              Manage Listings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-[#f9fafb] text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                <tr>
                  <th className="px-6 py-3 text-left">Service</th>
                  <th className="px-6 py-3 text-left">Provider</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Bookings</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-[#111827]">
                {activeServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/70">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{service.title}</p>
                        <p className="text-xs text-[#9ca3af]">{service.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6b7280]">{service.provider}</td>
                    <td className="px-6 py-4">{service.category}</td>
                    <td className="px-6 py-4">{service.rating.toFixed(1)}</td>
                    <td className="px-6 py-4">{service.bookings}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          service.status === 'Featured'
                            ? 'bg-[#e0f2fe] text-[#0c4a6e]'
                            : 'bg-[#dcfce7] text-[#166534]'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminServices
