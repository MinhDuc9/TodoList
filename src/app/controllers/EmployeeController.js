const Admin = require('../models/Admin');
const User = require('../models/User');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

const { GetUserInfo } = require('../Functions/GetInfo');

moment.tz.setDefault('Asia/Ho_Chi_Minh').locale('id');

class EmployeeController {
    // [GET] admin/employee/:id
    get_lists(req, res, next) {
        GetUserInfo(req.params.id, req, res, next);

        req.session.user_id = req.params.id;
    }

    // [GET] admin/employee/add
    addTodo(req, res, next) {
        const admin = req.session.admin;
        const email = req.session.email;
        const admin_id = req.session.adminId;
        const userId = req.session.user_id;

        res.render('admin_site/add', {
            admin: admin,
        });
    }

    // [POST] admin/employee/add
    createTodo(req, res, next) {
        const user_id = req.session.user_id;

        const { title, dueDate } = req.body;
        const time = moment(Date.now()).format('DD/MM HH:mm:ss');
        const newTodoItem = {
            title: title,
            dueDate: dueDate,
            time: time,
            _id: new mongoose.Types.ObjectId(),
        };

        User.findOne({ _id: user_id })
            .then((data) => {
                data.todo.push(newTodoItem);
                data.save();
                res.redirect(`/admin/employee/${user_id}`);
            })
            .catch((err) => {
                next(err);
            });
    }

    // [GET] admin/employee/edit/:id
    get_edit(req, res, next) {
        const admin = req.session.admin;
        const email = req.session.email;
        const admin_id = req.session.adminId;
        const userId = req.session.user_id;
        const todoId = req.params.id;

        User.findById(userId)
            .then((data) => {
                let arr = data.todo;

                let index = arr.findIndex((x) => x._id == todoId);

                res.render('admin_site/edit', {
                    admin: admin,
                    todoTitle: arr[index].title,
                    todoDueDate: arr[index].dueDate,
                    ObjectId: arr[index]._id,
                    UserId: userId,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // [POST] admin/employee/edit/
    saveEdit(req, res, next) {
        const { title, dueDate, ObjectId, UserId } = req.body;

        User.findById(UserId)
            .then((data) => {
                let arr = data.todo;

                let index = arr.findIndex((x) => x._id == ObjectId);

                arr[index].title = title;
                arr[index].dueDate = dueDate;

                User.updateOne({ _id: data._id }, { todo: arr })
                    .then(() => {
                        res.redirect(`/admin/employee/${UserId}`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new EmployeeController();
