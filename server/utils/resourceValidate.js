const Joi = require('joi');

const createResourceSchema = Joi.object({
  name: Joi.string().min(2).required(),
  type: Joi.string()
    .valid(
      'Meeting Room',
      'Lab Equipment',
      'Vehicle',
      'Workstation/Desk',
      'Training Room',
      'Sports Facility',
      'Auditorium/Event Hall',
      'Storage Space',
      'Shared Equipment'
    )
    .required(),
  location: Joi.string().optional().allow(''),
  capacity: Joi.number().optional().allow(''),
  features: Joi.array().items(Joi.string()).optional(),
  availability: Joi.string().optional().allow(''),
  images: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional().allow(''),
  requiresApproval: Joi.boolean().optional(),
  department: Joi.string().required(),
  equipmentType: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  usageInstructions: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  requiredTraining: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  maintenanceSchedule: Joi.string().when('type', {
    is: Joi.valid('Lab Equipment', 'Shared Equipment'),
    then: Joi.string().optional().allow(''),
  }),
  fuelType: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  bookingDuration: Joi.string().when('type', {
    is: Joi.valid('Vehicle', 'Auditorium/Event Hall'),
    then: Joi.string().optional().allow(''),
  }),
  assignedDriver: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  insuranceDetails: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  monitorSize: Joi.string().when('type', { is: 'Workstation/Desk', then: Joi.string().optional().allow('') }),
  ergonomicChair: Joi.boolean().when('type', { is: 'Workstation/Desk', then: Joi.boolean().optional() }),
  standingDesk: Joi.boolean().when('type', { is: 'Workstation/Desk', then: Joi.boolean().optional() }),
  nearbyAmenities: Joi.array().items(Joi.string()).when('type', {
    is: 'Workstation/Desk',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  cateringServices: Joi.boolean().when('type', { is: 'Training Room', then: Joi.boolean().optional() }),
  eventSupportStaff: Joi.boolean().when('type', { is: 'Auditorium/Event Hall', then: Joi.boolean().optional() }),
  stageEquipment: Joi.array().items(Joi.string()).when('type', {
    is: 'Auditorium/Event Hall',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  lightingSoundSystems: Joi.array().items(Joi.string()).when('type', {
    is: 'Auditorium/Event Hall',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  size: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  securityLevel: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  temperatureControl: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  equipmentRental: Joi.boolean().when('type', { is: 'Sports Facility', then: Joi.boolean().optional() }),
  instructorAvailability: Joi.string().when('type', { is: 'Sports Facility', then: Joi.string().optional().allow('') }),
  accessPermissions: Joi.array().items(Joi.string()).when('type', {
    is: 'Shared Equipment',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  usageQuotas: Joi.string().when('type', { is: 'Shared Equipment', then: Joi.string().optional().allow('') }),
});

const updateResourceSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  type: Joi.string()
    .valid(
      'Meeting Room',
      'Lab Equipment',
      'Vehicle',
      'Workstation/Desk',
      'Training Room',
      'Sports Facility',
      'Auditorium/Event Hall',
      'Storage Space',
      'Shared Equipment'
    )
    .optional(),
  location: Joi.string().optional().allow(''),
  capacity: Joi.number().optional().allow(''),
  features: Joi.array().items(Joi.string()).optional(),
  availability: Joi.string().optional().allow(''),
  images: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional().allow(''),
  requiresApproval: Joi.boolean().optional(),
  department: Joi.string().optional(),
  equipmentType: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  usageInstructions: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  requiredTraining: Joi.string().when('type', { is: 'Lab Equipment', then: Joi.string().optional().allow('') }),
  maintenanceSchedule: Joi.string().when('type', {
    is: Joi.valid('Lab Equipment', 'Shared Equipment'),
    then: Joi.string().optional().allow(''),
  }),
  fuelType: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  bookingDuration: Joi.string().when('type', {
    is: Joi.valid('Vehicle', 'Auditorium/Event Hall'),
    then: Joi.string().optional().allow(''),
  }),
  assignedDriver: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  insuranceDetails: Joi.string().when('type', { is: 'Vehicle', then: Joi.string().optional().allow('') }),
  monitorSize: Joi.string().when('type', { is: 'Workstation/Desk', then: Joi.string().optional().allow('') }),
  ergonomicChair: Joi.boolean().when('type', { is: 'Workstation/Desk', then: Joi.boolean().optional() }),
  standingDesk: Joi.boolean().when('type', { is: 'Workstation/Desk', then: Joi.boolean().optional() }),
  nearbyAmenities: Joi.array().items(Joi.string()).when('type', {
    is: 'Workstation/Desk',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  cateringServices: Joi.boolean().when('type', { is: 'Training Room', then: Joi.boolean().optional() }),
  eventSupportStaff: Joi.boolean().when('type', { is: 'Auditorium/Event Hall', then: Joi.boolean().optional() }),
  stageEquipment: Joi.array().items(Joi.string()).when('type', {
    is: 'Auditorium/Event Hall',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  lightingSoundSystems: Joi.array().items(Joi.string()).when('type', {
    is: 'Auditorium/Event Hall',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  size: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  securityLevel: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  temperatureControl: Joi.string().when('type', { is: 'Storage Space', then: Joi.string().optional().allow('') }),
  equipmentRental: Joi.boolean().when('type', { is: 'Sports Facility', then: Joi.boolean().optional() }),
  instructorAvailability: Joi.string().when('type', { is: 'Sports Facility', then: Joi.string().optional().allow('') }),
  accessPermissions: Joi.array().items(Joi.string()).when('type', {
    is: 'Shared Equipment',
    then: Joi.array().items(Joi.string()).optional(),
  }),
  usageQuotas: Joi.string().when('type', { is: 'Shared Equipment', then: Joi.string().optional().allow('') }),
});

module.exports = {
  createResourceSchema,
  updateResourceSchema,
};