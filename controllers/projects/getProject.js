const Project = require('../../db/model/project');

async function getProject(req, res) {
  const { projectID } = req.params;

  if (!projectID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter project ID' });
  }

  try {
    const project = await Project.findById(projectID);
    if (!project) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Project does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: project,
      message: 'Successfully retrieved project',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve project',
    });
  }
}

module.exports = getProject;
