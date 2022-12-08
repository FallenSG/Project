const router = require('express').Router();
const { User } = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
    User.aggregate([
        { $match: { _id: id } },
        { $match: { book_id: { $exists: true, $ne: [] } } },
        { $project: { username: 1, book_id: 1 } }
    ])
        .then( (data) => res.send({data}) )
        .catch( err => res.status(400).send(err) );

})

module.exports = router;