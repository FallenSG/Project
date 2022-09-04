const router = require('express').Router();
const { Directory, renderType } = require('../routePlan');

router.get('/', async(req, res) => {
    res[renderType](routePlan.index[2]);
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