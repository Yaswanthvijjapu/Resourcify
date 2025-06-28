const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const User = require('../models/User');
const { createBookingSchema, updateBookingStatusSchema } = require('../utils/bookingValidate');
const { sendBookingStatusEmail } = require('../config/nodemailer'); // Fixed typo

const createBooking = async (req, res) => {
  const { error } = createBookingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { resourceId, startTime, endTime, notes } = req.body;

  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check for booking conflicts
    const conflictingBooking = await Booking.findOne({
      resource: resourceId,
      $or: [
        { startTime: { $lte: endTime }, endTime: { $gte: startTime } },
      ],
      status: { $in: ['pending', 'approved'] },
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Booking conflict: Resource is already booked for this time slot' });
    }

    const booking = new Booking({
      user: req.user.id,
      resource: resourceId,
      startTime,
      endTime,
      department: resource.department,
      notes,
      status: resource.department === req.user.department && req.user.role === 'Manager' ? 'approved' : 'pending',
    });

    await booking.save();

    // Notify user if auto-approved by Manager
    if (booking.status === 'approved') {
      const user = await User.findById(req.user.id);
      await sendBookingStatusEmail(user.email, resource.name, booking.status, startTime, endTime);
    }

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error); // Debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Manager') {
      query.department = req.user.department;
    } else if (req.user.role === 'User') {
      query.user = req.user.id;
    }
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('resource', 'name department');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('resource', 'name department');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'Manager' && booking.department !== req.user.department) {
      return res.status(403).json({ message: 'Access denied: Booking not in your department' });
    }
    if (req.user.role === 'User' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied: Not your booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBookingStatus = async (req, res) => {
  const { error } = updateBookingStatusSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { status } = req.body;

  try {
    if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only Managers and Admins can update booking status' });
    }

    const booking = await Booking.findById(req.params.id).populate('resource');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'Manager' && booking.department !== req.user.department) {
      return res.status(403).json({ message: 'Access denied: Booking not in your department' });
    }

    booking.status = status;
    await booking.save();

    const user = await User.findById(booking.user);
    await sendBookingStatusEmail(user.email, booking.resource.name, status, booking.startTime, booking.endTime);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'User' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied: Not your booking' });
    }
    if (req.user.role === 'Manager' && booking.department !== req.user.department) {
      return res.status(403).json({ message: 'Access denied: Booking not in your department' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};