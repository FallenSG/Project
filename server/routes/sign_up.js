const router = require('express').Router();

const userValidation = require('../middleware/userValidation');
const { auth, isAuthReq } = require('../middleware/authHandler');
const createUser = require('../controller/createUser');

router.get("/", isAuthReq, async (req, res) => {
    res.render('sign_up');
});

router.post("/", userValidation, createUser);

module.exports = router;