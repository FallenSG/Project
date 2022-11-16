'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Joi = require('joi');

const Schema = mongoose.Schema;

//any changes done to userSchema will need changes done to userValidation.js
const userSchema = new Schema({
    username: {type: String, required: true, maxlength: 100},
    email: {type: String, unique: true, lowercase: true, required: true},
    mobile: {type: Number, unique: true, required: true},
    password: {type: String, required: true},
    verify: { type: Boolean, enum: [false, true], default: false },
    book_id: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    lib: [
        { type: Schema.Types.ObjectId, ref: 'Book' }, //book_id
        { type: Date, required: true }, //date added
        { type: Date, required: true } //recently read
    ]
});

const JoiValidUser = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    mobile: Joi.string().regex(/^[0-9]{10}$/).required().messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    password: Joi.string().min(5).max(255).required()
});

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userSchema.pre('findOneAndUpdate', async function(next){
    const pass = this._update.$set?.password
    if(pass){
        const hash = await bcrypt.hash(this._update.$set.password, 10);
        this._update.$set.password = hash;
    }
    next();
})


userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = { User, JoiValidUser };
