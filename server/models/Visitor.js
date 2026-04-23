const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    default: 'unknown'
  },
  userAgent: {
    type: String,
    default: ''
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  os: {
    type: String,
    default: 'Unknown'
  },
  device: {
    type: String,
    enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
    default: 'Unknown'
  },
  page: {
    type: String,
    default: '/'
  },
  referrer: {
    type: String,
    default: 'Direct'
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  city: {
    type: String,
    default: 'Unknown'
  },
  screenResolution: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  sessionDuration: {
    type: Number, // in seconds
    default: 0
  },
  visitedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
visitorSchema.index({ visitedAt: -1 });
visitorSchema.index({ ip: 1, visitedAt: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);
