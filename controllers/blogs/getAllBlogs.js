const Blog = require('../../db/model/blog');

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({});

    if (blogs.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No blogs found' });
    }

    return res.status(200).json({
      success: true,
      data: blogs,
      message: 'Successfully retrieved all blogs',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to retrieve blogs' });
  }
}

module.exports = getAllBlogs;
