const express = require('express');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const getAllCareers = require('../controllers/careers/getAllCareers');
const getCareer = require('../controllers/careers/getCareer');
const createCareer = require('../controllers/careers/createCareer');
const updateCareer = require('../controllers/careers/updateCareer');
const deleteCareer = require('../controllers/careers/deleteCareer');

router.get('/', getAllCareers);

router.get('/:careerID', getCareer);

router.post('/', checkModeratorOrAdminRole, createCareer);

router.put('/:careerID', checkModeratorOrAdminRole, updateCareer);

router.delete('/:careerID', checkAdminRole, deleteCareer);

module.exports = router;
