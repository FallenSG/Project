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
module.exports = async function (req, res) {
    let book = {
        img: req.file?.path.substr(6),
        title: req.body.title,
        isbn: req.body.isbn,
        author_name: req.user.username,  
        summary: "Summary need to be updated plz check after sometime",
        pub_date: new Date()
    }

    try {
        JoiValidBook.validate(book);

        const ExistBook = await Book.findOne({
            $or: [
                { title: book.title },
                { isbn: book.isbn }
            ]
        });

        if (ExistBook)
            throw new Error("Book Title already exists!!");

        if (!checkISBN(book.isbn))
            throw new Error("Plz Enter valid isbn number!!!");

        book = await (new Book(book)).save();

        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { book_id: book._id } });

        res.send({ msg: "Congrats your book has been published on our website!!! " });

    } catch (err) {
        if(book.img){
            fs.unlink(`public/${book.img}`, (err) => {
                // if(err) logger
            })
        }
        res.render('error', { message: err.message })
    }
};