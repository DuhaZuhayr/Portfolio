const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET health check
router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const status = states[dbState] || 'unknown';

  res.json({
    status: status === 'connected' ? 'ok' : 'degraded',
    database: status,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
