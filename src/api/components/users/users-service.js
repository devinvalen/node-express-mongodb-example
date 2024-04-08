const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const { passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}
async function getCheckEmailExist(email) {
  const checkEmailExist = await usersRepository.getEmailExist(email);

  // Email
  if (!checkEmailExist) {
    return true;
  } else {
    return false;
  }
}
async function getCheckPass(password) {
  const checkPass = await usersRepository.getPass(password);

  // Password
  if (checkPass) {
    return true;
  } else {
    return false;
  }
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

async function getChangePass(
  id,
  password_before,
  password_after,
  confirm_password
) {
  //
  if (confirm_password != password_after) {
    throw new Error('Invalid New Password');
  }

  // Compare
  const getUserId = await usersRepository.getUser(id);
  const comparePass = await passwordMatched(
    password_before,
    getUserId.password
  );

  if (!comparePass) {
    throw new Error('Wrong Password');
  }

  const hashedPassword = await hashPassword(password_after);
  await usersRepository.getNewPass(id, hashedPassword);
}
module.exports = {
  getUsers,
  getUser,
  getCheckEmailExist,
  getCheckPass,
  getChangePass,
  createUser,
  updateUser,
  deleteUser,
};
