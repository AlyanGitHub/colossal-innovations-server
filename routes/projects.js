const express = require('express');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const createProject = require('../controllers/projects/createProject');
const getAllProjects = require('../controllers/projects/getAllProjects');
const getProject = require('../controllers/projects/getProject');
const updateProject = require('../controllers/projects/updateProject');
const deleteProject = require('../controllers/projects/deleteProject');

router.get('/', getAllProjects);

router.get('/:projectID', getProject);

router.post('/', checkModeratorOrAdminRole, createProject);

router.put('/:projectID', checkModeratorOrAdminRole, updateProject);

router.delete('/:projectID', checkAdminRole, deleteProject);

module.exports = router;
