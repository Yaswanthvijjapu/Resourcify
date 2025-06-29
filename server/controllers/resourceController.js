const Resource = require('../models/Resource');
const { createResourceSchema, updateResourceSchema } = require('../utils/resourceValidate');

const createResource = async (req, res) => {
  try {
    const { error } = createResourceSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only Admins can create resources' });
    }

    const resource = new Resource({
      ...req.body,
      createdBy: req.user.id,
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getResources = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Manager') {
      query.department = req.user.department; // Managers see only their department
    }
    // Apply filters from query parameters
    const { type, capacity, availability, features } = req.query;
    if (type) query.type = type;
    if (capacity) query.capacity = { $gte: Number(capacity) };
    if (availability) query.availability = availability;
    if (features) query.features = { $all: features.split(',').map(f => f.trim()) };

    const resources = await Resource.find(query).populate('createdBy', 'name email');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('createdBy', 'name email');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (req.user.role === 'Manager' && resource.department !== req.user.department) {
      return res.status(403).json({ message: 'Access denied: Resource not in your department' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateResource = async (req, res) => {
  try {
    const { error } = updateResourceSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only Admins can update resources' });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    Object.assign(resource, req.body);
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteResource = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only Admins can delete resources' });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
};