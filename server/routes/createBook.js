const router = require('express').Router();
const multer = require('multer');

const createBook = require('../controller/createBook');
const { auth } = require('../middleware/authHandler');

const routePlan = require('../route_plan');
const renderFilePath = routePlan.createBook[2];
const redirectUrl = routePlan.createBook[0]

const upload = multer({
    dest: 'public/bookCover/',
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
    res.render(renderFilePath);
});

router.post('/', upload.single('bookCover'), createBook);

module.exports = router;