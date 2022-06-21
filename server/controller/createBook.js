const Book = require('../models/book');
const User = require('../models/user');
const Joi = require('joi');

//validation schema
const joiBookSchema = Joi.object({
    img: Joi.binary().required(),
    title: Joi.string().min(3).max(50).required(),
    // author_id: 
    summary: Joi.string().required(),
    isbn: Joi.string().min(10).max(13),
    genre_id: Joi.array().items(Joi.string()),
    // doc: 
    rating: Joi.number(),
    // review_id: 
    price: Joi.number().required(),
    pub_date: Joi.date().required()
});

//create Book after validation returns true.
async function createBook(req, res){
    const validBook = req.validatedBook;

    let book = new Book(validBook);
    book = await book.save();

    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { book_id: book._id } });

    res.send({ msg: "Congrats your book has been published on our website!!! " });
}

//isbn validatipon
function checkISBN(isbn){
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
module.exports = async function(req, res){
    let book = {
        img: req.file.buffer,
        title: req.body.title,
        isbn: req.body.isbn,
        author_id: req.user.id,
        price: 0,
        summary: "Summary need to be updated plz check after sometime",
        pub_date: new Date()
    };

    const { err } = joiBookSchema.validate(book);
    if (err) {
        res.status(406);
        return res.render('error', { message: err.details[0].message });
    } else {
        const ExistBook = await Book.findOne({
            $or: [
                { title: book.title },
                { isbn: book.isbn }
            ]
        });

        if (ExistBook) return res.status(400).render('error', {
            message: "It Seems book with same title or isbn already exists"
        });

        if(!checkISBN(book.isbn)) return res.render('error', {
            message: "Plz Enter valid isbn number!!!"
        });
        
        req.validatedBook = book;
        createBook(req, res);
    }
};
