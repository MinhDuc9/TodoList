const User = require('../models/User');

class TodoController {
    // [GET] /todo
    index(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;

        User.findOne({ email: email }).then((data) => {
            res.render('todo/index', {
                user: user,
            });
        });
        // res.render('todo/index', {
        //     user: user,
        // });
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

        const newTodoItem = {
            text: 'Buy groceries',
            completed: false,
        };

        // res.render('todo/index', {
        //     user: user,
        //     todos: data.todo
        // })
        User.find({ _id: user_id }).then((data) => {
            res.json({ test: data });
        });
        // res.json({ test: req.body, test2: user_id });
    }
}

module.exports = new TodoController();
