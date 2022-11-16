const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('./models/user');

module.exports = (passport) => {
    // passport local strategy
    const authUser = (email, password, done) => {
        User.findOne({ email: email }, function(err, user){
            if(err) return done(err);

            if(!user || !user.verify) 
                return done(null, false, {message: "Wrong Credentials"});

            if(user.verify){
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        return done(null, false, {message: "Wrong Credentials"})
                    }
                    return done(null, user)
                })
            }
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