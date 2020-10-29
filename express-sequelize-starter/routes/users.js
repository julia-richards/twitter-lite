const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const { asyncHandler, handleValidationErrors } = require('../utils');
const { User } = require('../db/models')
const check = require('express-validator');

const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];


router.post('/',
validateUsername,
validateEmailAndPassword,
handleValidationErrors,
asyncHandler(async((req, res) => {
 const { username, email, password } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({ username, email, hashedPassword });


}))
)


module.exports = router
