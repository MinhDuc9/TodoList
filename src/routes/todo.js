const express = require('express');
const router = express.Router();
const {
    notAuthenticated,
    isAuthenticated,
} = require('../app/middleware/AuthMiddleware');

const TodoController = require('../app/controllers/TodoController');

router.get('/', TodoController.index);

module.exports = router;
