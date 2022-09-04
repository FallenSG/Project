const router = require('express').Router();

const { isAuthReq } = require('../middleware/authHandler');
const createUser = require('../controller/createUser');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct()

router.use(isAuthReq);

router.get("/", async (req, res) => {
    res[renderType](renderFilePath);
})

router.post("/", createUser);

module.exports = router;