const router = require('express').Router();
const passport = require('passport');

const { Direct, renderType } = require('../routePlan');
const { 
    renderFilePath, failureRedirect, successRedirect 
} = Direct(failure='signIn', success='dash')

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
});

router.post('/', async(req, res, next) => {
    passport.authenticate('local', function(err, user, info){
        if(err){
            return res.status(401).json(err);
        }
        if(!user){
            return res.status(401).json(info);
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect(successRedirect);
        });
    })(req, res, next);
});

module.exports = router;