// const User = require('../models/User');
// const { mongooseToObject } = require('../../ulti/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('index');
    }

    // [GET] /about
    about(req, res, next) {
        res.render('about');
    }
}

module.exports = new SiteController();
