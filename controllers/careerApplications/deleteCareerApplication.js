const CareerApplication = require('../../db/model/careerApplication');
const fs = require('fs');
const path = require('path');
const url = require('url');

async function deleteCareerApplication(req, res) {
  const { careerApplicationID } = req.params;

  if (!careerApplicationID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter career application ID'
    });
  }

  try {
    const careerApplication = await CareerApplication.findById(
      careerApplicationID
    );

    if (!careerApplication) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Career application does not exist'
      });
    }

    await CareerApplication.deleteOne({
      _id: careerApplicationID
    });

    const resumeFileName = careerApplication.resumeURL.split('resumes/')[1];
    const resumeFilePath = path.join(
      __dirname,
      '../../resumes/',
      resumeFileName
    );

    if (fs.existsSync(resumeFilePath)) {
      fs.unlinkSync(resumeFilePath);
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted career application'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to delete career application'
    });
  }
}

module.exports = deleteCareerApplication;
