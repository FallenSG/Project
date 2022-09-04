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

router.post('/', passport.authenticate('local', {
    successRedirect: successRedirect, 
    failureRedirect: failureRedirect
}));

module.exports = router;