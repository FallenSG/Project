const fs = require('fs')
const path = require('path')
const ObjectId = require('mongoose').Types.ObjectId;

const { User } = require('../models/user');
const { Book } = require('../models/book');

const Path = path.join(__dirname, '..', 'chapter');

async function ChapCreate(req, res){
    const id = ObjectId(req.params.id);
    const appendType = req.query.q;

    try{
        if(appendType !== 'publish' && appendType !== 'draft') 
            throw new Error("Invalid Request");
        
        const date = new Date();
        const fileName = `${id}_${date.getTime()}`
        const filePath = `${Path}/${fileName}`

        const TitleExist = await Book.aggregate([
            { $match: { _id: id } },
            {
                $project: {
                    found: { $concatArrays: [ "$draft","$publish" ]
                    }
                }
            },
            { $unwind: "$found" },
            {
                $match: { "found.0": req.body.title }
            },
            { $limit: 1 }
        ])

        if(TitleExist.length)
            throw new Error("Chapter with same title already exists");

        fs.writeFile(filePath, req.body.content, err => {
            if(err){
                // console.log(err) //logger
                res.status(500).send("Error happened while trying to write chapter. Please try again later")
            }
            
            const upData = { 
                $push: { 
                    [appendType]: [ req.body.title, fileName ]
                }
            };

            Book.findOneAndUpdate({ _id: id }, upData)
                .then(data => res.status(200).send({msg: "Chapter Added", chpId: fileName }))
                .catch(err => {
                    fs.unlink(filePath, (err) => {
                        //logger
                    })
                    res.status(403).send("Couldn't add your chapter in the Collection.")
                })
        })
    } catch(err){
        // console.log(err); //logger
        res.status(403).send(err.message)
    }
}

async function ChapEdit(req, res) {
    const appendType = req.query.q;

    try {
        if (appendType !== 'publish' && appendType !== 'draft')
            throw new Error("Invalid Request");

        const chapId = req.params.id;
        const title = req.body.title;
        const id = req.body.id;
        if (!ObjectId.isValid(id) || !((String)(new ObjectId(id)) === id)) 
            throw new Error("Not Valid Id");
        
        const bookId = ObjectId(id);
        const data = await User.findOne({ _id: req.user._id, book_id: bookId })
        if(!data)
            throw new Error("Invalid request")

        const ValidEdit = await Book.aggregate([
            {
                $match: { _id: bookId }
            },
            { $project: { draft: 1 } },
            { $unwind: "$draft" },
            {
                $facet: {
                    exist: [
                        { $match: { "draft.1": chapId } }
                    ],
                    titleMatch: [
                        { $match: { "draft.0": title } }
                    ]
                }
            }
        ])

        if(!ValidEdit[0].exist.length) 
            throw new Error("Un-authorised access");
        if (ValidEdit[0].titleMatch.length && ValidEdit[0].titleMatch[0].draft[1] !== chapId)
            throw new Error("Chapter with same title already exists")

        const filePath = `${Path}/${chapId}`
        fs.writeFile(filePath, req.body.content, async(err) => {
            if(err){
                //logger
                res.status(500).send("Error happened while trying to edit chapter. Please try again later")
            }

            if(!ValidEdit[0].titleMatch.length){
                await Book.updateOne(
                    {
                        _id: bookId,
                        draft: {
                            $elemMatch: { $elemMatch: { $eq: chapId } }
                        }
                    },
                    {
                        $set: { "draft.$[elem].0": req.body.title }
                    },
                    {
                        arrayFilters: [{ "elem.1": chapId }]
                    }
                )
            }

            if(appendType === 'publish'){
                await Book.updateOne(
                    { _id: bookId },
                    [
                        {
                            $set: {
                                selected: {
                                    $filter: {
                                        input: "$draft",
                                        cond: {
                                            $eq: [
                                                { $arrayElemAt: ["$$this", 1] },
                                                chapId
                                            ]
                                        }
                                    }
                                },
                                draft: {
                                    $filter: {
                                        input: "$draft",
                                        cond: {
                                            $ne: [
                                                { $arrayElemAt: ["$$this", 1] },
                                                chapId
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $set: {
                                publish: {
                                    $concatArrays: ["$publish", "$selected"]
                                },
                                selected: "$$REMOVE"
                            }
                        }
                    ]
                )
            }

            res.status(200).send("Edit Completed");
        });   
    } catch(err) {
        // consle.log(err) //logger necessary
        res.status(400).end()
    }
}

async function ChapFetch(req, res) {
    const file = req.params.id
    fs.readFile(`${Path}/${file}`, { encoding: "utf8" }, async (err, ChapData) => {
        if (err) {
            // console.log(err); //logger
            return res.status(400).send("Error Fetching Chapter Please try again");
        }
        Book.aggregate([
            {
                $project: {
                    found: {
                        $concatArrays: ["$draft", "$publish"]
                    }
                }
            },
            { $unwind: "$found" },
            {
                $match: { "found.1": file }
            },
            {
                $project: {
                    _id: 0,
                    bookInfo: "$found"
                }
            }
        ])
            .then((data) => {
                res.status(200).send({chapter: ChapData, ...data[0]})
            })
            .catch(err => res.status(400).send("Error"))
    })
} 

async function ChapDelete(req, res){
    const appendType = req.query.q
    try {
        if (appendType !== 'publish' && appendType !== 'draft')
            throw new Error("Invalid Request");

        const chapId = req.params.id;
        const id = chapId.split("_")[0]
        if (!ObjectId.isValid(id) || !((String)(new ObjectId(id)) === id))
            throw new Error("Not Valid Id");

        const bookId = ObjectId(id);
        const data = await User.findOne({ _id: req.user._id, book_id: bookId })
        if (!data)
            throw new Error("Invalid request")

        const chap = await Book.findOneAndUpdate({ _id: bookId },
            { $pull: { [appendType]: { $elemMatch: { $eq: chapId } } } }
        )

        fs.unlink(`${Path}/${chapId}`, (err) => {
            if(err) //logger
            res.status(200).send("Request Completed");
        })
    } catch(err) {
        //logger
        res.status(400).send(err.message);
    }
}
module.exports = { ChapCreate, ChapEdit, ChapFetch, ChapDelete }