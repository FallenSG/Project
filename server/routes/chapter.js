const router = require('express').Router();
const { OpenChap } = require('../controller/chapHandler');

router.get('/api/:id', OpenChap);

module.exports = router;