require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

// Connect to database
connectDB();

const seedAdmins = async () => {
  try {
    // Define all admin accounts
    const admins = [
      {
        email: 'admin@labbi.com',
        fullName: 'Labbi Admin',
        password: 'Admin123!'
      },
      {
        email: 'arwayaser26@gmail.com',
        fullName: 'Arwa Aldawoud',
        password: '12345678'
      },
      {
        email: 'shathasa111@gmail.com',
        fullName: 'Shatha',
        password: '12345678'
      },
      {
        email: 'renad.elsafi@outlook.com',
        fullName: 'Renad Elsafi',
        password: '12345678'
      }
    ];

    console.log('🌱 Starting admin seeding process...\n');

    for (const adminData of admins) {
      try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        
        if (existingAdmin) {
          // Update existing admin
          existingAdmin.fullName = adminData.fullName;
          existingAdmin.userType = 'admin';
          existingAdmin.status = 'Active';
          existingAdmin.isEmailVerified = true;
          // Set password directly and mark as modified to trigger hashing
          existingAdmin.password = adminData.password;
          existingAdmin.markModified('password');
          await existingAdmin.save({ validateBeforeSave: false });
          
          // Verify status was saved
          await existingAdmin.save();
          
          const initials = existingAdmin.getInitials();
          console.log('✅ Admin user updated successfully!');
          console.log(`   Email: ${adminData.email}`);
          console.log(`   Name: ${adminData.fullName}`);
          console.log(`   Password: ${adminData.password}`);
          console.log(`   Initials: ${initials}\n`);
        } else {
          // Create new admin user
          const admin = await User.create({
            fullName: adminData.fullName,
            email: adminData.email,
            password: adminData.password,
            userType: 'admin',
            status: 'Active',
            isEmailVerified: true
          });

          const initials = admin.getInitials();
          console.log('✅ Admin user created successfully!');
          console.log(`   Email: ${adminData.email}`);
          console.log(`   Name: ${adminData.fullName}`);
          console.log(`   Password: ${adminData.password}`);
          console.log(`   Initials: ${initials}\n`);
        }
      } catch (error) {
        console.error(`❌ Error processing admin ${adminData.email}:`, error.message);
      }
    }
    
    console.log('✨ Admin seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admins:', error);
    process.exit(1);
  }
};

seedAdmins();

