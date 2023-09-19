const Project = require('../../db/model/project');

async function updateProject(req, res) {
  const { projectID } = req.params;
  const { image, title, tags, contents } = req.body;

  if (!projectID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter project ID' });
  }

  try {
    const updatedProject = await Project.findById(projectID);
    if (!updatedProject) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Project does not exists' });
    }

    updatedProject.image = image || updatedProject.image;
    updatedProject.title = title || updatedProject.title;
    updatedProject.tags = tags || updatedProject.tags;
    updatedProject.contents = contents || updatedProject.contents;

    await updatedProject.save();

    return res.status(200).json({
      success: true,
      data: updatedProject,
      message: 'Successfully updated project',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update project' });
  }
}

module.exports = updateProject;
