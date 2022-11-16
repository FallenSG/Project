const router = require('express').Router();
const { User } = require('../models/user');

const { auth } = require('../middleware/authHandler');

router.use(auth);

router.get('/api', async(req, res) => {
    User.find({ _id: req.user.id }) //req.user.id
        .populate({
            path: 'lib',
            select: { _id: 1, title: 1, img: 1 }
        })
        .then(library => res.send({ data: library[0].lib }))
        .catch((err) => { 
            console.log(err)
            res.send(err);
        })
    
})

module.exports = router