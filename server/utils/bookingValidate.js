const Joi = require('joi');

const createBookingSchema = Joi.object({
  resourceId: Joi.string().hex().length(24).required(), // Validate 24-character hex string
  startTime: Joi.date().required(),
  endTime: Joi.date().required().greater(Joi.ref('startTime')),
  notes: Joi.string().optional().allow(''),
});

const updateBookingStatusSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required(),
});

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema,
};