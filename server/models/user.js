'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//any changes done to userSchema will need changes done to userValidation.js
const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    mobile: {type: Number, unique: true, required: true},
    password: {type: String, required: true},
    book_id: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
