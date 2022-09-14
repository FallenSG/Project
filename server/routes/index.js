const router = require('express').Router();
const { Directory, renderType, Direct } = require('../routePlan');
const { renderFilePath } = Direct()

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
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