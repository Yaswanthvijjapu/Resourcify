const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);