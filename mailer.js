const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.colossalinnovationsco.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@colossalinnovationsco.com',
    pass: 'Z0NtvjRKd'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports.transporter = transporter;
