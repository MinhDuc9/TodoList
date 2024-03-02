const User = require('../models/User');

const passport = require('passport');
const bcrypt = require('bcrypt');

const RegisterEmployee = require('../Functions/RegisterEmployee');

class UserController {
    // [GET] /users/login
    login(req, res, next) {
        res.render('login');
    }

    // [POST] /users/register
    register(req, res, next) {
        res.render('register', {
            Address: '/users/register',
        });
    }

    // [POST] /users/login
    get_in(req, res, next) {
        const { email, password } = req.body;

        User.findOne({ email: email })
            .then((data) => {
                if (data !== null) {
                    const myPlaintextPassword = password;
                    bcrypt.compare(
                        myPlaintextPassword,
                        data.password,
                        function (err, result) {
                            if (result) {
                                req.session.user = data.name;
                                req.session.email = data.email;
                                req.session.userId = data._id;
                                res.redirect('/todo');
                            } else {
                                res.render('login', {
                                    message: 'Wrong password',
                                    messageClass: 'alert-danger',
                                });
                            }
                        },
                    );
                } else {
                    res.render('login', {
                        message: 'Wrong email',
                        messageClass: 'alert-danger',
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
    }

    // [POST] /users/register
    async create_user(req, res, next) {
        await RegisterEmployee(req, res, next);

        // Render login page with success message
        res.render('login', {
            message: 'Registration successful. Please log in to continue.',
            messageClass: 'alert-success',
        });
    }

    // [GET] /users/logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Redirect to the login page or any other desired page after logout
                res.redirect('/');
            }
        });
    }

    get_delete(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;

        const Address = '/users/delete';

        res.render('delete', {
            user: user,
            email: email,
            address: Address,
        });
    }

    delete_acc(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;

        const result = req.body.resp;

        if (result === 'no') {
            res.redirect('/todo');
        } else {
            User.deleteOne({ _id: user_id })
                .then(() => {
                    req.session.destroy((err) => {
                        if (err) {
                            console.error('Error destroying session:', err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            // Redirect to the login page or any other desired page after logout
                            res.redirect('/');
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    get_edit(req, res, next) {
        const user = req.session.user;
        const email = req.session.email;
        const user_id = req.session.userId;

        res.render('edit_user', {
            user: user,
            email: email,
        });
    }

    edit_user(req, res, next) {
        const user_id = req.session.userId;

        const { name, email } = req.body;

        User.findByIdAndUpdate(user_id, { name, email }, { new: true })
            .then((data) => {
                req.session.user = data.name;
                req.session.email = data.email;
                req.session.userId = data._id;
                res.redirect('/todo');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new UserController();
