var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
        book_id: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }],
        about: {},
        socialMediaHandles: {}
    }
);


//Export model
var Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;


