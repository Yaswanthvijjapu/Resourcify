// seedAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await User.findOne({ email: 'admin@resourcify.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }
    const admin = new User({
      name: 'Admin',
      email: 'admin@resourcify.com',
      password: 'admin123',
      role: 'Admin',
      department: null,
    });
    await admin.save();
    console.log('Admin user created');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    mongoose.connection.close();
  }
};

seedAdmin();