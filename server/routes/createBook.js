const router = require('express').Router();
const multer = require('multer');
const routePlan = require('../route_plan');

const book = routePlan.createBook;

const createBook = require('../controller/createBook');
const auth = require('../middleware/authHandler').auth;

const upload = multer({
    // dest: 'public/buffer',
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
});

router.use(auth);

router.get('/', async(req, res) => {
    res.render(book[2], { post_to: book[0] });
});

router.post('/', upload.single('bookCover'), createBook);

module.exports = router;