const siteRouter = require('./site');
const userRouter = require('./user');
const todoRouter = require('./todo');
const adminsiteRouter = require('./admin');

const {
    isAuthenticated,
    isAuthenticatedAdmin,
} = require('../app/middleware/AuthMiddleware');

function route(app) {
    app.use('/users', userRouter);
    app.use('/todo', isAuthenticated, todoRouter);
    app.use('/admin', adminsiteRouter);
    app.use('/', siteRouter);
}

module.exports = route;
