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
    }
}
    
    