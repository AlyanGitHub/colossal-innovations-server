const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please enter project image'],
  },
  title: {
    type: String,
    required: [true, 'Please enter project title'],
    unique: [true, 'Project already exists'],
  },
  contents: {
    type: String,
    required: [true, 'Please enter project contents'],
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

module.exports = mongoose.model('Project', projectSchema);
