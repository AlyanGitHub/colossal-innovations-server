const Career = require('../../db/model/career');

async function updateCareer(req, res) {
  const { careerID } = req.params;
  const { title, description, tags, contents } = req.body;

  if (!careerID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter career ID' });
  }

  try {
    const updatedCareer = await Career.findById(careerID);

    if (!updatedCareer) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Career does not exists' });
    }

    updatedCareer.title = title || updatedCareer.title;
    updatedCareer.description = description || updatedCareer.description;
    updatedCareer.tags = tags || updatedCareer.tags;
    updatedCareer.contents = contents || updatedCareer.contents;

    await updatedCareer.save();

    return res.status(200).json({
      success: true,
      data: updatedCareer,
      message: 'Successfully updated career',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update career!' });
  }
}

module.exports = updateCareer;
