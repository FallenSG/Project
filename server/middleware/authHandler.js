<<<<<<< HEAD
const routePlan = require('../route_plan');
const successRedirectUrl = routePlan.dash[0];
const failureRedirectUrl = routePlan.sign_in[0];

module.exports = {
    auth: function(req, res, next){
        if (req.isAuthenticated()) next();
        else return res.redirect(failureRedirectUrl);
    },

    isAuthReq: function(req, res, next) {
        if (req.isUnauthenticated()) next();
        else return res.redirect(successRedirectUrl);
=======
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
        
>>>>>>> 38fb88b8dbab77040a35fafd0c284b5bedc0c2b5
    }
}
    
    