const { transporter } = require('../../mailer');

async function sendEmail(req, res) {
  const { parentEmail, name, email, message, subject } = req.body;
  if (!parentEmail || !name || !email || !message || !subject) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const mailOptions = {
      from: process.env.TRANSPORTER_USER,
      to: email,
      subject,
      text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(201).json({
          success: false,
          data: {},
          message: 'Failed to send email'
        });
      }
    });

    return res.status(201).json({
      success: true,
      data: {},
      message: 'Successfully sent email'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to send email' });
  }
}

module.exports = sendEmail;
