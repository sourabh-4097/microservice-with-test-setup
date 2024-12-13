const User = require('../models/userModel');

// Fetch all users
exports.getAllUsers = async () => {
  return await User.find();
};

// Create a new user
exports.createUser = async (userData) => {
  return await User.create(userData);
};

// Fetch a user by ID
exports.getUserById = async (id) => {
  return await User.findById(id);
};

// Update a user by ID
exports.updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Delete a user by ID
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
