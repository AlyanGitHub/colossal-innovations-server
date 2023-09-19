const Project = require('../../db/model/project');

async function deleteProject(req, res) {
  const { projectID } = req.params;

  if (!projectID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter project ID' });
  }

  try {
    const project = await Project.deleteOne({ _id: projectID });

    if (project.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Project does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted project',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete project' });
  }
}

module.exports = deleteProject;
