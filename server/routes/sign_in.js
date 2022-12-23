const router = require('express').Router();
const passport = require('passport');

const { Direct, renderType } = require('../routePlan');
const { 
    renderFilePath, failureRedirect, successRedirect 
} = Direct(path="signIn", failure='signIn', success='dash')

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
});

router.post('/', async(req, res, next) => {
    passport.authenticate('local', function(err, user, info){
        if(err){
            return res.status(401).send(err);
        }
        if(!user){
            return res.status(401).send(info.message );
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send("Logged In sucessfully");
        });
    })(req, res, next);
});

module.exports = router;