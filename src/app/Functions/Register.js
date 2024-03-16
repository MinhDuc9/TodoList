const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');

const RegisterEmployee = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return res.render('register', {
                message: 'Please provide name, email, and password.',
                messageClass: 'alert-danger',
            });
        }

        // Check if password meets minimum length requirement
        if (password.length < 6 || confirmPassword.length < 6) {
            return res.render('register', {
                message: 'Password must be at least 6 characters long.',
                messageClass: 'alert-danger',
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match.',
                messageClass: 'alert-danger',
            });
        }

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', {
                message: 'Email is already registered.',
                messageClass: 'alert-danger',
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();
    } catch (error) {
        // Handle any errors
        console.error('Error in registerUser:', error);
        res.status(500).render('error', {
            message: 'Internal Server Error',
            messageClass: 'alert-danger',
        });
    }
};


const RegisterAdmin = async (req, res, next) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return res.render('register', {
                message: 'Please provide name, email, and password.',
                messageClass: 'alert-danger',
            });
        }

        // Check if password meets minimum length requirement
        if (password.length < 6 || confirmPassword.length < 6) {
            return res.render('register', {
                message: 'Password must be at least 6 characters long.',
                messageClass: 'alert-danger',
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match.',
                messageClass: 'alert-danger',
            });
        }

        const existingAdmin = await Admin.findOne({ email: email })
        if (existingAdmin) {
            return res.render('register', {
                message: 'Email is already registered.',
                messageClass: 'alert-danger',
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newAdmin.save();
    } catch (err) {
        // Handle any errors
        console.error('Error in registerUser:', error);
        res.status(500).render('error', {
            message: 'Internal Server Error',
            messageClass: 'alert-danger',
        });
    }
}

module.exports = RegisterEmployee, RegisterAdmin;
