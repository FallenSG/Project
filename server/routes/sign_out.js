const router = require('express').Router()

const { auth } = require('../middleware/authHandler');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath, redirectUrl } = Direct();

router.use(auth);

router.post('/', async(req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(redirectUrl);
    });
})

module.exports = router;