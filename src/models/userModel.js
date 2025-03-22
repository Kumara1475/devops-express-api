let users = [];

const getUsers = async () => {
  return users;
};

const createUser = async (userData) => {
  users.push(userData);
  return userData;
};

module.exports = { getUsers, createUser };
