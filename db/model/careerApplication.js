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
    data: Buffer, // Store the PDF data as binary
    contentType: String // Specify the content type, e.g., 'application/pdf'
  }
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);
