const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please enter username'],
    unique: [true, 'User already exists'],
  },
  password: {
    type: String,
    require: [true, 'Please enter password'],
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user',
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserShema);
