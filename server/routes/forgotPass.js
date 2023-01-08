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
    forgotPass.findOne({ token: req.params.token }, (err, resetReq) => {
        if(resetReq){
            return next()
        }
        res.redirect(redirectUrl);
    });
}

router.use(isAuthReq);
router.get('/', async(req, res) => {
    res[renderType](renderFilePath)
});

router.post('/', async(req, res) => {
    try{
        forgotPass.findOne({ email: req.body.email }, async(err, data) => {
            if(data) res.status(403).send("Reset request already exist. Try creating new one after 2 hrs..!!");
            else{
                User.findOne({ email: req.body.email }, async(err, user) => {
                    if (user) {
                        const resp = await mailer(user.username, user.email, 'Reset')
                        res.status(resp.code).send(resp.msg );
                    }
                    else res.status(401).send("Un-registered email id")
                }).lean();
            }
        })
    } catch(err) {
        res.status(503).send("An Error occured. Please try again after sometime!!")
    }
});

router.get('/:token', tokenVerifier, async(req, res) => {
    res[renderType](renderFilePath);
});

router.post('/:token', tokenVerifier, async (req, res) => {
    User.findOneAndUpdate({ email: req.email }, {
        $set: { password: req.body.pass }
    }).then(data => {
        forgotPass.deleteOne(
            { token: req.params.token }
        ).then(data => res.status(200).send("Password Updated.." ))
        .catch(err => { throw new Error({ from: "Deleting forgot pass token", err }) });
    }).catch(err => console.log(err)); //logger
})


module.exports = router;