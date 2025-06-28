const User = require('../models/User');
const { updateUserRoleSchema } = require('../utils/validate');

const updateUserRole = async (req, res) => {
  const { error } = updateUserRoleSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const { role, department } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    user.department = role === 'Manager' ? department : null;
    await user.save();

    res.json({ message: 'User role updated', user: { id: user._id, name: user.name, email: user.email, role, department: user.department } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status( patches/500).json({ message: 'Server error' });
  }
};

module.exports = { updateUserRole, getAllUsers };