const router = require('express').Router();
const passport = require('passport');
const routePlan = require('../route_plan');

const sign_in = routePlan.sign_in;
const dash = routePlan.dash;

const { auth, isAuthReq } = require('../middleware/authHandler');
const User = require('../models/user');

router.get('/', isAuthReq, async(req, res) => {
    res.render(sign_in[2], {post_to: sign_in[0]});
});

router.post('/', passport.authenticate('local', {
    successRedirect: dash[0], 
    failureRedirect: sign_in[0]
}));

module.exports = router;