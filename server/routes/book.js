const router = require('express').Router();
const { Book } = require('../models/book')
const ObjectId = require('mongoose').Types.ObjectId;

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path = "book");

const limit =  8;
const project = { title: 1, img: 1 };

router.get('/', async(req, res) => {
    Book.aggregate([
        {
            $facet: {
                popRating: [
                    { $sort: { popRank: -1 } },
                    { $limit: limit },
                    { $project: project }
                ],

                hotRating: [
                    { $sort: { hotRank: -1 } },
                    { $limit: limit },
                    { $project: project }
                ],

                all: [
                    { $sort: { totalRating: -1 } },
                    { $limit: limit },
                    { $project: project }
                ],

                newArrival: [
                    { $sort: { pub_date: -1 } },
                    { $limit: limit },
                    { $project: project }
                ]
            }
        }
    ])
        .then((data) => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
});

router.get('/:id', async(req, res) => {
    res[renderType](renderFilePath);
})

router.get('/api/:id', async(req, res) => {
    const id = new ObjectId(req.params.id)
    const recd = req.query.recd === '1';

    Book.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                "from": "users",
                "let": { "userId": "$author_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$userId"] } } },
                    { "$project": { "username": 1, _id: 1 } }
                ],
                as: "author_id"
            }
        },
        { $unwind: "$author_id" },
        {
            $lookup: {
                from: "books",
                let: { genre: "$genre" },
                pipeline: [
                    { $match: { $expr: { $eq: [recd, true] } } },
                    {
                        $addFields: {
                            "count": { $size: { $setIntersection: ["$$genre", "$genre"] } }
                        }
                    },
                    { $sort: { "count": -1 } },
                    { $limit: 6 },
                    { $project: { _id: 1, title: 1, img: 1 } },
                    { $match: { _id: { $ne: id } } }
                ],
                as: "recd"
            }
        },
        {
            $project: { isbn: 0, hotRank: 0, popRank: 0 }
        }
        
    ])
        .then((book) => {
            if(book.length) res.status(200).send(book[0]);
            else res.status(204).append('message', "No Such Book Exists").end();
        })
        .catch(err => res.status(400).send("Try Again After Sometime!!" ))
})
module.exports = router 