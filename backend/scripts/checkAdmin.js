require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

// Connect to database
connectDB();

const checkAdmin = async () => {
  try {
    const adminEmail = 'arwayaser26@gmail.com';
    
    // Find admin user
    const admin = await User.findOne({ email: adminEmail }).select('+password');
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }
    
    console.log('✅ Admin user found!');
    console.log(`Email: ${admin.email}`);
    console.log(`Name: ${admin.fullName}`);
    console.log(`User Type: ${admin.userType}`);
    console.log(`Is Active: ${admin.isActive}`);
    console.log(`Password Hash: ${admin.password ? admin.password.substring(0, 20) + '...' : 'No password'}`);
    
    // Test password comparison
    const testPassword = '12345678';
    const isMatch = await admin.comparePassword(testPassword);
    console.log(`\nPassword test (${testPassword}): ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin:', error);
    process.exit(1);
  }
};

checkAdmin();

