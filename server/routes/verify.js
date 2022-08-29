const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('dotenv').config().parsed

const { User } = require('../models/user')

const routePlan = require('../route_plan');

const { isAuthReq } = require('../middleware/authHandler');

router.use(isAuthReq);
router.get('/:token', async(req, res) => {
    const { email } = jwt.verify(req.params.token, config.SECRET);

    await User.findOneAndUpdate({ email: email }, {
        $set: { verify: true }
    });

    res.send("Welcome ...")
})

module.exports = router;