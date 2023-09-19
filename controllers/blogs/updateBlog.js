const Blog = require('../../db/model/blog');

async function updateBlog(req, res) {
  const { blogID } = req.params;
  const { image, title, description, tags, contents } = req.body;

  if (!blogID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter blog ID' });
  }

  try {
    const updatedBlog = await Blog.findById(blogID);
    if (!updatedBlog) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Blog does not exists' });
    }

    updatedBlog.image = image || updatedBlog.image;
    updatedBlog.title = title || updatedBlog.title;
    updatedBlog.description = description || updatedBlog.description;
    updatedBlog.tags = tags || updatedBlog.tags;
    updatedBlog.contents = contents || updatedBlog.contents;

    await updatedBlog.save();

    return res.status(200).json({
      success: true,
      data: updatedBlog,
      message: 'Successfully updated blog',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update blog' });
  }
}

module.exports = updateBlog;
