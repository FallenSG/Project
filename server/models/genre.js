var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genreSchema = new Schema(
    {
        name: { type: String, required: true }
    }
);

var Genre = mongoose.model('Genre', genreSchema);
module.exports = { Genre };