const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const port = 3000;

// Routes
const route = require('./routes');
const db = require('./config/db');

// Connect to MongoDB
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        genid: (req) => {
            // Implement your logic to generate a new session ID
            // This function can access req object and customize the ID
            return 'custom_session_id';
        },
    }),
);
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
// require('./app/middleware/PassportMiddleware')(passport);

app.use(flash());

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            employeeName: (employee) => {
                return employee.name;
            },
            employeeEmail: (employee) => {
                return employee.email;
            },
            employeeId: (employee) => {
                return employee._id;
            },
            exist: function (a, b, options) {
                if (
                    (typeof a !== 'undefined' && a !== null) ||
                    (typeof b !== 'undefined' && b !== null)
                ) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
