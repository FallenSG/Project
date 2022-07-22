'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//any changes done to userSchema will need changes done to userValidation.js
const userSchema = new Schema({
    username: {type: String, required: true, maxlength: 100},
    email: {type: String, unique: true, lowercase: true, required: true},
    mobile: {type: Number, unique: true, required: true},
    password: {type: String, required: true},
    lib: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    book_id: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

userSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
})

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
