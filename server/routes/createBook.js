const router = require('express').Router();
const multer = require('multer');

const createBook = require('../controller/createBook');
const { auth } = require('../middleware/authHandler');

const { Direct, renderType } = require('../routePlan');
const { renderFilePath } = Direct();

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
    res[renderType](renderFilePath);
});

router.post('/', upload.single('bookCover'), createBook);

module.exports = router;