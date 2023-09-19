const CareerApplication = require('../../db/model/careerApplication');

async function createCareerApplication(req, res) {
  const { fullName, email, phone } = req.body;
  const resume = req.file;
  console.log('RESUME BUFFER: ', resume.buffer);
  if (!fullName || !email || !phone || !resume) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields and attach a resume file'
    });
  }

  const resumeData = resume.buffer; // Access the file buffer
  const resumeContentType = resume.mimetype; // Get the content type

  try {
    const newCareerApplication = await CareerApplication.create({
      fullName,
      email,
      phone,
      resume: {
        data: resumeData,
        contentType: resumeContentType
      }
    });

    return res.status(201).json({
      success: true,
      data: newCareerApplication,
      message: 'Successfully created career application'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to create career application!'
    });
  }
}

module.exports = createCareerApplication;
