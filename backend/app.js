// app.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./configs/db'); // MySQL connection config

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

// Root Route for sanity check
app.get('/', (req, res) => {
  res.send('🚀 Backend is running on port 80!');
});

// Optional Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API Routes
app.use('/api', routes);

module.exports = app;
