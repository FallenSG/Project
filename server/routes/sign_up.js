const router = require('express').Router();
const routePlan = require('../route_plan');

const sign_up = routePlan.sign_up;

const userValidation = require('../middleware/userValidation');
const { auth, isAuthReq } = require('../middleware/authHandler');
const createUser = require('../controller/createUser');

router.get("/", isAuthReq, async (req, res) => {
    res.render(sign_up[2], {post_to: routePlan.sign_up[0]});
});

router.post("/", userValidation, createUser);

module.exports = router;