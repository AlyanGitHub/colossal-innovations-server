const Blog = require('../../db/model/blog');

async function getBlog(req, res) {
  const { blogID } = req.params;

  if (!blogID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter blog ID' });
  }

  try {
    const blog = await Blog.findById(blogID);
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Blog does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: blog,
      message: 'Successfully retrieved blog',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve blog',
    });
  }
}

module.exports = getBlog;
