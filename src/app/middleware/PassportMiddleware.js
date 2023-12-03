const LocalStrategy = require('passport-local').Strategy;
const { getHashedPassword } = require('../controllers/Functions');
const { Users } = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            let hashed = getHashedPassword(password)
            Users.findOne({email: email}).then(users => {
                if (!users) return done(null, false, {
                        message: 'That email is not registered',
                    })
                if (email === users.email && hashed === users.password) {
                    return done(null, users);
                } else {
                    return done(null, false, {
                        message: 'Invalid username or password',
                    })
                }
            })
        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
          done(err, user);
        });
      });
}