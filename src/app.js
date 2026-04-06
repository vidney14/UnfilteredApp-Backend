const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/index'); // The Route Map

const app = express();

// Global Middlewares
app.use(morgan('dev')); // Logs API requests to the console
app.use(cors());
app.use(express.json());

// API Route Map
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Unfiltered API is running smoothly.');
});

module.exports = app;
