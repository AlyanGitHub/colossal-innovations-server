const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  resume: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  additionalNotes: {
    type: String,
    default: ''
  },
  applicationStatus: {
    type: String,
    enum: [
      'SUBMITTED',
      'SHORTLISTED',
      'REJECTED',
      'INTERVIEW SCHEDULED',
      'OFFER EXTENDED',
      'HIRED'
    ],
    default: 'SUBMITTED'
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career'
  }
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);
