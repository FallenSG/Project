const router = require('express').Router();
const config = require('dotenv').config().parsed

router.get('/', async (req, res) => {
    res.send('finished');
});

router.post('/', async(req, res) => {
    console.log(req.params)
    res.send("recieved")
})
module.exports = router;