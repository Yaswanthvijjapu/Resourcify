const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'Manager', 'User').optional(),
  department: Joi.string().optional().allow(null),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

const updateUserRoleSchema = Joi.object({
  role: Joi.string().valid('Admin', 'Manager', 'User').required(),
  department: Joi.string().when('role', {
    is: 'Manager',
    then: Joi.required(),
    otherwise: Joi.optional().allow(null)
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserRoleSchema,
};