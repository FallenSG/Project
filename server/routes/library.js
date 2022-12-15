const router = require('express').Router();
const { User } = require('../models/user');

const { auth } = require('../middleware/authHandler');

router.use(auth);

router.get('/api', async(req, res) => {
    User.find({ _id: req.user.id })
        .populate({
            path: 'lib',
            select: { _id: 1, title: 1, img: 1 }
        }).lean()
        .then((library) => {
            var data = library[0].lib;
            if(!data.length) 
                res.status(204).append('message', "Library is Empty").end();
            else res.status(200).send(data)
        })
        .catch((err) => { 
            // console.log(err) logger
            res.send("Oops!! It seems an error happened");
        })
    
})

module.exports = router