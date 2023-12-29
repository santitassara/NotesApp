// routes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authController.authenticateUser(username, password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
