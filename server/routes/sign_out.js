const router = require('express').Router()
<<<<<<< HEAD
=======
const passport = require('passport')
const routePlan = require('../route_plan');
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5

const { auth } = require('../middleware/authHandler');

const routePlan = require('../route_plan');
const renderUrl = routePlan.sign_out[0]
const renderFilePath = routePlan.sign_out[2];
const redirectUrl = routePlan.index[0];


router.use(auth);

router.get('/', async(req, res) => {
    res.render(renderFilePath, {post_to: renderUrl});
});

router.post('/', async(req, res) => {
<<<<<<< HEAD
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(redirectUrl);
    });
=======
    res.cookie('AccessToken', { maxAge: 0 })
    res.render(index[2]);
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5
})

module.exports = router;