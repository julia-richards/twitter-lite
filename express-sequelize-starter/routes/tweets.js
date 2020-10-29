const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Tweet } = db;
const { check, validationResult } = require('express-validator')
// const cors = require("cors");


// app.use(cors({origin: "http://localhost:4000"}))



// const validateTweet = [
//   check("message")
//     .exists({ checkFalsy: true })
//     .withMessage("message can't be empty"),
//   check("message")
//     .isLength({max: 280})
//     .withMessage("message can't be longer than 280 characters")
// ];

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
            next(tweetNotFoundError(tweetId))
        }

    })
)

router.put("/:id(\\d+)",
    handleValidationErrors,
    asyncHandler( async(req, res, next) => {
        const tweetId = parseInt(req.params.id)
        const tweet = await Tweet.findByPk(tweetId)

        if(tweet){
            await tweet.update({ message: req.body.message})
            res.json({ tweet })
        } else {
            next(tweetNotFoundError(tweetId))
        }
    })
)


router.post('/',
// validateTweet,
handleValidationErrors,
asyncHandler(async(req, res) =>{
  const { message } = req.body;
  const tweet = await Tweet.create({ message })
  res.status(200).json({tweet})
})
)

router.delete(
    '/:id(\\d+)',
    handleValidationErrors,
    asyncHandler(async (req, res, next) => {
        const tweetId = parseInt(req.params.id)
        const tweet = await Tweet.findByPk(tweetId);
        if(tweet){
            await tweet.destroy()
            res.status(204).end()
        } else {
            next(tweetNotFoundError(tweetId))
        }
    })
)




module.exports = router;
