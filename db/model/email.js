const mongoose = require('mongoose');

// Create a Mongoose Schema for Email Submissions
const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  },

  hasReplied: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  parentEmail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Email'
  }
});

// Create a Mongoose Model
module.exports = mongoose.model('Email', emailSchema);
