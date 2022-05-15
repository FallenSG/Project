const router = require('express').Router();

const dash = require('./dashboard');
const sign_up = require('./sign_up');
const sign_in = require('./sign_in');

router.use('/', dash);
router.use("/sign_up", sign_up);
router.use("/sign_in", sign_in);

module.exports = router