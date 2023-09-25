const multer = require('multer');
const express = require('express');
const router = express.Router();
const path = require('path');

const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const createCareerApplication = require('../controllers/careerApplications/createCareerApplication');
const getAllCareerApplications = require('../controllers/careerApplications/getAllCareerApplications');
const getCareerApplication = require('../controllers/careerApplications/getCareerApplication');
const deleteCareerApplication = require('../controllers/careerApplications/deleteCareerApplication');
const updateCareerApplication = require('../controllers/careerApplications/updateCareerApplication');

// Define storage for uploaded PDFs using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'resumes/'); // Specify the folder where PDFs will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded PDF
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

// Create a multer instance with the defined storage
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

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10 MB limit
//   }
// });
