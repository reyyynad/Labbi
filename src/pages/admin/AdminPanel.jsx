import React, { useState, useEffect } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import { adminAPI } from '../../services/api'
import {
  Users,
  ClipboardList,
  Activity,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Star
} from 'lucide-react'

// ========== REVIEW MODAL COMPONENT ==========
const ReviewModal = ({ isOpen, onClose, approval, onApprove, onReject }) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (isOpen && approval?.id) {
      const fetchServiceDetails = async () => {
        try {
          setLoadingDetails(true);
          const response = await adminAPI.getServiceById(approval.id);
          if (response.success && response.data) {
            const service = response.data;
            setServiceDetails({
              description: service.description || 'No description provided',
              price: service.price || 0,
              location: service.location || service.provider?.location || 'Not specified',
              duration: service.sessionDuration ? `${service.sessionDuration} hour(s)` : 'Not specified',
              pricingType: service.pricingType || 'hourly',
              providerEmail: service.provider?.email || 'Not provided',
              providerPhone: service.provider?.phone || 'Not provided',
              bio: service.provider?.bio || 'No bio provided',
              experience: service.provider?.experience || 'Not specified'
            });
          }
        } catch (err) {
          console.error('Error fetching service details:', err);
          // Use default values if fetch fails
          setServiceDetails({
            description: 'Unable to load service details',
            price: 0,
            location: 'Not specified',
            duration: 'Not specified',
            pricingType: 'hourly',
            providerEmail: 'Not provided',
            providerPhone: 'Not provided',
            bio: 'No bio provided',
            experience: 'Not specified'
          });
        } finally {
          setLoadingDetails(false);
        }
      };
      fetchServiceDetails();
    }
  }, [isOpen, approval]);

  if (!isOpen || !approval) return null;

  if (!serviceDetails) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <p className="text-[#6b7280]">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Review Service Approval</h2>
            <p className="text-sm text-[#6b7280] mt-1">Service ID: #{approval.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Service Overview */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{approval.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-2">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{approval.owner}</span>
                  </div>
                  <span>•</span>
                  <span>{approval.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Submitted {approval.submitted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                  <FileText size={16} />
                  Service Description
                </h4>
                <p className="text-sm text-[#6b7280] leading-relaxed bg-white border border-gray-200 rounded-lg p-4 break-words whitespace-pre-wrap overflow-wrap-anywhere">
                  {serviceDetails.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Service Information</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                    <CheckCircle size={16} className="text-[#047857]" />
                    <span>Category: {approval.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Pricing & Details</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Price:</span>
                    <span className="font-semibold text-[#111827]">
                      SR{serviceDetails.price}
                      {serviceDetails.pricingType === 'hourly' ? '/hr' : serviceDetails.pricingType === 'session' ? '/session' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">Duration:</span>
                    <span className="font-semibold text-[#111827]">{serviceDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Provider Information</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-[#6b7280]" />
                    <span className="text-[#111827] font-medium">{approval.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.providerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#6b7280]" />
                    <span className="text-[#6b7280]">{serviceDetails.providerPhone}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-[#6b7280] mb-1">Bio:</p>
                    <p className="text-sm text-[#111827]">{serviceDetails.bio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280]">Experience: <span className="font-medium text-[#111827]">{serviceDetails.experience}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-[#6b7280] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to reject "${approval.title}"?`)) {
                  onReject(approval.id);
                  onClose();
                }
              }}
              className="px-6 py-2.5 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => {
                onApprove(approval.id);
                onClose();
              }}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors"
            >
              Approve Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AdminPanel() {
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [stats, setStats] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboard();
      
      if (response.success) {
        // Set stats from API
        setStats(response.data.stats || []);
        
          // Set pending approvals from API
          setPendingApprovals(response.data.pendingApprovals || []);
          
          // Set activity feed from API
          setActivityFeed(response.data.activityFeed || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      // Set default empty stats if API fails
      setStats([
        {
          label: 'Total Users',
          value: '0',
          detail: '0 clients | 0 providers',
          trend: '0 today',
          icon: Users,
          accent: 'bg-[#d1fae5] text-[#065f46]'
        },
        {
          label: 'Active Services',
          value: '0',
          detail: '0 pending approval',
          trend: '0 pending',
          icon: ClipboardList,
          accent: 'bg-[#e0e7ff] text-[#1e3a8a]'
        },
        {
          label: 'Total Bookings',
          value: '0',
          detail: 'This month',
          trend: '0%',
          icon: Activity,
          accent: 'bg-[#fef3c7] text-[#92400e]'
        },
        {
          label: 'Revenue',
          value: '0 SR',
          detail: 'This month',
          trend: '0%',
          icon: DollarSign,
          accent: 'bg-[#fce7f3] text-[#9d174d]'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh dashboard data every 30 seconds to show updated user statuses
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleReview = (approval) => {
    setSelectedApproval(approval);
    setIsReviewModalOpen(true);
  };

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveService(id);
      setPendingApprovals(pendingApprovals.filter(approval => approval.id !== id));
      alert(`Service has been approved!`);
      // Refresh dashboard data
      const response = await adminAPI.getDashboard();
      if (response.success) {
        setPendingApprovals(response.data.pendingApprovals || []);
        setStats(response.data.stats || []);
      }
    } catch (err) {
      console.error('Error approving service:', err);
      alert('Failed to approve service. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectService(id, 'Rejected by admin');
      setPendingApprovals(pendingApprovals.filter(approval => approval.id !== id));
      alert(`Service has been rejected.`);
      // Refresh dashboard data
      const response = await adminAPI.getDashboard();
      if (response.success) {
        setPendingApprovals(response.data.pendingApprovals || []);
        setStats(response.data.stats || []);
      }
    } catch (err) {
      console.error('Error rejecting service:', err);
      alert('Failed to reject service. Please try again.');
    }
  };

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

        {loading && (
          <div className="text-center py-12">
            <p className="text-[#6b7280]">Loading dashboard data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            // Map icon string to component
            const IconMap = {
              'Users': Users,
              'ClipboardList': ClipboardList,
              'Activity': Activity,
              'DollarSign': DollarSign
            };
            const Icon = IconMap[stat.icon] || Users;
            const accentMap = {
              'Total Users': 'bg-[#d1fae5] text-[#065f46]',
              'Active Services': 'bg-[#e0e7ff] text-[#1e3a8a]',
              'Total Bookings': 'bg-[#fef3c7] text-[#92400e]',
              'Revenue': 'bg-[#fce7f3] text-[#9d174d]'
            };
            const accent = accentMap[stat.label] || 'bg-[#d1fae5] text-[#065f46]';
            
            return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#047857] bg-[#ecfdf5] px-3 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-[#6b7280]">{stat.label}</p>
              <p className="text-3xl font-bold text-[#111827] mt-1">{stat.value}</p>
              <p className="text-sm text-[#6b7280] mt-1">{stat.detail}</p>
            </div>
            );
          })}
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
                      <button 
                        onClick={() => handleReview(approval)}
                        className="px-4 py-2 text-sm font-medium text-[#6b7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleApprove(approval.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#047857] rounded-lg hover:bg-[#065f46] transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to reject "${approval.title}"?`)) {
                            handleReject(approval.id);
                          }
                        }}
                        className="px-4 py-2 text-sm font-medium text-[#b91c1c] bg-white border border-[#fecaca] rounded-lg hover:bg-[#fef2f2] transition-colors"
                      >
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
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-[#374151] capitalize">
                        {activity.badge}
                      </span>
                      {activity.status && (
                        <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${
                          activity.status === 'Active' 
                            ? 'bg-[#dcfce7] text-[#166534]' 
                            : activity.status === 'Pending'
                            ? 'bg-[#fef3c7] text-[#92400e]'
                            : 'bg-[#fee2e2] text-[#991b1b]'
                        }`}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
          </>
        )}
      </main>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        approval={selectedApproval}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}

export default AdminPanel