const router = require('express').Router();
const config = require('dotenv').config().parsed

const { auth } = require('../middleware/authHandler')

const routePlan = require('../route_plan');
const path = routePlan.sample;

router.get('/', auth, async(req, res) => {
   res.end();
})

router.get('/:token', async(req, res) => {
    res.end();
})

module.exports = router;