const router = require('express').Router();
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

module.exports = router;