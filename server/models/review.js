const mongoose = require('mongoose');
const Joi = require('joi')

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        book_id: { type: Schema.Types.ObjectId, required: true },
        comment: { type: String },
        rating: { type: Number, default: 5 }
    }
);

const JoiValidReview =  Joi.object({
    // book_id: ,
    comment: Joi.string(),
    rating: Joi.number().required()
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review, JoiValidReview };


