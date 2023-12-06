const siteRouter = require('./site');
const userRouter = require('./user');
const todoRouter = require('./todo');

const { isAuthenticated } = require('../app/middleware/AuthMiddleware');

function route(app) {
    app.use('/users', userRouter);
    app.use('/todo', isAuthenticated, todoRouter);
    app.use('/', siteRouter);
}

module.exports = route;
