const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const fs = require('fs');

const { Book } = require('../models/book')
const { User } = require('../models/user');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path="pubish");
const { auth } = require('../middleware/authHandler');

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

router.use(auth);

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
    // res.send([
    //     { "_id": "63d2648d373f7fea3fa9d387", "title": "Sample", "img": "/bookCover/defCover", "totalRating": 0, "ratingCount": 0, "chapCount": 0 },
    //     { "_id": "63d35c783fd90caed291b9d9", "title": "Sample2kj vkjfjjsfkjd jkfgjkjfgjgfjgfkgkjrj djfs js f[e jj jgfjj fpke fpperpfd ep jrp trj jkrprk prtp pprfkfjlggf;'", "img": "/bookCover/defCover", "totalRating": 0, "ratingCount": 0, "chapCount": 0 },
    //     { "_id": "63d35cc990ba93cfd1031f57", "title": "Sample3", "img": "/bookCover/defCover", "totalRating": 0, "ratingCount": 0, "chapCount": 0 },
    //     { "_id": "63d35d0490ba93cfd1031f66", "title": "Sample5", "img": "/bookCover/defCover", "totalRating": 0, "ratingCount": 0, "chapCount": 0 }
    // ])
})

router.get('/api/:id', async(req, res) => {
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
                    { $project: { title: 1, genre: 1, img: 1, chapter: 1, draft: 1 } }
                ],
                as: "book_id"
            }
        },
        { $unwind: "$book_id" }
    ])
        .then((books) => res.status(200).send(books[0]))
        .catch((err) => res.send("Oops!! It seems an error happened"))
    // res.send({
    //     "_id": {
    //         "$oid": "63b12ba67aa2688cedf11fcc"
    //     },
    //     "username": "fallen",
    //     "book_id": {
    //         "_id": {
    //             "$oid": "63d2648d373f7fea3fa9d387"
    //         },
    //         "title": "Sample",
    //         "genre": [
    //             "Fantasy"
    //         ],
    //         "img": "/bookCover/defCover",
    //         "chapter": [],
    //         "draft": [
    //             {path: "/sampleId_chpter4", date: 1677323603870},
    //             {path: "/sampleId_chpter3", date: 1676323593860},
    //             {path: "/sampleId_chpter2", date: 1675323583856},
    //             {path: "/sampleId_chpter1", date: 1674323573850}
    //         ]
    //     }
    // })
})

router.post('/modify/:id', upload.single('bookCover') , async (req, res) => {
    let book = {}

    if(req.file) book.img = req.file.path.substr(6); 
    if(req.body.title) book.title = req.body.title;
    if(req.body.isbn) book.isbn = req.body.isbn;
    if(req.body.genre) book.genre = req.body.genre.split(',').map((val) => val.toLowerCase());
    if(req.body.summary) book.summary = req.body.summary;

    try{
        var ExistBook;
        if(book.isbn)
            ExistBook = await Book.findOne({ isbn: book.isbn });
        
        if(book.title) 
            ExistBook = await Book.findOne({ title: book.title });

        if(ExistBook)
            throw new Error("Book with Same Title/ISBN Already Exists!!");
        
        Book.findOneAndUpdate(
            { _id: req.params.id },
            { $set: book }
        )
            .then((UpdBook) => {
                res.send(`Book Updated: ${UpdBook}`);
            })
            .catch((err) => { throw new Error(`Error happened while Saving \n ${err}`) })
        
    } catch(err){
        if (book.img !== '/bookCover/defCover') {
            fs.unlink(`public/${book.img}`, (err) => {
                // if(err) logger
            })
        }
        res.status(403).send(err.message)
    }
});

module.exports = router;    