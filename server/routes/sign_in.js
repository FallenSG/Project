const router = require('express').Router();
<<<<<<< HEAD
const passport = require('passport');

const routePlan = require('../route_plan');
const successRedirectUrl = routePlan.dash[0];
const failureRedirectUrl = routePlan.sign_in[0];
const renderFilePath = routePlan.sign_in[2];

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);

router.get('/', async(req, res) => {
    res.render(renderFilePath, {post_to: failureRedirectUrl});
});

router.post('/', passport.authenticate('local', {
    successRedirect: successRedirectUrl, 
    failureRedirect: failureRedirectUrl
}));
=======
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('dotenv').config().parsed
const routePlan = require('../route_plan');
 
const sign_in = routePlan.sign_in;
const dash = routePlan.dash;

const isAuthReq = require('../middleware/authHandler').isAuthReq;
router.use(isAuthReq);

router.get('/', async(req, res) => {
    res.render(sign_in[2], {post_to: sign_in[0]});
    // res.sendFile(sign_in[2])
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
            const user =  await User.findOne({ email: email })
            
            if(!user){
                throw Error('No such user exist');
            }

            const validate = await user.isValidPassword(password);
            
            if(!validate){
                throw Error('Wrong Credentials entered');
            }
            
            const payload = {
                id: user._id.toString(),
            }

            var token = jwt.sign(payload, config.TOKEN_SECRET, {
                algorithm: "HS256", 
                expiresIn: config.jwtExpirySeconds * 1000
            })
        
            res.cookie('AccessToken', token, {
                httpOnly: true,
                maxAge: config.jwtExpirySeconds * 1000
            })

            req.user = user;
            res.redirect('/dashboard');
        } catch (error) {
            res.redirect('/sign_in');
        }
})
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5

module.exports = router;