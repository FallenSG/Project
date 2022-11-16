const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const { Book } = require('../models/book')

const { auth } = require('../middleware/authHandler');
const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct(path='bookModify')

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

router.get('/:id', async(req, res) => {
    Book.findById({ _id: req.params.id }, async (err, book) => {
        if(err) return res.status(400).send("No such book");
        res[renderType](renderFilePath, { path: `/bookModify/${req.params.id}` });
    })
});

router.post('/:id', upload.single('bookCover'), async (req, res) => {
    
    const book = await Book.findOneAndUpdate(
        { _id: req.params.id }, 
        { img: req.file? req.file.path.substr(6) : 'bookCover/defCover' }
    );

    if(book.img !== 'bookCover/defCover'){
        fs.unlink(`public/${book.img}`, (err) => {
            //if any logger
        })
    }
    res.send({ msg: "old Book data", book });
})

module.exports = router;