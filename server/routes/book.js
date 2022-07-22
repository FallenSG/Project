const router = require('express').Router();
const Book = require('../models/book')
const fs = require('fs');

const { auth } = require('../middleware/authHandler')

var defCover;
fs.readFile('public/defCover', (err, data) => {
    if (err) console.log(err);
    else {
        defCover = data;
    }
});

router.get('/', async(req, res) => {
    const bookData = await Book.find({});
    res.send({data: bookData, defCover: defCover});
});

router.get('/:id', auth, async(req, res) => {
    Book.find({_id: req.params.id}, async(err, book) => {
        if(err) res.status(400).render('error', {message: err});
        res.send({data: book, defCover: defCover});
    });
})
module.exports = router 