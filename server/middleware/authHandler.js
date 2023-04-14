const { 
    successRedirect, failureRedirect 
} = require('../routePlan').Direct(success='index')
const { User } = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = {
    auth: function(req, res, next){
        if (req.isAuthenticated()) return next();
        return res.redirect(`${failureRedirect}?fromUrl=${req.originalUrl}`);
    },

    isAuthReq: function(req, res, next) {
        if (req.isUnauthenticated()) next();
        else return res.redirect(successRedirect);
    },

    authorAuth: async function(req, res, next){
        const id = new ObjectId(req.params.id)
        const data = await User.findOne({ _id: req.user._id, book_id: id })
        
        if(data) return next();
        return res.status(403).send("Unauthorized Access");
    }
}
    
    