var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, required: true },
        comment: {},
        rating: { type: Integer }
    }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };


