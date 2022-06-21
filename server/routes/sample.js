const router = require('express').Router();
const routePlan = require('../route_plan');

const path = routePlan.sample;

router.get('/', async(req, res) => {
    res.render(path[2]);
})

module.exports = router;