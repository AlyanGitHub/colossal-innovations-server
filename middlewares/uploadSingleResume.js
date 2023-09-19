const multer = require('./multer');

function uploadSingleResume(req, res, next) {
  multer.single('resume')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Failed to upload file'
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        data: {},
        message: 'Failed to upload file due to server error'
      });
    }
    next();
  });
}

module.exports = uploadSingleResume;
