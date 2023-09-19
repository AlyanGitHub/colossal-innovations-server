const Career = require('../../db/model/career');

async function getAllCareers(req, res) {
  try {
    const careers = await Career.find({});
    if (careers.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: 'No careers exists' });
    }

    return res.status(200).json({
      success: true,
      data: careers,
      message: 'Successfully retrieved careers',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: [],
      message: 'Failed to retrieve careers!',
    });
  }
}

module.exports = getAllCareers;
