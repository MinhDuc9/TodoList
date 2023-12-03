const siteRouter = require('./site');
const usersRouter = require('./users');
const todoRouter = require('./todo');

function route(app) {
    app.use('/users', usersRouter);
    app.use('/todo', todoRouter);
    app.use('/', siteRouter);
}

module.exports = route;
