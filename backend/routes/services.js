const express = require('express');
const Service = require('../models/Service');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all services (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, provider } = req.query;
    
    let query = { status: 'Active' }; // Only show active services to public
    
    if (category) {
      query.category = category;
    }
    
    if (provider) {
      query.provider = provider;
    }

    const services = await Service.find(query)
      .populate('provider', 'fullName email phone location profileImage')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services.map(service => ({
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        subcategory: service.subcategory,
        price: service.price,
        pricingType: service.pricingType,
        priceType: service.pricingType === 'hourly' ? 'hour' : service.pricingType,
        images: service.images || [],
        status: service.status,
        bookings: service.bookingsCount || 0,
        rating: service.rating || 0,
        reviewsCount: service.reviewsCount || 0,
        provider: service.provider,
        location: service.location || service.provider?.location,
        createdAt: service.createdAt
      }))
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/services/my-services
// @desc    Get all services for the logged-in provider
// @access  Private (Provider only)
router.get('/my-services', protect, async (req, res) => {
  try {
    console.log('Fetching services for provider:', req.user._id);
    
    // Use find without populate to avoid issues
    const services = await Service.find({ provider: req.user._id })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();

    console.log('Found services:', services.length);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services.map(service => ({
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        subcategory: service.subcategory,
        price: service.price,
        pricingType: service.pricingType,
        priceType: service.pricingType === 'hourly' ? 'hour' : service.pricingType,
        images: service.images || [],
        image: service.images?.[0] || '',
        status: service.status,
        bookings: service.bookingsCount || 0,
        rating: service.rating || 0,
        reviewsCount: service.reviewsCount || 0,
        createdAt: service.createdAt
      }))
    });
  } catch (error) {
    console.error('Get my services error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'fullName email phone location profileImage');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        subcategory: service.subcategory,
        price: service.price,
        pricingType: service.pricingType,
        priceType: service.pricingType === 'hourly' ? 'hour' : service.pricingType,
        sessionDuration: service.sessionDuration,
        images: service.images || [],
        status: service.status,
        bookings: service.bookingsCount || 0,
        rating: service.rating || 0,
        reviewsCount: service.reviewsCount || 0,
        provider: service.provider,
        location: service.location,
        createdAt: service.createdAt
      }
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Private (Provider only)
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subcategory,
      pricingType,
      price,
      sessionDuration,
      images,
      location
    } = req.body;

    // Verify user is a provider
    if (req.user.userType !== 'provider' && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only service providers can create services'
      });
    }

    const service = await Service.create({
      provider: req.user._id,
      title,
      description,
      category,
      subcategory: subcategory || '',
      pricingType: pricingType || 'hourly',
      price,
      sessionDuration: sessionDuration || 1,
      images: images || [],
      location: location || req.user.location || '',
      status: 'Pending' // Services start as pending for review
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully and is pending review',
      data: {
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        pricingType: service.pricingType,
        status: service.status
      }
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private (Owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check ownership - provider field is ObjectId (not populated)
    const providerId = service.provider._id ? service.provider._id.toString() : service.provider.toString();
    if (providerId !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this service'
      });
    }

    const {
      title,
      description,
      category,
      subcategory,
      pricingType,
      price,
      sessionDuration,
      images,
      status,
      location
    } = req.body;

    // Update fields
    service.title = title || service.title;
    service.description = description || service.description;
    service.category = category || service.category;
    service.subcategory = subcategory !== undefined ? subcategory : service.subcategory;
    service.pricingType = pricingType || service.pricingType;
    service.price = price !== undefined ? price : service.price;
    service.sessionDuration = sessionDuration || service.sessionDuration;
    service.images = images || service.images;
    service.location = location !== undefined ? location : service.location;
    
    // Only admin can change status to Active
    if (status && (req.user.userType === 'admin' || status === 'Inactive')) {
      service.status = status;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: {
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        pricingType: service.pricingType,
        status: service.status
      }
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private (Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check ownership - provider field is ObjectId (not populated)
    const providerId = service.provider._id ? service.provider._id.toString() : service.provider.toString();
    if (providerId !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this service'
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/services/:id/status
// @desc    Update service status (Admin only or provider for deactivation)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Providers can only deactivate their own services
    const providerId = service.provider._id ? service.provider._id.toString() : service.provider.toString();
    const isOwner = providerId === req.user._id.toString();
    const isAdmin = req.user.userType === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Only admin can activate services
    if (status === 'Active' && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can activate services'
      });
    }

    service.status = status;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service ${status.toLowerCase()} successfully`,
      data: {
        id: service._id,
        status: service.status
      }
    });
  } catch (error) {
    console.error('Update service status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/services/provider/:providerId
// @desc    Get all active services for a specific provider
// @access  Public
router.get('/provider/:providerId', async (req, res) => {
  try {
    const services = await Service.find({ 
      provider: req.params.providerId,
      status: 'Active'
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services.map(service => ({
        id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        pricingType: service.pricingType,
        images: service.images,
        rating: service.rating,
        reviewsCount: service.reviewsCount,
        bookings: service.bookingsCount
      }))
    });
  } catch (error) {
    console.error('Get provider services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

