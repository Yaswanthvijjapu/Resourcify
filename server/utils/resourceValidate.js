const Joi = require('joi');

const createResourceSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional().allow(''),
  department: Joi.string().required(),
});

const updateResourceSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  description: Joi.string().optional().allow(''),
  department: Joi.string().optional(),
});

module.exports = {
  createResourceSchema,
  updateResourceSchema,
};