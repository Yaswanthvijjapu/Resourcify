const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createBookingSchema, updateBookingStatusSchema } = require('../utils/bookingValidate');
const { createBooking, getBookings, getBookingById, updateBookingStatus, cancelBooking } = require('../controllers/bookingController');

router.post('/', [authMiddleware, validate(createBookingSchema)], createBooking);
router.get('/', [authMiddleware], getBookings);
router.get('/:id', [authMiddleware], getBookingById);
router.put('/:id/status', [authMiddleware, roleMiddleware(['Manager', 'Admin']), validate(updateBookingStatusSchema)], updateBookingStatus);
router.delete('/:id', [authMiddleware], cancelBooking);

module.exports = router;