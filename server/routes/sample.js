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

// fetch('/library/storeProgress?' + new URLSearchParams({
//         id: "63d2648d373f7fea3fa9d387",
//         chapId: "63d2648d373f7fea3fa9d387"
//     }), {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// }).then(data => console.log(data)).catch(err => console.log(err));

// fetch('/publish/chapter/create/63d2648d373f7fea3fa9d387?q=draft', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: "Sample Chapter",
//         content: <p>What is hope. A question which will change depending upon the person. Even if you are raised toghether definition of hope can change</p>
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// }).then(data => console.log(data)).catch(err => console.log(err));

// fetch('/library/read/63d2648d373f7fea3fa9d387', {
//     method: "GET",
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// }).then(data => console.log(data)).catch(err => console.log(err));