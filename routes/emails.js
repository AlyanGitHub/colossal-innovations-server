const express = require('express');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const checkModeratorOrAdminRole = require('../middlewares/checkModeratorOrAdminRole');

const contactUs = require('../controllers/emails/contactUs');
const sendEmail = require('../controllers/emails/sendEmail');
const getAllEmails = require('../controllers/emails/getAllEmails');
const deleteEmail = require('../controllers/emails/deleteEmail');

router.post('/', checkModeratorOrAdminRole, getAllEmails);
router.delete('/:emailID', checkAdminRole, deleteEmail);
router.post('/send-email', checkModeratorOrAdminRole, sendEmail);
router.post('/contact-us', contactUs);

module.exports = router;
