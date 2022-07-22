const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user');

module.exports = (passport) => {
    // passport local strategy
    const authUser = (email, password, done) => {
        User.findOne({ email: email }, function(err, user){
            if(err) return done(err);

            if(!user) return done(null, false);

            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err)
                }
                if (!isValid) {
                    return done(null, false)
                }
                return done(null, user)
            })
        })
    }

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, function(err, user){
            done(err, user)
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authUser));
}