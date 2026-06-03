const mongoose = require('mongoose');

const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Service unavailable: database connection lost',
      database: ['disconnected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
    });
  }
  next();
};

module.exports = checkDbConnection;
