const router = require('express').Router();
const routePlan = require('../route_plan');
const { auth } = require('../middleware/authHandler')
const jwt = require('jsonwebtoken')
const config = require('dotenv').config().parsed

const tokenSecret = config.TOKEN_SECRET

const path = routePlan.sample;

router.get('/', auth, async(req, res) => {
    const token = jwt.sign({info: req.user}, tokenSecret);
    res.send(token)
})

router.get('/:token', async(req, res) => {
    const payload = jwt.decode(req.params.token, tokenSecret)
    res.send(payload);
})

module.exports = router;