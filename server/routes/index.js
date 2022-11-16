const router = require('express').Router();
const { Directory, renderType, Direct } = require('../routePlan');
const { renderFilePath } = Direct()

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
});

router.get('/user', async(req, res) => {
    let statusCode = 200;
    if(!req.user) statusCode = 404;
    const user = req.user
    // ['mobile', 'password', 'verify']
    res.json({ statusCode, data: req.user });
});

//setting up routes.
for(key in Directory){
    if( key !== 'index' && Directory[key].length){
        router.use( Directory[key][0], require(Directory[key][1]) );
    }
}

router.use('/*', async(req, res) => {
    res.redirect('/');
});

module.exports = router