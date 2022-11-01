const router = require('express').Router();
const { Book } = require('../models/book')

const { auth } = require('../middleware/authHandler')
const limit = 8
const project = { title: 1, img: 1 }

router.get('/', async(req, res) => {
    const bookData = await Book.aggregate([
        {
            $facet: {
                popRating: [
                    { $sort: { popRank: -1 } },
                    { $limit: limit },
                    { $project: project },
                ],

                hotRating: [
                    { $sort: { hotRank: -1 } },
                    { $limit: limit },
                    { $project: project },
                ],

                ranking: [
                    { $sort: { totalRating: -1 } },
                    { $limit: limit },
                    { $project: project },
                ],

                newArrival: [
                    { $sort: { pub_date: -1 } },
                    { $limit: limit },
                    { $project: project },
                ]
            }
        }
    ])
    
    res.json({ data: bookData })
});

router.get('/api/:id', async(req, res) => {
    Book.find({ _id: req.params.id }, async(err, book) => {
        if(err) return res.status(400).send("No such book exist");
        res.send({ data: book });
    });
})
module.exports = router 