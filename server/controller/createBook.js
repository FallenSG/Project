const fs = require('fs');

const { Book, JoiValidBook } = require('../models/book');
const { User } = require('../models/user');

//isbn validatipon
function checkISBN(isbn) {
    var isbn = isbn.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
    let s = 0, t = 0;

    //10 digit isbn check
    if (isbn.length === 10) {
        for (let i = 0; i < 9; i++) {
            t += isbn[i] - '0';
            s += t;
        }
        s = (11 - (s + t) % 11) % 11;
        return s === (isbn[9] - '0') ? true : isbn[9] === 'X' && s === 10 ? true : false;
    }

    //for 13 digit long isbn
    else if (isbn.length === 13) {
        for (let i = 0; i < 12; i++) {
            s += (i % 2 * 2 + 1) * (isbn[i] - '0');
        }
        s = (10 - s % 10) % 10;
        return s === (isbn[12] - '0') ? true : false;
    }

    return false;
}

//takes data posted and form it in a readable format
//then validate/sanitize it against schema
//if error arises or book already exists a msg is passed on
//else book creation process is executed 
async function createBook(req, res) {
    let book = {
        img: req.file ? req.file.path.substr(6) : '/bookCover/defCover',
        title: req.body.title.toLowerCase(),
        isbn: req.body.isbn,
        genre: [ req.body.genre ],
        author_id: req.user._id,
        summary: req.body.summary !== "" ? req.body.summary : "Summary need to be updated please check after sometime",
        pub_date: new Date().getTime() / 1000
    }

    try {
        var ExistBook;
        if(book.isbn){
            ExistBook = await Book.findOne({
                $or: [
                    { title: book.title },
                    { isbn: book.isbn }
                ]
            });
        }
        else ExistBook = await Book.findOne({ title: book.title })
        
        if (ExistBook)
            throw new Error("Book with same Title/ISBN already exists!!");

        if (book.isbn && !checkISBN(book.isbn))
            throw new Error("Please Enter Valid ISBN Number")

        JoiValidBook.validate(book);
        book = await (new Book(book)).save()
        
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { book_id: book._id } 
        });

        res.send("Congrats your book has been published on our website!!!");

    } catch (err) {
        if (book.img !== '/bookCover/defCover') {
            fs.unlink(`public/${book.img}`, (err) => {
                // if(err) logger
            })
        }
        res.status(403).send(err.message)
    }
};

async function modifyBook(req, res){
    let book = {}

    if (req.file) book.img = req.file.path.substr(6);
    if (req.body.title) book.title = req.body.title;
    if (req.body.isbn) book.isbn = req.body.isbn;
    if (req.body.genre) book.genre = req.body.genre.split(',').map((val) => val.toLowerCase());
    if (req.body.summary) book.summary = req.body.summary;

    try {
        var ExistBook;
        if (book.isbn)
            ExistBook = await Book.findOne({ isbn: book.isbn });

        if (book.title)
            ExistBook = await Book.findOne({ title: book.title });

        if (ExistBook)
            throw new Error("Book with Same Title/ISBN Already Exists!!");
        
        if(book.isbn && !checkISBN(book.isbn))
            throw new Error("Please Enter Valid ISBN Number")

        Book.findOneAndUpdate(
            { _id: req.params.id },
            { $set: book }
        )
            .then(UpdBook => res.send("Book Updated") )
            .catch(err =>  res.status(403).send("Error Happened While Updating Book") )

    } catch (err) {
        if (book.img !== '/bookCover/defCover') {
            fs.unlink(`public/${book.img}`, (err) => {
                // if(err) logger
            })
        }
        res.status(403).send(err.message)
    }
}

module.exports = { createBook, modifyBook }