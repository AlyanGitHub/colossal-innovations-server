const express = require('express');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const getAllBlogs = require('../controllers/blogs/getAllBlogs');
const getBlog = require('../controllers/blogs/getBlog');
const deleteBlog = require('../controllers/blogs/deleteBlog');
const createBlog = require('../controllers/blogs/createBlog');
const updateBlog = require('../controllers/blogs/updateBlog');

router.get('/', getAllBlogs);

router.get('/:blogID', getBlog);

router.post('/', checkModeratorOrAdminRole, createBlog);

router.put('/:blogID', checkModeratorOrAdminRole, updateBlog);

router.delete('/:blogID', checkAdminRole, deleteBlog);

module.exports = router;
