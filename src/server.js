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

app.use(flash());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
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

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
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
