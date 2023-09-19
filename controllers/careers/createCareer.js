const Career = require('../../db/model/career');

async function createCareer(req, res) {
  const { title, description, tags, contents, userID } = req.body;

  if (!title || !description || !tags || !contents || !userID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields',
    });
  }

  try {
    const existingCareer = await Career.findOne({ title });

    if (existingCareer) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'A career with this title already exists.',
      });
    }

    const newCareer = await Career.create({
      title,
      description,
      tags,
      contents,
      userID,
    });

    return res.status(201).json({
      success: true,
      data: newCareer,
      message: 'Successfully created career',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create career!' });
  }
}

module.exports = createCareer;
