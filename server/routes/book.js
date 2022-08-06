const router = require('express').Router();
const { Book } = require('../models/book')

const { auth } = require('../middleware/authHandler')

router.get('/', async(req, res) => {
    const bookData = await Book.aggregate([
        {
            $facet: {
                popRating: [
                    { $sort: { popRank: -1 } },
                    { $limit: 5 },
                    { $project: { title: 1 } },
                ],

                hotRating: [
                    { $sort: { hotRank: -1 } },
                    { $limit: 5 },
                    { $project: { title: 1 } },
                ],

                ranking: [
                    { $sort: { totalRating: -1 } },
                    { $limit: 5 },
                    { $project: { title: 1 } },
                ],

                newArrival: [
                    { $sort: { pub_date: -1 } },
                    { $limit: 5 },
                    { $project: { title: 1 } },
                ]
            }
        }
    ])
    res.send({ data: bookData });
});

router.get('/:id', auth, async(req, res) => {
    Book.find({ _id: req.params.id }, async(err, book) => {
        if(err) res.status(400).render('error', {message: err});
        res.send({ data: book });
    });
})
module.exports = router 