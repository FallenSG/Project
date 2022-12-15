const router = require('express').Router();
const { Book } = require('../models/book');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path="genre");

router.get('/', async(req, res) => {   
    res[renderType](renderFilePath);
});

router.get('/api/:id', async(req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 15;
    
    Book.aggregate([
        { $match: { genre: req.params.id } },
        { $sort: { "totalRating": -1 } },
        { $project: { _id: 1, img: 1, title: 1 } },
        { $skip: page * limit },
        
        { $facet: {
            "books": [ { $limit: limit } ],
            "remainingDoc": [{ $count: "count" }]
        }   
    }]).then((book) => {
            if(book.length) res.status(200).send(book);
            else res.status(204).append('message', "No Such genre Exists").end();
        })
        .catch(err =>  {
            console.log(err);
            res.status(400).send("Error")
        });
});

module.exports = router;