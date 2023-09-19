const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the title.'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the description.'],
  },
  tags: {
    type: [String],
    required: [true, 'Please enter at least one tag.'],
  },
  contents: {
    type: String,
    required: [true, 'Please enter the contents.'],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'Please provide the userID.'],
  },
  publication_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Career', careerSchema);
