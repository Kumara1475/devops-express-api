const userModel = require('../models/userModel');

const getUsers = async () => {
  return await userModel.getUsers();
};

const createUser = async (userData) => {
  return await userModel.createUser(userData);
};

module.exports = { getUsers, createUser };
