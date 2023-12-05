class TodoController {
    // [GET] /todo
    index(req, res, next) {
        const user = req.session.user;
        res.render('todo/index', {
            user: user,
        });
    }
}

module.exports = new TodoController();
