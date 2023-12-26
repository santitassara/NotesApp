
const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

module.exports = app;
