const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); 

exports.login = (req, res) => {
  
  const { username, password } = req.body;
  if (username === 'Ensolvers' && password === 'Beatles909') {
  
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
   
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
exports.getProtectedData = (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
};
