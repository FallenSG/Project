const routePlan = require('../route_plan');
const sign_in = routePlan.sign_in;
const dash = routePlan.dash;

function auth(req, res, next){
    if(req.isAuthenticated()) next();
    else return res.redirect(sign_in[0]);
}

function isAuthReq(req, res, next){
    if (req.isUnauthenticated()) next();
    else return res.redirect(dash[0]);
}

exports.auth = auth;
exports.isAuthReq = isAuthReq;