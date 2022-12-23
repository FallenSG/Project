const router = require('express').Router();
const { Book } = require('../models/book');
const ObjectId = require('mongoose').Types.ObjectId;

const { Direct, renderType } = require('../routePlan')
const { renderFilePath } = Direct(path="ranking");

const rankingType = {
    'newest': "pub_date",
    'popular': "popRank",
    'hot': "hotRank",
    'all': "totalRating"
}

router.get('/:rankingType', async(req, res) => {
    res[renderType](renderFilePath);
});

router.get('/api/:id', async(req, res) => {
    var sort = {};
    sort[rankingType[req.params.id]] = -1;

    const page = parseInt(req.query.page) || 0;
    const limit = 15;

    Book.aggregate([
        { $sort: sort },
        { $project: { _id: 1, img: 1, title: 1, summary: 1, totalRating: 1, ratingCount: 1 } },
        { $skip: page * limit },

        {
            $facet: {
                "books": [{ $limit: limit }],
                "remainingDoc": [{ $count: "count" }]
            }
        }
    ]).then((book) => {
        if (book.length) res.status(200).send(book);
        else res.status(204).append('message', "Wrong Ranking Type").end();
    })
        .catch(err => {
            res.status(400).send("Error")
        })
})

module.exports = router;