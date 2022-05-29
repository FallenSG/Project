const router = require('express').Router();
const routePlan = require('../route_plan');

const sign_up = routePlan.sign_up;

const isAuthReq = require('../middleware/authHandler').isAuthReq;
const createUser = require('../controller/createUser');

router.use(isAuthReq);

router.get("/", async (req, res) => {
    res.render(sign_up[2], {post_to: sign_up[0]});
});

router.post("/", createUser);

module.exports = router;