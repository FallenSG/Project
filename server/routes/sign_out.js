const router = require('express').Router()
const passport = require('passport')
const routePlan = require('../route_plan');

const sign_out = routePlan.sign_out;
const index = routePlan.index;

const auth = require('../middleware/authHandler').auth;

router.use(auth);

router.get('/', async(req, res) => {
    res.render(sign_out[2], {post_to: sign_out[0]});
});

router.post('/', async(req, res) => {
    res.cookie('AccessToken', { maxAge: 0 })
    res.render(index[2]);
})

module.exports = router;