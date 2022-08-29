const router = require('express').Router();

const { isAuthReq } = require('../middleware/authHandler');
const createUser = require('../controller/createUser');

const routePlan = require('../route_plan');
const redirectFilePath = routePlan.sign_up[2];

router.use(isAuthReq);

router.get("/", async (req, res) => {
    res.render(redirectFilePath);
})

router.post("/", createUser);

module.exports = router;