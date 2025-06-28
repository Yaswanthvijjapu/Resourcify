const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Resource name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true, // e.g., 'IT', 'HR'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Resource', resourceSchema);