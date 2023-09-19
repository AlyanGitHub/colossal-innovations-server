const Blog = require('../../db/model/blog');

async function createBlog(req, res) {
  const { image, title, description, tags, contents, userID } = req.body;

  if (!image || !title || !description || !tags || !contents || !userID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields',
    });
  }

  try {
    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        data: {},
        message: 'A blog with this title already exists.',
      });
    }

    const newBlog = await Blog.create({
      image,
      title,
      description,
      tags,
      contents,
      userID,
    });

    return res.status(201).json({
      success: true,
      data: newBlog,
      message: 'Successfully created blog',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create blog' });
  }
}

module.exports = createBlog;
