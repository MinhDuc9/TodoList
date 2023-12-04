const { User } = require('../models/User');

function checkEmail(email) {
    let users = User.find({ email: email });
    if (users !== null) {
        console.log(users.email);
        return users.email;
    } else {
        return false;
    }
}
module.exports.checkEmail = checkEmail;
