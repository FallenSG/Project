const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author_id: { type: Schema.Types.ObjectId, ref: 'User' },
        summary: { type: String, required: true },
        isbn: { type: String },
        genre: [{ type: String, required: true }],
        publish: [{
            path: { type: String, required: true },
            name: { type: String, required: true }
        }],
        draft: [{
            path: { type: String, required: true },
            name: { type: String, required: true }
        }],
        img: { type: String },
        review_id: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        pub_date: { type: Number, required: true },
        totalRating: { type: Number, default: 0},
        ratingCount: { type: Number, default: 0 },
        hotRank: { type: Number, default: 0 },
        popRank: { type: Number, default: 0 }
    }
);

const JoiValidBook = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    summary: Joi.string().required(),
    isbn: Joi.string().min(10).max(13),
    genre: Joi.array().items(Joi.string()),
    img: Joi.string(),
    pub_date: Joi.date().required(),
});


const Book = mongoose.model('Book', BookSchema);

module.exports = { Book, JoiValidBook };


