const siteRouter = require('./site');
const userRouter = require('./user');

function route(app) {
    app.use('/users', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
