const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');
const EmployeeController = require('../app/controllers/EmployeeController');

router.get('/login', AdminController.get_login);
router.post('/login', AdminController.login);

router.get('/register', AdminController.get_register);
router.post('/register', AdminController.register);

router.post('/employee/delete', EmployeeController.deleteTodo);

router.get('/employee/add', EmployeeController.addTodo);
router.post('/employee/add', EmployeeController.createTodo);

router.get('/employee/edit/:id', EmployeeController.get_edit);
router.post('/employee/edit/', EmployeeController.saveEdit);

router.get('/employee/:id', EmployeeController.get_lists);

router.get('/', AdminController.index);

module.exports = router;
