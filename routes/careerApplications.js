const multer = require('multer');
const express = require('express');
const router = express.Router();

const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const createCareerApplication = require('../controllers/careerApplications/createCareerApplication');
const getAllCareerApplications = require('../controllers/careerApplications/getAllCareerApplications');
const getCareerApplication = require('../controllers/careerApplications/getCareerApplication');
const deleteCareerApplication = require('../controllers/careerApplications/deleteCareerApplication');
const updateCareerApplication = require('../controllers/careerApplications/updateCareerApplication');

const storage = multer.memoryStorage(); // Use memory storage to store the file in memory
const upload = multer({ storage: storage });

router.get('/', getAllCareerApplications);

router.get('/:careerApplicationID', getCareerApplication);

router.post('/', upload.single('resume'), createCareerApplication);

router.put(
  '/:careerApplicationID',
  checkModeratorOrAdminRole,
  updateCareerApplication
);

router.delete('/:careerApplicationID', checkAdminRole, deleteCareerApplication);

module.exports = router;
