const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');
const { checkEmail } = require('../middleware/AuthMiddleware');

const bcrypt = require('bcrypt');

class UserController {
    // [GET] /users/login
    login(req, res, next) {
        res.render('login');
    }

    // [POST] /users/register
    register(req, res, next) {
        res.render('register');
    }

    // [POST] /users/login
    get_in(req, res, next) {
        res.send('Success');
    }

    // [POST] /users/register
    create_user(req, res, next) {
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
                User.findOne({ email: email })
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

                                    const savetoDB = new User(new_user);
                                    savetoDB.save();
                                    res.render('login', {
                                        message:
                                            'Registration Complete. Please login to continue.',
                                        messageClass: 'alert-success',
                                    });
                                },
                            );
                        } else {
                            res.render('register', {
                                message: 'Email have already been registered',
                                messageClass: 'alert-danger',
                            });
                        }
                    })
                    .catch((err) => {
                        next(err);
                    });
            } else {
                res.render('register', {
                    message: 'Password does not match.',
                    messageClass: 'alert-danger',
                });
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserController();
