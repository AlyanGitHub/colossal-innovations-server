const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please enter blog image'],
  },
  title: {
    type: String,
    required: [true, 'Please enter blog title'],
    unique: [true, 'Blog already exists'],
  },
  description: {
    type: String,
    required: [true, 'Please enter blog description'],
  },
  contents: {
    type: String,
    required: [true, 'Please enter blog contents'],
  },
  tags: {
    type: [String],
    required: [true, 'Please enter at least one tag.'],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'Please enter userID'],
  },
  publication_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
