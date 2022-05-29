const router = require('express').Router();
const routePlan = require('../route_plan');

const book = routePlan.book;

const createBook = require('../controller/createBook');
const auth = require('../middleware/authHandler').auth;

router.use(auth);

router.get('/', async(req, res) => {
    res.render(book[2], { post_to: book[0] });
});

router.post('/', createBook);

module.exports = router;