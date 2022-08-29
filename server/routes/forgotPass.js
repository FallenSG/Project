const router = require('express').Router();
const mailer = require('../controller/mailHandler')
const config = require('dotenv').config().parsed
const routePlan = require('../route_plan');
const renderFilePath = routePlan.forgotPass[2];

const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);
router.get('/', async(req, res) => {
    res.render(renderFilePath)
});

router.post('/', async(req, res) => {
    const user = await User.findOne({ email: req.body.email }).lean();
    if(user){
        mailer(user.username, user.email, 'Reset')
        res.send("Password reset link is sent to your email..");
    }
    else
        res.send("Un-registed email id...");
});

router.get('/:token', async(req, res) => {
    res.render('forgotPass2', {redirectPath: `/forgot-password/${req.params.token}`});
});

router.post('/:token', async (req, res) => {
    const token = jwt.verify(req.params.token, config.SECRET);

    User.findOne({ email: token.email }, async (err, user) => {
        if(user){
            await User.findOneAndUpdate({ email: token.email }, {
                $set: { password: req.body.pass }
            })

            res.send("Changed")
        }
    })
})

module.exports = router;