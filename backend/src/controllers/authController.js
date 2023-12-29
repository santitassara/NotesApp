// authController.js
const users = require('../../users');

function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  return user;
}

module.exports = { authenticateUser };
