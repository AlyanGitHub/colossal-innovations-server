const Project = require('../../db/model/project');

async function createProject(req, res) {
  const { title, image, tags, contents, userID } = req.body;

  if (!title || !image || !tags || !contents || !userID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields',
    });
  }

  try {
    const existingCareer = await Project.findOne({ title });

    if (existingCareer) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'A project with this title already exists.',
      });
    }

    const newProject = await Project.create({
      title,
      image,
      tags,
      contents,
      userID,
    });

    return res.status(201).json({
      success: true,
      data: newProject,
      message: 'Successfully created project',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create project' });
  }
}

module.exports = createProject;
