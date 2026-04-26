import mongoose from 'mongoose';
import { packages, stays } from './app/data/packages.js';
import Package from './models/Package.js';
import Stay from './models/Stay.js';
import User from './models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tripooly';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Package.deleteMany({});
    await Stay.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert data
    await Package.insertMany(packages);
    await Stay.insertMany(stays);

    // Create default super admin
    const adminUser = new User({
      username: 'admin',
      email: 'admin@tripooly.com',
      phone: '+1234567890',
      password: 'admin',
      role: 'admin'
    });
    await adminUser.save();
    
    console.log('Successfully seeded database including default admin');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
