const router = require('express').Router();
<<<<<<< HEAD
const config = require('dotenv').config().parsed

const { auth } = require('../middleware/authHandler')
=======
const routePlan = require('../route_plan');
const { auth } = require('../middleware/authHandler')
const jwt = require('jsonwebtoken')
const config = require('dotenv').config().parsed

const tokenSecret = config.TOKEN_SECRET
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5

const routePlan = require('../route_plan');
const path = routePlan.sample;

router.get('/', auth, async(req, res) => {
<<<<<<< HEAD
   res.end();
})

router.get('/:token', async(req, res) => {
    res.end();
=======
    const token = jwt.sign({info: req.user}, tokenSecret);
    res.send(token)
})

router.get('/:token', async(req, res) => {
    const payload = jwt.decode(req.params.token, tokenSecret)
    res.send(payload);
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5
})

module.exports = router;