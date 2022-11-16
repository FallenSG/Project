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
    Book.find({ _id: req.params.id })
        .populate({
            path: 'author_id',
            select: { username: 1 }
        })
        .then(book => res.send({ data: book[0] }))
        .catch(err => res.status(400).send("No Such Book Exists"))
})
module.exports = router 