const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('dotenv').config().parsed

const failureRedirectUrl = require('../route_plan').sign_in[0]
const successRedirectUrl = require('../route_plan').dash[0]

async function boilerPlatedAuth(req){
    const token = req.cookies.AccessToken;
    var user;
    try {
        if (!token) {
            throw Error('No Token Present..')
        }
        var payload = jwt.verify(token, config.TOKEN_SECRET)
        user = await User.findOne({ _id: payload.id })

        if(!user){
            throw Error('No Such user exist');
        }
    } catch (err) {
        return false
    }
    req.user = user
    return true
}

module.exports = {
    auth: async function authenticate(req, res, next){
        if(await boilerPlatedAuth(req)) next();
        else return res.redirect(failureRedirectUrl);
    },

    isAuthReq: async function(req, res, next){
        if(!await boilerPlatedAuth(req)) next();
        else return res.redirect(successRedirectUrl);
    },

    refresh: function(req, res, next){
        
    }
}
    
    