const router = require('express').Router();
const config = require('dotenv').config().parsed

const { User } = require('../models/user')

const { auth } = require('../middleware/authHandler')

const routePlan = require('../route_plan');
const path = routePlan.sample;

router.get('/', async (req, res) => {
    const user = await User.updateMany({}, {
        $set: { verify: true }
    });
    res.send(user);  
});

router.get('/:token', async(req, res) => {
    res.end();
})

module.exports = router;