const CareerApplication = require('../../db/model/careerApplication');

async function updateCareerApplication(req, res) {
  const { careerApplicationID } = req.params;
  const { fullName, email, phone, resume, applicationStatus, additionalNotes } =
    req.body;

  if (!careerApplicationID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter career application ID'
    });
  }

  try {
    const updatedCareerApplication = await CareerApplication.findById(
      careerApplicationID
    );
    if (!updatedCareerApplication) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Career application does not exists'
      });
    }

    updatedCareerApplication.fullName =
      fullName || updatedCareerApplication.fullName;
    updatedCareerApplication.email = email || updatedCareerApplication.email;
    updatedCareerApplication.phone = phone || updatedCareerApplication.phone;
    updatedCareerApplication.resume = resume || updatedCareerApplication.resume;
    updatedCareerApplication.additionalNotes =
      additionalNotes || updatedCareerApplication.additionalNotes;
    updatedCareerApplication.applicationStatus =
      applicationStatus || updatedCareerApplication.applicationStatus;

    await updatedCareerApplication.save();

    return res.status(200).json({
      success: true,
      data: updatedCareerApplication,
      message: 'Successfully updated career application'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to update career application'
    });
  }
}

module.exports = updateCareerApplication;
