const CareerApplication = require('../../db/model/careerApplication');

async function getCareerApplication(req, res) {
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

    return res.status(200).json({
      success: true,
      data: careerApplication,
      message: 'Successfully retrieved career application'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve career application'
    });
  }
}

module.exports = getCareerApplication;
