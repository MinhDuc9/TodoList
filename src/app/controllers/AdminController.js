const Admin = require('../models/Admin');
const User = require('../models/User');

const bcrypt = require('bcrypt');

class AdminController {
    // [GET] /admin/
    index(req, res, next) {
        const admin = req.session.admin;
        const email = req.session.email;
        const admin_id = req.session.adminId;

        if (admin !== undefined) {
            User.find({})
                .then((data) => {
                    res.render('admin_site/index', {
                        employees: data,
                        admin: admin,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            res.redirect('/admin/login');
        }
    }

    // [GET] /admin/login
    get_login(req, res, next) {
        res.render('login_admin');
    }

    // [GET] /admin/register
    get_register(req, res, next) {
        res.render('register_admin');
    }

    // [GET] /admin/login
    login(req, res, next) {
        const { email, password } = req.body;

        Admin.findOne({ email: email })
            .then((data) => {
                if (data !== null) {
                    const myPlaintextPassword = password;
                    bcrypt.compare(
                        myPlaintextPassword,
                        data.password,
                        function (err, result) {
                            if (result) {
                                req.session.admin = data.name;
                                req.session.email = data.email;
                                req.session.adminId = data._id;
                                res.redirect('/admin');
                            } else {
                                res.render('login_admin', {
                                    message: 'Wrong password',
                                    messageClass: 'alert-danger',
                                });
                            }
                        },
                    );
                } else {
                    res.render('login_admin', {
                        message: 'Wrong email',
                        messageClass: 'alert-danger',
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
    }

    // [POST] /admin/register
    register(req, res, next) {
        try {
            let { name, email, password, confirmPassword } = req.body;
            if (
                name == '' ||
                email == '' ||
                password == '' ||
                confirmPassword == ''
            ) {
                res.render('register', {
                    message: 'Input Name, Email and Password!',
                    messageClass: 'alert-danger',
                });
                return;
            }
            if (password.length < 6 || confirmPassword < 6) {
                res.render('register', {
                    message: 'Password must be at least 6 characters',
                    messageClass: 'alert-danger',
                });
                return;
            }
            if (password === confirmPassword) {
                Admin.findOne({ email: email })
                    .then((data) => {
                        if (data === null) {
                            const saltRounds = 10;
                            const salt = bcrypt.genSaltSync(saltRounds);
                            const myPlaintextPassword = password;
                            bcrypt.hash(
                                myPlaintextPassword,
                                salt,
                                function (err, hash) {
                                    const new_user = {
                                        name,
                                        email,
                                        password: hash,
                                    };

                                    const savetoDB = new Admin(new_user);
                                    savetoDB.save();
                                    res.render('login_admin', {
                                        message:
                                            'Registration Complete. Please login to continue.',
                                        messageClass: 'alert-success',
                                    });
                                },
                            );
                        } else {
                            res.render('register_admin', {
                                message: 'Email have already been registered',
                                messageClass: 'alert-danger',
                            });
                        }
                    })
                    .catch((err) => {
                        next(err);
                    });
            } else {
                res.render('register_admin', {
                    message: 'Password does not match.',
                    messageClass: 'alert-danger',
                });
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    // [POST] /admin/logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Redirect to the login page or any other desired page after logout
                res.redirect('/admin/login');
            }
        });
    }
}

module.exports = new AdminController();
