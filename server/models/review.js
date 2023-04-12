const mongoose = require('mongoose');
const Joi = require('joi')

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({   
    user: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, default: 0, required: true }
});

const JoiValidReview =  Joi.object({
    user: Joi.string().required(),
    comment: Joi.string().max(250),
    rating: Joi.number().min(0).max(5).required()
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review, JoiValidReview };


