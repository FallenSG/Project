const router = require('express').Router()

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
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(redirectUrl);
    });
})

module.exports = router;