import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  Users,
  ClipboardList,
  Activity,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react'

function AdminPanel() {
  const stats = [
    {
      label: 'Total Users',
      value: '12,487',
      detail: '8,234 clients | 4,253 providers',
      trend: '+24 today',
      icon: Users,
      accent: 'bg-[#d1fae5] text-[#065f46]'
    },
    {
      label: 'Active Services',
      value: '3,842',
      detail: '15 pending approval',
      trend: '+15 pending',
      icon: ClipboardList,
      accent: 'bg-[#e0e7ff] text-[#1e3a8a]'
    },
    {
      label: 'Total Bookings',
      value: '24,891',
      detail: 'This month',
      trend: '+18%',
      icon: Activity,
      accent: 'bg-[#fef3c7] text-[#92400e]'
    },
    {
      label: 'Revenue',
      value: '148K SR',
      detail: 'This month',
      trend: '+22%',
      icon: DollarSign,
      accent: 'bg-[#fce7f3] text-[#9d174d]'
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      title: 'Advanced Web Development',
      owner: 'Renad Elsafi',
      category: 'Web Development',
      submitted: 'Oct 10, 2025',
      status: 'High Priority'
    },
    {
      id: 2,
      title: 'Brand Strategy Consulting',
      owner: 'Adel Hassan',
      category: 'Consulting',
      submitted: 'Oct 11, 2025',
      status: 'Normal'
    },
    {
      id: 3,
      title: 'Corporate Photography',
      owner: 'Shatha Alharbi',
      category: 'Creative',
      submitted: 'Oct 12, 2025',
      status: 'Normal'
    }
  ]

  const activityFeed = [
    {
      id: 1,
      user: 'Renad Elsafi',
      action: 'New client registration',
      time: '5 minutes ago',
      badge: 'customer',
      color: 'bg-[#d1fae5] text-[#065f46]'
    },
    {
      id: 2,
      user: 'Adel Hassan',
      action: 'Service booking completed',
      time: '12 minutes ago',
      badge: 'booking',
      color: 'bg-[#e0e7ff] text-[#1e3a8a]'
    },
    {
      id: 3,
      user: 'Shatha Alharbi',
      action: 'New provider application',
      time: '23 minutes ago',
      badge: 'provider',
      color: 'bg-[#fef3c7] text-[#92400e]'
    },
    {
      id: 4,
      user: 'Mohammed Ali',
      action: 'Service review posted',
      time: '1 hour ago',
      badge: 'review',
      color: 'bg-[#fce7f3] text-[#9d174d]'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Admin Dashboard</h1>
          <p className="text-[#6b7280] mt-2">
            Monitor platform metrics, approvals, and activity at a glance
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, value, detail, trend, icon: Icon, accent }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#047857] bg-[#ecfdf5] px-3 py-1 rounded-full">
                  {trend}
                </span>
              </div>
              <p className="text-sm font-medium text-[#6b7280]">{label}</p>
              <p className="text-3xl font-bold text-[#111827] mt-1">{value}</p>
              <p className="text-sm text-[#6b7280] mt-1">{detail}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">Pending Service Approvals</h2>
                <p className="text-sm text-[#6b7280]">Review and moderate incoming listings</p>
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                {pendingApprovals.length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="p-4 border border-gray-100 rounded-xl bg-[#f8fafc]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[#111827]">
                        {approval.title}
                      </h3>
                      <p className="text-sm text-[#6b7280]">
                        by {approval.owner} • {approval.category}
                      </p>
                      <p className="text-xs text-[#9ca3af] flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Submitted {approval.submitted}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        Review
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors">
                        Approve
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#111827] mb-1">Recent Activity</h2>
            <p className="text-sm text-[#6b7280] mb-6">
              Track the latest customer and provider actions
            </p>

            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border border-gray-100 rounded-xl p-4 bg-[#f8fafc]"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${activity.color}`}>
                    {activity.user.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#111827]">{activity.user}</p>
                      <span className="text-xs text-[#9ca3af]">{activity.time}</span>
                    </div>
                    <p className="text-sm text-[#6b7280]">{activity.action}</p>
                    <span className="inline-flex mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-[#374151] capitalize">
                      {activity.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminPanel