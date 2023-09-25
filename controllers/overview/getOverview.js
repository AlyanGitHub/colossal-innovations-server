const Blog = require('../../db/model/blog');
const Career = require('../../db/model/career');
const Email = require('../../db/model/email');
const Project = require('../../db/model/project');
const User = require('../../db/model/user');
const CareerApplication = require('../../db/model/careerApplication');

async function getOverview(req, res) {
  try {
    const blogsCount = await Blog.countDocuments({});
    const careersCount = await Career.countDocuments({});
    const emailsCount = await Email.countDocuments({});
    const projectsCount = await Project.countDocuments({});
    const usersCount = await User.countDocuments({});
    const careerApplicationsCount = await CareerApplication.countDocuments({});

    const overview = {
      blogs: blogsCount,
      careers: careersCount,
      emails: emailsCount,
      projects: projectsCount,
      users: usersCount,
      careerApplications: careerApplicationsCount
    };

    return res.status(201).json({
      success: true,
      data: overview,
      message: 'Successfully retrieved overview'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Unable to retrieve overview!'
    });
  }
}

module.exports = getOverview;
