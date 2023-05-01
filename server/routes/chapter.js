const router = require('express').Router();
const fs = require('fs')
const path = require('path')
const ObjectId = require('mongoose').Types.ObjectId;

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct();

const Path = path.join(__dirname, '..', 'chapter');

const { OpenChap } = require('../controller/chapHandler');
const { Book } = require('../models/book');

router.get('/:id', async(req, res) => res[renderType](renderFilePath))

router.get('/api/:id', async(req, res) => {
    const file = req.params.id;
    fs.readFile(`${Path}/${file}`, { encoding: "utf8" }, async (err, ChapData) => {
        if(err){ 
            console.log(err); //logger
            return res.send("Error Fetching Chapter Please try again");
        }
        
        const bookID = new ObjectId(file.split('_')[0]);
    
        const info = await Book.aggregate([
            { $match: { _id: bookID } },
            { $unwind: "$publish" },
            {
                $facet: {
                    prevChap: [
                        { $match: { "publish.1": { $lt: file } } },
                        { $sort: { "publish.1": -1 } },
                        { $limit: 1 },

                    ],
                    nextChap: [
                        { $match: { "publish.1": { $gt: file } } },
                        { $limit: 1 }
                    ],
                    bookInfo: [
                        { $match: { "publish.1": file } },
                        { $project: { title: 1, _id: 1, publish: 1 } },
                        { $limit: 1 }
                    ]
                }
            },
            {
                $project: {
                    prevChap: { $arrayElemAt: ["$prevChap.publish", 0] },
                    nextChap: { $arrayElemAt: ["$nextChap.publish", 0] },
                    bookInfo: { $arrayElemAt: ["$bookInfo", 0] }
                }
            }
        ])
        
        res.send({ chapter: ChapData, ...info[0] })
    })
});

module.exports = router;