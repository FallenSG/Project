const router = require('express').Router();
const passport = require('passport');

const { auth, isAuthReq } = require('../middleware/authHandler');
const User = require('../models/user');

router.get('/', isAuthReq, async(req, res) => {
    res.render('sign_in');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/sign_in'
}));

module.exports = router;