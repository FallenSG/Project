const router = require('express').Router();
const config = require('dotenv').config().parsed

router.get('/', async (req, res) => {
    res.send('finished');
});

module.exports = router;