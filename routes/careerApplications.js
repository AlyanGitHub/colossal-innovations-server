const multer = require('multer');
const express = require('express');
const router = express.Router();
const createCareerApplication = require('../controllers/careerApplications/createCareerApplication');

const getAllCareerApplications = require('../controllers/careerApplications/getAllCareerApplications');

const storage = multer.memoryStorage(); // Use memory storage to store the file in memory
const upload = multer({ storage: storage });

router.get('/', getAllCareerApplications);

router.post('/', upload.single('resume'), createCareerApplication);

module.exports = router;
