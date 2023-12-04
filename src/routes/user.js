const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');

router.get('/login', UserController.login);
router.post('/login', UserController.get_in);
router.get('/register', UserController.register);
router.post('/register', UserController.create_user);

module.exports = router;
