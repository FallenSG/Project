const router = require('express').Router();
const config = require('dotenv').config().parsed

router.get('/', async (req, res) => {
    console.log(req.user)
    res.send(req.session);
});

router.post('/', async(req, res) => {
    console.log(req.params)
    res.send("recieved")
})
module.exports = router;

// fetch('/review/addItem', {
//     method: 'POST',
//     body: JSON.stringify({
//         rating: 2,
//         comment: "sample review",
//         id: "63d35cc990ba93cfd1031f57"
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// }).then(data => console.log(data)).catch(err => console.log(err));