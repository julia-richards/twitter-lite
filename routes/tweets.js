const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Tweet } = db;

const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch(next);


router.get(
    "/",
    asyncHandler(async (req, res) => {
        const tweets = await Tweet.findAll()
        res.json({ tweets })
    })
);


const tweetNotFoundError = (id) => {
    const err = new Error(`Tweet with the id of ${id} not found`);
    err.title = "Tweet not found"
    err.status = 404;
    return (err);


}
router.get(
    "/:id(\\d+)",
    asyncHandler(async (req, res, next) => {
        const tweetId = parseInt(req.params.id);
        const tweet = await Tweet.findByPk(tweetId);
        if(tweet){
            res.json({ tweet })


        } else {
            next(taskNotFoundError(tweetId))
        }

    })
)




module.exports = router;
