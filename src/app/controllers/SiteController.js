const User = require('../models/User');

class SiteController {
    // [GET] /
    index(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;

        if (user !== undefined) {
            res.redirect('/todo');
        } else {
            res.render('index', {
                title: 'Minh Duc - ToDo',
            });
        }
    }

    // [GET] /about
    about(req, res, next) {
        res.render('about');
    }
}

module.exports = new SiteController();
