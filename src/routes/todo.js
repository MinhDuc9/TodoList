const express = require('express');
const router = express.Router();
const {
    notAuthenticated,
    isAuthenticated,
} = require('../app/middleware/AuthMiddleware');

const TodoController = require('../app/controllers/TodoController');

router.get('/edit/:id', TodoController.editTodo);
router.post('/edit', TodoController.saveEditTodo);
router.post('/delete', TodoController.deleteTodo);
router.get('/add', TodoController.addTodo);
router.post('/', TodoController.createTodo);
router.get('/', TodoController.index);

module.exports = router;
