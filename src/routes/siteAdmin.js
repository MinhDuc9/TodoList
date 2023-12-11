const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');

router.get('/login', AdminController.get_login);
router.post('/login', AdminController.login);
router.get('/register', AdminController.get_register);
router.post('/register', AdminController.register);
router.get('/', AdminController.index);

module.exports = router;
