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
            res.send("Oops!! It seems an error happened");
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

router.post('/removeItem', async(req, res) => {

})

module.exports = router