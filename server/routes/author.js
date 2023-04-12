const router = require('express').Router();
const { User } = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

const { Direct, renderType } = require('../routePlan');
const { renderFilePath, redirectUrl } = Direct(path = "author", failure="index");
const idCheck = require('../middleware/idCheck');

router.get('/:id', async(req, res) => {
    res[renderType](renderFilePath);
});

router.get('/api/:id', idCheck, async (req, res) => {
    const id = new ObjectId(req.params.id);
    User.aggregate([
        { $match: { _id: id } },
        { $match: { book_id: { $exists: true, $ne: [] } } },
        { $project: { username: 1, book_id: 1 } },
        {
            $lookup: {
                "from": "books",
                "let": { 'bid': "$book_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$in": ["$_id", "$$bid"] } } },
                    { "$project": { _id: 1, img: 1, title: 1, summary: 1, totalRating: 1, ratingCount: 1 } }
                ],
                as: "book_id"
            }
        }
    ])
        .then((author) => {
            if(author[0])
                return res.status(200).send(author[0]) 
            return res.redirect(redirectUrl);
        })
        .catch( err => res.status(400).send(err) );

})

module.exports = router;