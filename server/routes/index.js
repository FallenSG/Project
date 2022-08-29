const router = require('express').Router();
const routePlan = require('../route_plan');

router.get('/', async(req, res) => {
    res.render(routePlan.index[2]);
});

//setting up routes.
for(key in routePlan){
    if( key !== 'index' && routePlan[key].length){
        router.use( routePlan[key][0], require(routePlan[key][1]) );
    }
}

router.use('/*', async(req, res) => {
    res.redirect('/');
});

module.exports = router