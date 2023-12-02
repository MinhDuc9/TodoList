const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.use('/about', SiteController.about);
router.use('/', SiteController.index);

module.exports = router;
