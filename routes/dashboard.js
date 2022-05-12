const router = require('express').Router();

router.get('/', async (req, res) => { 
    res.status(200).json({ msg: "Reached dashboard" });
});

module.exports = router;