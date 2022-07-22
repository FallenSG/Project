const router = require('express').Router();
const User = require('../models/user');

const  auth = require('../middleware/authHandler').auth;

router.use(auth);

router.get('/', async (req, res) => { 
    User.findOne({ _id: req.user.id }, (err, user) => {
        if(err) return res.status(404).json({ msg: err.details[0].message });
        res.status(200).json({ userInfo: user });
    })
});

module.exports = router;