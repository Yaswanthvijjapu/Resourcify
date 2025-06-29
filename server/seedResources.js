const mongoose = require('mongoose');
const Resource = require('./models/Resource');

// Connect to MongoDB
mongoose.connect('mongodb+srv://yaswanthvijjapu799:yash123456@cluster0.dndd0.mongodb.net/resourcify')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample resources matching the schema
const resources = [
  {
    name: 'Meeting Room A',
    type: 'Meeting Room',
    location: 'Building 1, Floor 2',
    capacity: 10,
    features: ['Projector', 'Whiteboard', 'Wi-Fi'],
    availability: '9am-6pm',
    images: ['https://example.com/images/meeting-room-a.jpg'],
    description: 'Ideal for team meetings and presentations.',
    requiresApproval: true,
    department: 'IT',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'), // Replace with a valid User ID
  },
  {
    name: '3D Printer Pro X',
    type: 'Lab Equipment',
    location: 'Lab B, Floor 3',
    equipmentType: '3D Printer',
    usageInstructions: 'Requires calibration before use. See manual.',
    requiredTraining: '3D Printing Basics',
    maintenanceSchedule: 'Monthly',
    availability: '8am-8pm',
    description: 'High-precision 3D printer for prototyping.',
    requiresApproval: true,
    department: 'Engineering',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Company Car 1',
    type: 'Vehicle',
    location: 'Parking Lot A',
    capacity: 5,
    fuelType: 'Electric',
    bookingDuration: 'Max 4 hours',
    assignedDriver: 'John Doe',
    insuranceDetails: 'Policy #12345, expires 12/31/2025',
    availability: '7am-10pm',
    description: 'Electric sedan for business trips.',
    requiresApproval: true,
    department: 'Logistics',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Desk 101',
    type: 'Workstation/Desk',
    location: 'Open Office, Floor 4',
    monitorSize: '27 inches',
    ergonomicChair: true,
    standingDesk: true,
    nearbyAmenities: ['Coffee Machine', 'Printer'],
    availability: '24/7',
    description: 'Modern workstation with ergonomic setup.',
    requiresApproval: false,
    department: 'HR',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Training Room B',
    type: 'Training Room',
    location: 'Building 2, Floor 1',
    capacity: 20,
    cateringServices: true,
    features: ['Projector', 'Sound System'],
    availability: '8am-5pm',
    description: 'Spacious room for training sessions.',
    requiresApproval: true,
    department: 'Training',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Indoor Basketball Court',
    type: 'Sports Facility',
    location: 'Recreation Center',
    capacity: 30,
    equipmentRental: true,
    instructorAvailability: 'Weekends 10am-2pm',
    availability: '6am-10pm',
    description: 'Indoor court for sports activities.',
    requiresApproval: true,
    department: 'Recreation',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Main Auditorium',
    type: 'Auditorium/Event Hall',
    location: 'Building 1, Ground Floor',
    capacity: 200,
    eventSupportStaff: true,
    stageEquipment: ['Microphones', 'Projector'],
    lightingSoundSystems: ['Surround Sound', 'Spotlights'],
    bookingDuration: 'Max 8 hours',
    availability: '8am-11pm',
    description: 'Large venue for events and conferences.',
    requiresApproval: true,
    department: 'Events',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Storage Unit 5',
    type: 'Storage Space',
    location: 'Warehouse A',
    size: '100 sq. ft.',
    securityLevel: 'High',
    temperatureControl: 'Climate-controlled',
    availability: '24/7',
    description: 'Secure storage for sensitive materials.',
    requiresApproval: true,
    department: 'Operations',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
  {
    name: 'Shared Projector',
    type: 'Shared Equipment',
    location: 'Resource Pool, Floor 2',
    accessPermissions: ['IT', 'Marketing'],
    usageQuotas: '2 hours per team per day',
    maintenanceSchedule: 'Quarterly',
    availability: '9am-6pm',
    description: 'Portable projector for shared use.',
    requiresApproval: false,
    department: 'Shared',
    createdBy: new mongoose.Types.ObjectId('685faec00736a4581119d786'),
  },
];

// Seed function
const seedResources = async () => {
  try {
    // Clear existing resources (optional, comment out if you want to keep existing data)
    await Resource.deleteMany({});
    console.log('Existing resources cleared');

    // Insert new resources
    await Resource.insertMany(resources);
    console.log('Resources seeded successfully');

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding resources:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedResources();