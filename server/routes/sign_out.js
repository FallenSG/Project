const router = require('express').Router()
const routePlan = require('../route_plan');

const sign_out = routePlan.sign_out;
const index = routePlan.index;

const { auth, isAuthReq } = require('../middleware/authHandler');

router.get('/', auth, async(req, res) => {
    res.render(sign_out[2], {post_to: sign_out[0]});
});

router.post('/', auth, async(req, res) => {
    req.logout();
    res.render(index[2]);
})

module.exports = router;