const express = require('express');
const router = express.Router();
const { notAuthenticated } = require('../app/middleware/AuthMiddleware');

const UserController = require('../app/controllers/UserController');

router.get('/login', notAuthenticated, UserController.login);
router.post('/login', UserController.get_in);
router.get('/register', notAuthenticated, UserController.register);
router.post('/register', UserController.create_user);
router.get('/logout', UserController.logout);

module.exports = router;
