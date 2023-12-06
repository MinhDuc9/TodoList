const User = require('../models/User');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

moment.tz.setDefault('Asia/Ho_Chi_Minh').locale('id');

class TodoController {
    // [GET] /todo
    index(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;

        User.findOne({ email: email })
            .then((data) => {
                const currentDate = moment();

                let arr = data.todo;
                let arr_time = []
                arr.forEach((x) => {
                    let singleObj = {};
                    let deadline = moment(x.dueDate);
                    singleObj['daysLeft'] = deadline.diff(currentDate, 'days');
                    singleObj['hoursLeft'] = deadline.diff(currentDate, 'hours');
                    arr_time.push(singleObj)
                });

                // res.json({ test: arr_time })

                res.render('todo/index', {
                    user: user,
                    todos: data.todo,
                    timeData: arr_time,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    // [GET] /todo/add
    addTodo(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;

        res.render('todo/add', {
            user: user,
        });
    }

    // [POST] /todo
    createTodo(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;

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
                res.redirect('/todo');
            })
            .catch((err) => {
                next(err);
            });
    }

    // [GET] /todo/edit/:id
    editTodo(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;
        let todoId = req.params.id;

        User.findOne({ email: email })
            .then((data) => {
                let arr = data.todo;

                let index = arr.findIndex((x) => x._id == todoId);

                res.render('todo/edit', {
                    user: user,
                    todoTitle: arr[index].title,
                    todoDueDate: arr[index].dueDate,
                    ObjectId: arr[index]._id,
                    UserId: user_id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // [POST] /todo/edit/
    saveEditTodo(req, res, next) {
        const email = req.session.email;
        const { title, dueDate, ObjectId, UserId } = req.body;

        User.findOne({ email: email })
            .then((data) => {
                let arr = data.todo;

                let index = arr.findIndex((x) => x._id == ObjectId);

                arr[index].title = title;
                arr[index].dueDate = dueDate;

                User.updateOne({ _id: data._id }, { todo: arr })
                    .then(() => {
                        res.redirect('/todo');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // [POST] /todo/delete
    deleteTodo(req, res, next) {
        const email = req.session.email;
        const { id } = req.body;

        User.findOne({ email: email })
            .then((data) => {
                let arr = data.todo;

                arr = arr.filter((x) => x._id != id);

                User.updateOne({ _id: data._id }, { todo: arr })
                    .then(() => {
                        res.redirect('/todo');
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

module.exports = new TodoController();
