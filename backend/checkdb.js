// Helper script to check database contents
require('dotenv').config();
const mongoose = require('mongoose');

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB!\n');
    
    // Check users
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('=== USERS IN DATABASE ===');
    console.log('Total users:', users.length);
    users.forEach((u, i) => {
      console.log(`\nUser ${i + 1}:`);
      console.log('  ID:', u._id);
      console.log('  Name:', u.fullName || u.name || 'N/A');
      console.log('  Email:', u.email);
      console.log('  Type:', u.userType || u.role || 'N/A');
      console.log('  Phone:', u.phone || 'N/A');
      console.log('  Location:', u.location || 'N/A');
      console.log('  Created:', u.createdAt);
    });
    
    // Check bookings
    const bookings = await mongoose.connection.db.collection('bookings').find({}).toArray();
    console.log('\n\n=== BOOKINGS IN DATABASE ===');
    console.log('Total bookings:', bookings.length);
    bookings.forEach((b, i) => {
      console.log(`\nBooking ${i + 1}:`);
      console.log('  ID:', b._id);
      console.log('  Service:', b.serviceName);
      console.log('  Provider:', b.providerName);
      console.log('  Date:', b.displayDate);
      console.log('  Time:', b.time);
      console.log('  Status:', b.status);
      console.log('  Total:', 'SR' + (b.pricing?.total || 0));
    });
    
    // Check reviews
    const reviews = await mongoose.connection.db.collection('reviews').find({}).toArray();
    console.log('\n\n=== REVIEWS IN DATABASE ===');
    console.log('Total reviews:', reviews.length);
    reviews.forEach((r, i) => {
      console.log(`\nReview ${i + 1}:`);
      console.log('  Service:', r.serviceName);
      console.log('  Rating:', r.rating + '/5');
      console.log('  Comment:', r.comment?.substring(0, 50) + '...');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();

