const Email = require('../../db/model/email');
const { transporter } = require('../../mailer');

async function contactUs(req, res) {
  const { name, email, message, subject } = req.body;
  if (!name || !email || !message || !subject) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newEmail = await Email.create({
      name,
      email,
      subject,
      message
    });

    transporter.sendMail(
      {
        from: process.env.TRANSPORTER_USER,
        to: process.env.TRANSPORTER_USER,
        subject: subject,
        text: `Email from: ${name}
Email address: ${email},
Message:
${message}`
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );

    const mailOptions = {
      from: process.env.TRANSPORTER_USER,
      to: email,
      subject: 'Thank You for Contacting Colossal Innovations',
      text: `Hello ${name},
Thank you for reaching out to us. We have received your message and appreciate the time you took to contact us. Your inquiry is important to us, and we will do our best to respond as quickly as possible.
      
Best regards,
Colossal Innovations`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(201).json({
          success: false,
          data: {},
          message: 'Failed to send email'
        });
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(201).json({
      success: true,
      data: newEmail,
      message: 'Successfully saved email'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to save email' });
  }
}

module.exports = contactUs;
