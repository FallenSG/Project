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
            if(data) res.status(403).send({msg: "Reset request already exist. Try creating new one after 2 hrs..!!"});
            else{
                User.findOne({ email: req.body.email }, async(err, user) => {
                    if (user) {
                        const resp = await mailer(user.username, user.email, 'Reset')
                        res.status(resp.code).send({ msg: resp.msg });
                    }
                    else res.status(401).send({msg: "Un-registered email id"})
                }).lean();
            }
        })
    } catch(err) {
        res.status(503).send({msg: "An Error occured. Please try again after sometime!!"})
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
    res.status(200).json({msg: "Password Updated.."})
})


module.exports = router;