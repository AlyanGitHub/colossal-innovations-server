const CareerApplication = require('../../db/model/careerApplication');

async function getAllCareerApplications(req, res) {
  try {
    const careerApplications = await CareerApplication.find({});

    if (careerApplications.length === 0) {
      return res
        .status(400)
        .json({
          success: true,
          data: [],
          message: 'No career applications found'
        });
    }

    return res.status(200).json({
      success: true,
      data: careerApplications,
      message: 'Successfully retrieved all career applications'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        success: false,
        data: [],
        message: 'Failed to retrieve career applications'
      });
  }
}

module.exports = getAllCareerApplications;
