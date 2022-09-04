const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resSchema = new Schema({
    email: { type: String, unique: true, required: true },
    token: { type:String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 }
});

const ForgotPass = mongoose.model('ForgotPass', resSchema);

module.exports = ForgotPass;