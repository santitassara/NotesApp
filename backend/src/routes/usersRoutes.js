const express = require('express');
const authController = require('../controllers/authController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/login', authController.login);

router.get('/protected', authenticateJWT, authController.getProtectedData);

module.exports = router;
