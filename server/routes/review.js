const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Book } = require('../models/book')
const { Review, JoiValidReview } = require('../models/review')

const idCheck = require('../middleware/idCheck');
const { auth } = require('../middleware/authHandler');

const { wilsonScore, baysonAvg } = require('../controller/bookRanker')

router.get('/api/:id', idCheck, async(req, res) => {
    if(req.isUnauthenticated()) return res.status(403).send("Not Logged In!!");
    const id = new ObjectId(req.params.id);

    // const page = parseInt(req.query.page) || 0;
    // const limit = 5;

    Book.aggregate([
        { $match: { _id: id } },
        { $project: { review_id: 1, totalRating: 1, ratingCount: 1 } },
        {
            $lookup: {
                from: "reviews",
                localField: "review_id",
                foreignField: "_id",
                // pipeline: [
                //     { $skip: page * limit },
                //     {
                //         $facet: {
                //             "reviews": [{ $limit: limit }],
                //             "remainingDoc": [{ $count: "count" }]
                //         }
                //     }
                // ],
                as: "review_id"
            }
        }
    ]).then(data => res.send(data[0]))
        .catch(err => res.send(err));
});

router.use(auth);

router.post('/addItem', idCheck, async(req, res) => {
    let review = {
        user: req.user.username,
        rating: req.body.rating,
        comment: req.body.comment
    };

    try{
        const BookExist = await Book.findOne({ _id: req.body.id });
        
        if(!BookExist) 
            throw new Error("Not a valid book");

        JoiValidReview.validate(review);
        review = await (new Review(review)).save()

        let { totalRating, pub_date, ratingCount } = BookExist;
        
        totalRating += review.rating;
        ratingCount++;

        let hotRank = await wilsonScore(totalRating, pub_date);
        let popRank = await baysonAvg(totalRating, ratingCount);

        Book.findOneAndUpdate({ _id: req.body.id }, {
            $set: { totalRating, ratingCount, hotRank, popRank },
            $push: { review_id: review._id }
        })
            .then(data => {return res.send(data)})
            .catch(async(err) => {
                await Review.findOneAndDelete({ _id: review._id })
                return res.status(403).send("Error Happened while posting review please try again later")
            });
    } catch(err){
        console.log(err) //logger
    }
})


module.exports = router;