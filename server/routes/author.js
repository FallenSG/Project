const router = require('express').Router();
const { User } = require('../models/user')

router.get('/:id', async (req, res) => {
    User.find({ _id: req.params.id }, async(err, author) => {
        if(err || !Object.keys(author[0].book_id).length) return res.status(404).send("No Such author");
        res.send({ data: author });
    })
})

module.exports = router;