const router = require('express').Router();
const fs = require('fs')
const path = require('path')
const ObjectId = require('mongoose').Types.ObjectId;
const { Book } = require('../models/book');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct();

const Path = path.join(__dirname, '..', 'chapter');

const idCheck = require('../middleware/idCheck')
const { auth } = require('../middleware/authHandler')

router.use(auth)

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

router.get('/list/:id', idCheck, async(req, res) => {
    const id = ObjectId(req.params.id);
    Book.aggregate([
        { $match: { _id: id } },
        { $project: { publish: 1 } }
    ])
        .then(book => res.status(200).send(book[0]))
        .catch(err => res.status(400).send("Try Again After Sometime!!"))
})  

module.exports = router;