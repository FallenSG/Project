const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');

const { User } = require('../models/user');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path="pubish");
const { auth, authorAuth } = require('../middleware/authHandler');

const { createBook, modifyBook } = require('../controller/bookHandler');
const idCheck = require('../middleware/idCheck');
const { ChapCreate, OpenChap } = require('../controller/chapHandler');

const upload = multer({
    dest: 'public/bookCover/',
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
});

// router.use(auth);

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
})

router.get('/api', async(req, res) => {
    const id = new ObjectId(req.user.id)
    User.aggregate([
        { $match: { _id: id } },
        { $match: { book_id: { $exists: true, $ne: [] } } },
        { $project: { book_id: 1 } },
        {
            $lookup: {
                from: "books",
                let: { 'bid': "$book_id" },
                pipeline: [
                    { "$match": { "$expr": { "$in": ["$_id", "$$bid"] } } },
                    { $project: { title: 1, img: 1, totalRating: 1, ratingCount: 1 } }
                ],
                as: "book_id"
            }
        },
    ])
        .then((data) => res.send(data[0]))
        .catch((err) => console.log(err)) //logger
})

router.get('/api/:id', idCheck, async(req, res) => {
    const bookId = new ObjectId(req.params.id);

    User.aggregate([
        { $match: { _id: req.user._id } },
        { $match: { book_id: bookId } },
        { $project: { book_id: 1, username: 1 } },
        {
            $lookup: {
                from: "books",
                pipeline: [
                    { $match: { _id: bookId } },
                    { $project: { title: 1, genre: 1, img: 1, publish: 1, draft: 1 } }
                ],
                as: "book_id"
            }
        },
        { $unwind: "$book_id" }
    ])
        .then((books) => res.status(200).send(books[0]))
        .catch((err) => res.send("Oops!! It seems an error happened"))
})

router.get('/list', async (req, res) => res[renderType](renderFilePath));

router.get('/view/:id', async (req, res) => res[renderType](renderFilePath));

router.post('/create', upload.single('bookCover'), createBook);
router.get('/create', async(req, res) => res[renderType](renderFilePath));

router.post('/modify/:id', idCheck, authorAuth, upload.single('bookCover'), modifyBook);
router.get('/modify/:id', async (req, res) => res[renderType](renderFilePath));

router.post('/chapter/create/:id', idCheck, authorAuth, ChapCreate)
router.get('/chapter/create/:id', async (req, res) => res[renderType](renderFilePath));

router.get('/chapter/api/:id', async(req, res) => {
    console.log("Arrived here");
    res.end();
});

module.exports = router;    