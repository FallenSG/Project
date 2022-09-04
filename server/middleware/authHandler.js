const { 
    successRedirect, failureRedirect 
} = require('../routePlan').Direct(success='dash')

module.exports = {
    auth: function(req, res, next){
        if (req.isAuthenticated()) next();
        else return res.redirect(failureRedirect);
    },

    isAuthReq: function(req, res, next) {
        if (req.isUnauthenticated()) next();
        else return res.redirect(successRedirect);
    }
}
    
    