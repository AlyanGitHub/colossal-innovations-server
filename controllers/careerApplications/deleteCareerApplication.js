const CareerApplication = require('../../db/model/careerApplication');

async function deleteCareerApplication(req, res) {
  const { careerApplicationID } = req.params;

  if (!careerApplicationID) {
    return res
      .status(400)
      .json({
        success: false,
        data: {},
        message: 'Please enter career application ID'
      });
  }

  try {
    const careerApplication = await CareerApplication.deleteOne({
      _id: careerApplicationID
    });

    if (careerApplication.deletedCount === 0) {
      return res
        .status(400)
        .json({
          success: false,
          data: {},
          message: 'Career application does not exist'
        });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted career application'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        success: false,
        data: {},
        message: 'Failed to delete career application'
      });
  }
}

module.exports = deleteCareerApplication;
