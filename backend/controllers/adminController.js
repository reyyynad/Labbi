const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private/Admin
exports.getDashboard = async (req, res) => {
  try {
    // Get statistics
    // Total users excludes admins (only count customers and providers)
    const totalUsers = await User.countDocuments({ userType: { $in: ['customer', 'provider'] } });
    const totalCustomers = await User.countDocuments({ userType: 'customer' });
    const totalProviders = await User.countDocuments({ userType: 'provider' });
    const totalAdmins = await User.countDocuments({ userType: 'admin' });
    const totalServices = await Service.countDocuments({ status: { $in: ['Active', 'active'] } });
    const pendingServices = await Service.countDocuments({ status: { $in: ['Pending', 'pending'] } });
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();

    // Calculate revenue (from completed bookings this month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const revenueData = await Booking.aggregate([
      { 
        $match: { 
          status: 'Completed',
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.total' }
        }
      }
    ]);
    const revenue = revenueData[0]?.total || 0;

    // Get recent users (last 5) - include status
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email userType status createdAt')
      .lean();

    // Get users created today (excluding admins)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const usersToday = await User.countDocuments({
      userType: { $in: ['customer', 'provider'] },
      createdAt: { $gte: startOfToday }
    });

    // Calculate bookings growth (this month vs last month)
    const startOfThisMonth = new Date();
    startOfThisMonth.setDate(1);
    startOfThisMonth.setHours(0, 0, 0, 0);
    
    const startOfLastMonth = new Date(startOfThisMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    
    const endOfLastMonth = new Date(startOfThisMonth);
    endOfLastMonth.setMilliseconds(endOfLastMonth.getMilliseconds() - 1);

    const bookingsThisMonth = await Booking.countDocuments({
      createdAt: { $gte: startOfThisMonth }
    });

    const bookingsLastMonth = await Booking.countDocuments({
      createdAt: { 
        $gte: startOfLastMonth,
        $lt: endOfLastMonth
      }
    });

    const bookingsGrowth = bookingsLastMonth > 0
      ? ((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth * 100).toFixed(0)
      : bookingsThisMonth > 0 ? '100' : '0';

    // Calculate revenue growth (this month vs last month)
    const revenueThisMonthData = await Booking.aggregate([
      {
        $match: {
          status: 'Completed',
          createdAt: { $gte: startOfThisMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.total' }
        }
      }
    ]);
    const revenueThisMonth = revenueThisMonthData[0]?.total || 0;

    const revenueLastMonthData = await Booking.aggregate([
      {
        $match: {
          status: 'Completed',
          createdAt: {
            $gte: startOfLastMonth,
            $lt: endOfLastMonth
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.total' }
        }
      }
    ]);
    const revenueLastMonth = revenueLastMonthData[0]?.total || 0;

    const revenueGrowth = revenueLastMonth > 0
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth * 100).toFixed(0)
      : revenueThisMonth > 0 ? '100' : '0';

    // Get pending service approvals
    const pendingServiceApprovals = await Service.find({ 
      status: { $in: ['Pending', 'pending'] } 
    })
      .populate('provider', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Format pending approvals for frontend
    const formattedApprovals = pendingServiceApprovals.map((service, index) => ({
      id: service._id.toString(),
      title: service.title,
      owner: service.provider?.fullName || 'Unknown',
      category: service.category || 'Other',
      submitted: new Date(service.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: index < 2 ? 'High Priority' : 'Normal' // First 2 are high priority
    }));

    // Get recent activity feed
    const recentBookings = await Booking.find()
      .populate('customer', 'fullName')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const activityFeed = recentUsers.slice(0, 3).map((user, index) => ({
      id: user._id.toString(),
      user: user.fullName,
      action: user.userType === 'customer' ? 'New client registration' : 
              user.userType === 'provider' ? 'New provider application' : 
              'New admin registration',
      time: getTimeAgo(user.createdAt),
      badge: user.userType,
      status: user.status || 'Active', // Include status from database
      color: user.userType === 'customer' ? 'bg-[#d1fae5] text-[#065f46]' :
             user.userType === 'provider' ? 'bg-[#fef3c7] text-[#92400e]' :
             'bg-[#e0e7ff] text-[#1e3a8a]'
    }));

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          totalUsers: totalUsers.toLocaleString(),
          totalCustomers: totalCustomers.toLocaleString(),
          totalProviders: totalProviders.toLocaleString(),
          totalAdmins: totalAdmins.toLocaleString(),
          totalServices: totalServices.toLocaleString(),
          pendingServices: pendingServices,
          totalBookings: totalBookings.toLocaleString(),
          totalReviews: totalReviews.toLocaleString(),
          revenue: `${(revenue / 1000).toFixed(0)}K SR`
        },
        stats: [
          {
            label: 'Total Users',
            value: totalUsers.toLocaleString(),
            detail: `${totalCustomers.toLocaleString()} clients | ${totalProviders.toLocaleString()} providers`,
            trend: `+${usersToday} today`,
            icon: 'Users'
          },
          {
            label: 'Active Services',
            value: totalServices.toLocaleString(),
            detail: `${pendingServices} pending approval`,
            trend: `${pendingServices > 0 ? '+' : ''}${pendingServices} pending`,
            icon: 'ClipboardList'
          },
          {
            label: 'Total Bookings',
            value: totalBookings.toLocaleString(),
            detail: 'This month',
            trend: `${bookingsGrowth > 0 ? '+' : ''}${bookingsGrowth}%`,
            icon: 'Activity'
          },
          {
            label: 'Revenue',
            value: `${(revenue / 1000).toFixed(0)}K SR`,
            detail: 'This month',
            trend: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}%`,
            icon: 'DollarSign'
          }
        ],
        pendingApprovals: formattedApprovals,
        activityFeed
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Helper function to get time ago
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

// @route   GET /api/admin/users
// @desc    Get all users with filters
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const { userType, search, status, page = 1, limit = 50 } = req.query;
    
    // Build query
    const query = {};
    if (userType && userType !== 'all') {
      query.userType = userType;
    }
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get users
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await User.countDocuments(query);

    // Format users for frontend with activity data
    const formattedUsers = await Promise.all(users.map(async (user) => {
      const initials = user.fullName 
        ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U';
      
      // Calculate activity based on user type
      let activity = '0 bookings';
      if (user.userType === 'customer') {
        const bookingCount = await Booking.countDocuments({ customer: user._id });
        activity = `${bookingCount} booking${bookingCount !== 1 ? 's' : ''}`;
      } else if (user.userType === 'provider') {
        const bookingCount = await Booking.countDocuments({ provider: user._id });
        const serviceCount = await Service.countDocuments({ provider: user._id });
        activity = `${bookingCount} booking${bookingCount !== 1 ? 's' : ''}, ${serviceCount} service${serviceCount !== 1 ? 's' : ''}`;
      }
      
      return {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        type: user.userType === 'customer' ? 'Client' : 
              user.userType === 'provider' ? 'Provider' : 
              'Admin',
        status: user.status || 'Active', // Get status from database
        avatar: initials,
        phone: user.phone || '',
        location: user.location || '',
        joinDate: new Date(user.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        activity: activity
      };
    }));

    res.status(200).json({
      success: true,
      data: {
        users: formattedUsers,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status (activate/deactivate/suspend)
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
  try {
    const { status, isActive } = req.body; // Accept both 'status' string or 'isActive' boolean
    
    // Determine status from request
    let newStatus = status;
    if (isActive !== undefined) {
      // If isActive is provided, convert to status
      newStatus = isActive ? 'Active' : 'Suspended';
    }
    
    // Validate status
    if (!['Active', 'Pending', 'Suspended'].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Active, Pending, or Suspended'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deactivating yourself
    if (user._id.toString() === req.user._id.toString() && newStatus === 'Suspended') {
      return res.status(400).json({
        success: false,
        message: 'You cannot suspend your own account'
      });
    }

    // Update and save status to database
    user.status = newStatus;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status updated to ${newStatus} successfully`,
      data: {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   GET /api/admin/services
// @desc    Get all services with filters
// @access  Private/Admin
exports.getServices = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    
    // Build query
    const query = {};
    if (status && status !== 'all') {
      // Handle both 'Pending' and 'pending'
      if (status.toLowerCase() === 'pending') {
        query.status = { $in: ['Pending', 'pending'] };
      } else {
        query.status = status;
      }
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get services
    const services = await Service.find(query)
      .populate('provider', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Service.countDocuments(query);

    // Format services for frontend
    const formattedServices = services.map(service => {
      const providerName = service.provider?.fullName || 'Unknown';
      const riskLevel = service.status === 'Pending' || service.status === 'pending' 
        ? (service.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 'High' : 'Medium')
        : 'Low';
      
      return {
        id: service._id.toString(),
        title: service.title,
        provider: providerName,
        category: service.category || 'Other',
        price: service.price,
        status: service.status === 'pending' ? 'Pending' : service.status,
        submitted: new Date(service.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        risk: riskLevel,
        bookings: service.bookingsCount || 0,
        rating: service.rating || 0
      };
    });

    res.status(200).json({
      success: true,
      data: {
        services: formattedServices,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   PUT /api/admin/services/:id/approve
// @desc    Approve a service
// @access  Private/Admin
exports.approveService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.status = 'Active';
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service approved successfully',
      data: service
    });
  } catch (error) {
    console.error('Approve service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   PUT /api/admin/services/:id/reject
// @desc    Reject a service
// @access  Private/Admin
exports.rejectService = async (req, res) => {
  try {
    const { reason } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.status = 'Rejected';
    if (reason) {
      service.rejectionReason = reason;
    }
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service rejected successfully',
      data: service
    });
  } catch (error) {
    console.error('Reject service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   GET /api/admin/bookings
// @desc    Get all bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    
    // Build query
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get bookings
    const bookings = await Booking.find(query)
      .populate('customer', 'fullName email')
      .populate('service', 'title category')
      .populate('provider', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Booking.countDocuments(query);

    // Format bookings for frontend
    const formattedBookings = bookings.map(booking => ({
      id: booking._id.toString(),
      customer: booking.customer?.fullName || booking.customerName || 'Unknown',
      service: booking.service?.title || booking.serviceName || 'Unknown Service',
      provider: booking.provider?.fullName || booking.providerName || 'Unknown',
      date: booking.displayDate || new Date(booking.date).toLocaleDateString(),
      time: booking.time,
      status: booking.status,
      total: booking.pricing?.total || 0,
      createdAt: new Date(booking.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }));

    res.status(200).json({
      success: true,
      data: {
        bookings: formattedBookings,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query; // Default to 30 days
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total revenue (all time and current period)
    const totalRevenueAllTime = await Booking.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    const totalRevenuePeriod = await Booking.aggregate([
      { 
        $match: { 
          status: 'Completed',
          createdAt: { $gte: startDate }
        } 
      },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    // Revenue growth over time (monthly for selected period, max 12 months)
    const monthsToShow = Math.min(Math.ceil(days / 30), 12);
    const revenueStartDate = new Date();
    revenueStartDate.setMonth(revenueStartDate.getMonth() - monthsToShow);
    
    const revenueByMonth = await Booking.aggregate([
      {
        $match: {
          status: 'Completed',
          createdAt: { $gte: revenueStartDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$pricing.total' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // User registration trends (monthly for selected period, max 12 months) - exclude admins
    const usersByMonth = await User.aggregate([
      {
        $match: {
          userType: { $in: ['customer', 'provider'] },
          createdAt: { $gte: revenueStartDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Service categories distribution
    const servicesByCategory = await Service.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Booking trends over time (monthly for selected period, max 12 months)
    const bookingsByMonth = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: revenueStartDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Users by type (exclude admins from total)
    const usersByType = await User.aggregate([
      { $match: { userType: { $in: ['customer', 'provider'] } } },
      { $group: { _id: '$userType', count: { $sum: 1 } } }
    ]);

    // Calculate user growth (current month vs previous month)
    const currentMonth = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    const currentMonthUsers = await User.countDocuments({
      userType: { $in: ['customer', 'provider'] },
      createdAt: {
        $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      }
    });

    const previousMonthUsers = await User.countDocuments({
      userType: { $in: ['customer', 'provider'] },
      createdAt: {
        $gte: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
        $lt: new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 1)
      }
    });

    const userGrowthPercent = previousMonthUsers > 0 
      ? ((currentMonthUsers - previousMonthUsers) / previousMonthUsers * 100).toFixed(1)
      : currentMonthUsers > 0 ? '100' : '0';

    // Average service rating
    const avgRating = await Service.aggregate([
      { $match: { status: 'Active', rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    // Monthly revenue (current month)
    const currentMonthRevenue = await Booking.aggregate([
      {
        $match: {
          status: 'Completed',
          createdAt: {
            $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
            $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
          }
        }
      },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        revenue: {
          total: totalRevenueAllTime[0]?.total || 0,
          period: totalRevenuePeriod[0]?.total || 0,
          monthly: revenueByMonth.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            value: item.revenue
          }))
        },
        users: {
          byMonth: usersByMonth.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            value: item.count
          })),
          byType: usersByType.map(item => ({
            type: item._id || 'customer',
            count: item.count
          })),
          growth: userGrowthPercent
        },
        services: {
          byCategory: servicesByCategory.map(item => ({
            category: item._id || 'other',
            count: item.count
          }))
        },
        bookings: {
          byMonth: bookingsByMonth.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            value: item.count
          })),
          byStatus: bookingsByStatus.map(item => ({
            status: item._id || 'Pending',
            count: item.count
          }))
        },
        insights: {
          userGrowth: `${userGrowthPercent > 0 ? '+' : ''}${userGrowthPercent}%`,
          monthlyRevenue: currentMonthRevenue[0]?.total || 0,
          avgRating: avgRating[0]?.avgRating ? avgRating[0].avgRating.toFixed(1) : '0.0'
        }
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

