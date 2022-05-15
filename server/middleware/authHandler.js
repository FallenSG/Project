function auth(req, res, next){
    if(req.isAuthenticated()) next();
    else return res.redirect('/sign_in');
}

function isAuthReq(req, res, next){
    if (req.isUnauthenticated()) next();
    else return res.redirect('/');
}

exports.auth = auth;
exports.isAuthReq = isAuthReq;