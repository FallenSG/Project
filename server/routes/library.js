const router = require('express').Router();
const { User } = require('../models/user');
const { Book } = require('../models/book')
const ObjectId = require('mongoose').Types.ObjectId;

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path = "library");
const { auth } = require('../middleware/authHandler');
const idCheck = require('../middleware/idCheck')

router.use(auth);

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
});

router.get('/api', async(req, res) => {
    User.aggregate([
        { $match: { _id: req.user._id } },
        { $unwind: "$lib" },
        {
            $lookup: {
                from: "books",
                localField: "lib._id",
                foreignField: "_id",
                as: "out"
            }
        },
        {
            $addFields: {

                "lib.title": { $arrayElemAt: ["$out.title", 0] },
                "lib.img": { $arrayElemAt: ["$out.img", 0] }
            }
        },
        { $group: { _id: "$_id", lib: { $push: "$lib" } } }
    ])
        .then((library) => {
            var data = library[0].lib;
            if(!data.length) 
                res.status(204).append('message', "Library is Empty").end();
            else res.status(200).send(data)
        })
        .catch((err) => { 
            // console.log(err) logger
            res.send([]);
        })
    
})

router.post('/addItem', idCheck, async(req, res) => {
    const bookId = ObjectId(req.body.id);

    User.find({ _id: req.user._id, "lib._id": bookId })
        .then(data => {
            if(data.length) return res.status(409).send("Book Already in Library") 
            else{
                Book.findOne({ _id: bookId })
                    .then(book => {
                        if (!book)
                            return res.status(409).send("No such Book");
                        const date = new Date().getTime();
                        User.findOneAndUpdate({ _id: req.user._id }, {
                            $push: {
                                lib: {
                                    _id: book._id,
                                    added: date,
                                    read: date
                                }
                            }
                        })
                            .then(data => res.status(200).send("Added"))
                            .catch(err => { throw new Error("Couldn't add book to your library") })
                    })
                    .catch(err => { throw new Error(err) })
            }
        })
        .catch(err => { res.status(409).send(err) });
})

router.post('/removeItem', idCheck, async(req, res) => {
    const bookId = ObjectId(req.body.id);

    User.updateOne({ _id: req.user._id, "lib._id": bookId }, {
        $pull: { lib: { _id: bookId } }
    })
        .then((data) => {
            res.status(200).send("Book Removed from Library");
        })
        .catch(err => {
            res.end();
        })
})

router.post('/storeProgress', idCheck, async(req, res) => {
    const bookID = ObjectId(req.body.id);
    const chap = req.body.chapId

    User.updateOne({ _id: req.user._id, "lib._id": bookID },
        { $set: { "lib.$.lastRead": chap } }
    )
        .then((data) => res.status(200).send("Progress Saved"))
        .catch(() => res.end())
})

router.get('/read/:id', idCheck, async(req, res) => {
    const book = ObjectId(req.params.id);

    try {
        const date = new Date().getTime();

        let out = await User.aggregate([
            { $match: { _id: req.user._id } },
            { $unwind: "$lib" },
            { $match: { "lib._id": book } },
            { $project: { _id: 0, lastRead: "$lib.lastRead" } }
        ])

        const lastRead = out.length ? out[0].lastRead : "0";

        Book.aggregate([
            { $match: { _id: book } },
            { $unwind: "$publish" },
            { $match: { "publish.1": { $gt: lastRead } } },
            { $limit: 1 },
            { $project: { _id: 0, read: "$publish" } }
        ])
            .then(async (data) => {
                await User.updateOne({ _id: req.user._id, "lib._id": book },
                { $set: { "lib.$.read": date } }
                )
                res.status(200).send(data[0])
            })
            .catch(err => res.status(400).send("Error"));
    } catch(err) {
        //logger
    }
    
})

module.exports = router