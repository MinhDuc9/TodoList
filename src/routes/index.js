const siteRouter = require('./site');
const userRouter = require('./user');
const todoRouter = require('./todo');

function route(app) {
    app.use('/users', userRouter);
    app.use('/todo', todoRouter);
    app.use('/', siteRouter);
}

module.exports = route;
