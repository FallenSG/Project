const router = require('express').Router();
const { Book } = require('../models/book');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path="genre");

router.get('/', async(req, res) => {   
    res[renderType](renderFilePath);
});

router.get('/api/:id', async(req, res) => {
    Book.aggregate([
        { $match: { genre: req.params.id } },
        { $sort: { "totalRating": -1 } },
        { $project: { _id: 1, img: 1, title: 1 } }
    ])
        .then((book) => {
            if(book.length) res.status(200).send({ data: book });
            else res.status(204).append('message', "No Such genre Exists").end();
        })
        .catch(err => res.status(400).send({ data: 'Oops!! It Seems There is no book for this genre' }));
});

module.exports = router;