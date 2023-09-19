const Project = require('../../db/model/project');

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({});

    if (projects.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No projects found' });
    }

    return res.status(200).json({
      success: true,
      data: projects,
      message: 'Successfully retrieved all projects',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: [],
      message: 'Failed to retrieve projects',
    });
  }
}

module.exports = getAllProjects;
