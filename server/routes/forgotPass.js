const router = require('express').Router();
const mailer = require('../controller/mailHandler')

const { User } = require('../models/user')
const forgotPass = require('../models/forgotPass');

const { isAuthReq } = require('../middleware/authHandler');

const { Direct, renderType } = require('../routePlan');
const {
    renderFilePath, redirectUrl
} = Direct()

async function tokenVerifier(req, res, next) {
    const resetReq = await forgotPass.findOne({ token: req.params.token });
    if(resetReq){
        return next()
    }
    res.redirect(redirectUrl);
}

router.use(isAuthReq);
router.get('/', async(req, res) => {
    res[renderType](renderFilePath)
});

router.post('/', async(req, res) => {
    try{
        forgotPass.findOne({ email: req.body.email }, async(err, data) => {
            if(data) res.send("Reset request already exist. Try creating new one after 2 hrs..!!");
            else{
                User.findOne({ email: req.body.email }, async(err, user) => {
                    if (user) {
                        mailer(user.username, user.email, 'Reset')
                        res.send("Password reset link is sent to your email..");
                    }
                    else res.send("Un-registered email id")
                }).lean();
            }
        })
    } catch(err) {
        res.send("An Error occur. Please try again after sometime")
    }
});

router.get('/:token', tokenVerifier, async(req, res) => {
    res[renderType](renderFilePath);
});

router.post('/:token', tokenVerifier, async (req, res) => {
    await User.findOneAndUpdate({ email: req.email }, {
        $set: { password: req.body.pass }
    })

    forgotPass.deleteOne({ token: req.params.token }, (err, data) => { });
    res.send("Changed")
})


module.exports = router;