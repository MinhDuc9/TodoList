class TodoController {
    // [GET] /todo
    index(req, res, next) {
        res.render('todo/index');
    }
}

module.exports = new TodoController();
