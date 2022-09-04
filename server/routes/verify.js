const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('dotenv').config().parsed;
const mailer = require('../controller/mailHandler');

const { User } = require('../models/user')

const { isAuthReq } = require('../middleware/authHandler');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath, redirectUrl } = Direct();


router.use(isAuthReq);
router.get('/token-expire', async(req, res) => {
    res[renderType](renderFilePath);
});

router.post('/token-expire', async(req, res) => {
    User.findOne({ email: req.email }, async(err, user) => {
        if(err) res.redirect(redirectUrl);
        if(user && !user.verify) mailer(user.username, user.email);
    })
});

router.get('/:token', async(req, res) => {
    try{
        const { email } = jwt.verify(req.params.token, config.SECRET);
        await User.findOneAndUpdate({ email: email }, {
            $set: { verify: true }
        });
        
        res.send("Welcome ...")
    } catch(err){
        if(err.message === 'jwt expired'){
            res.redirect('/verify/token-expire');
        }
        res.redirect(redirectUrl);
    }
})

module.exports = router;