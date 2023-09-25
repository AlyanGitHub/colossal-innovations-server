const path = require('path');
const CareerApplication = require('../../db/model/careerApplication');

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

    // Store the PDF file URL directly in MongoDB
    const newCareerApplication = await CareerApplication.create({
      fullName,
      email,
      phone,
      career,
      resumeURL: pdfFileURL
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
