var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
        genre_id: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
        doc: {},
        img: { type: Buffer },
        rating: {type: Number},
        review_id: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        price: { type: Number, required: true },
        pub_date: { type: Date, required: true } 
    }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;


