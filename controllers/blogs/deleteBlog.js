const Blog = require('../../db/model/blog');

async function deleteBlog(req, res) {
  const { blogID } = req.params;

  if (!blogID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter blog ID' });
  }

  try {
    const blog = await Blog.deleteOne({ _id: blogID });

    if (blog.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Blog does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted blog',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete blog' });
  }
}

module.exports = deleteBlog;
