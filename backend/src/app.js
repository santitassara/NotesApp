
const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');
const routes = require('./routes/usersRoutes');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);
app.use('/api', routes);

module.exports = app;
