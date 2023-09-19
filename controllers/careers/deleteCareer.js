const Career = require('../../db/model/career');

async function deleteCareer(req, res) {
  const { careerID } = req.params;

  if (!careerID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter career ID' });
  }

  try {
    const career = await Career.deleteOne({ _id: careerID });
    if (career.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Career does not exist' });
    }
    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted career',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete career!' });
  }
}

module.exports = deleteCareer;
