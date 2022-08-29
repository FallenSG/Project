const router = require('express').Router();
const passport = require('passport');

const routePlan = require('../route_plan');
const successRedirectUrl = routePlan.dash[0];
const failureRedirectUrl = routePlan.sign_in[0];
const renderFilePath = routePlan.sign_in[2];

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);

router.get('/', async(req, res) => {
    res.render(renderFilePath);
});

router.post('/', passport.authenticate('local', {
    successRedirect: successRedirectUrl, 
    failureRedirect: failureRedirectUrl
}));

module.exports = router;