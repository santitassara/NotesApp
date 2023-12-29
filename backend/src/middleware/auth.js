
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); 

const authenticateJWT = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No Token, Rejected' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = authenticateJWT;
