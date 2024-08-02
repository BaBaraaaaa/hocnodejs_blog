const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
const loginRouter = require('./login');
const registerRouter = require('./register');


function route(app) {
    app.use('/signin', loginRouter);
    app.use('/register', registerRouter);
    app.use('/courses', courseRouter);
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
