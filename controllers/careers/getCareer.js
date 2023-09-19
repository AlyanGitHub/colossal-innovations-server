const Career = require('../../db/model/career');

async function getCareer(req, res) {
  const { careerID } = req.params;

  if (!careerID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter career ID' });
  }

  try {
    const career = await Career.findById(careerID);
    if (!career) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Career does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: career,
      message: 'Successfully retrieved career',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to retrieve career' });
  }
}

module.exports = getCareer;
