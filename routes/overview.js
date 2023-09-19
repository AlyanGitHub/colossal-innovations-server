const express = require('express');
const getOverview = require('../controllers/overview/getOverview');
const router = express.Router();

router.get('/', getOverview);

module.exports = router;
