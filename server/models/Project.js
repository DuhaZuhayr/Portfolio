const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  techStack: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'ai-ml', 'mobile', 'other'],
    default: 'fullstack'
  },
  image: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);
