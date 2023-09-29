const CareerApplication = require('../../db/model/careerApplication');
const { transporter } = require('../../mailer');

async function createCareerApplication(req, res) {
  const { fullName, email, phone, career } = req.body;
  if ((!fullName || !email || !phone, !career)) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields and attach a resume file'
    });
  }

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please attach a resume file'
      });
    }

    const filePath = req.file.path;

    // Convert backslashes to forward slashes in the file path
    const sanitizedFilePath = filePath.replace(/\\/g, '/');

    // Create a URL to access the PDF file
    const pdfFileURL = `${req.protocol}://${req.get(
      'host'
    )}/${sanitizedFilePath}`;

    const newCareerApplication = await CareerApplication.create({
      fullName,
      email,
      phone,
      career,
      resumeURL: pdfFileURL
    });

    transporter.sendMail(
      {
        from: process.env.TRANSPORTER_USER,
        to: process.env.TRANSPORTER_USER,
        subject: `${fullName}'s career application`,
        text: `Email from: ${fullName}
Email address: ${email},
Phone: ${phone}
resumeURL: ${pdfFileURL}`
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
      text: `Hello ${fullName},
Thank you for applying to Colossal Innovations. We've received your application and appreciate your interest in joining our team.

Our team will carefully review your application and will be in touch with updates. If you have any immediate questions, please don't hesitate to reach out to our HR team at info@colossalinnovationsco.com.
      
We look forward to the possibility of working with you.

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
        // do something useful
      }
    });

    return res.status(201).json({
      success: true,
      data: newCareerApplication,
      message: 'Successfully created career application'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to create career application!'
    });
  }
}

module.exports = createCareerApplication;
