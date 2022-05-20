const router = require('express').Router();
const routePlan = require('../route_plan');

router.get('/', async(req, res) => {
    res.render(routePlan.index[2]);
});

router.use(routePlan.dash[0], require(routePlan.dash[1]));
router.use(routePlan.sign_up[0], require(routePlan.sign_up[1]));
router.use(routePlan.sign_in[0], require(routePlan.sign_in[1]));
router.use(routePlan.sign_out[0], require(routePlan.sign_out[1]));

router.use('/*', async(req, res) => {
    res.redirect('/');
});

module.exports = router