const router = require('express').Router();
const { Book } = require('../models/book');
const { User } = require('../models/user');

router.get('/', async(req, res) => {
    const searchQuery = new RegExp(req.query.q, 'i'); //for finding books
    const dbQuery = {};
    
    Book.find({ title: searchQuery }, { title: 1 }, { limit: 6 })
        .then(resp => {
            dbQuery['books'] = resp;

            User.aggregate([
                //seperate regex query for author
                { $match: { username: new RegExp(`^[${req.query.q}]`, 'i') } },
                { $match: { book_id: { $exists: true, $ne: [] } } },
                { $project: { username: 1 } }
            ])
                .then(resp => {
                    if (resp.length) dbQuery['author'] = resp;
                    res.send(dbQuery);
                })
                .catch(err => res.send({ err, msg: "Error from User" }))
        })
        .catch(err => res.send({ err, msg: "Error from Book" }));
});

module.exports = router;