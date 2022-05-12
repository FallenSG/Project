const router = require('express').Router();

const userValidation = require('../middleware/userValidation');
const createUser = require('../controller/createUser');

router.get("/", async (req, res) => {
    res.render('sign_up');
});

router.post("/", userValidation, createUser);

module.exports = router;