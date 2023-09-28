const express = require('express');
const bcrypt = require('bcryptjs');
const {setTokenCookie, requireAuth} = require('../../utils/auth.js');
const {User} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

const router = express.Router();

router.post('/',validateSignup, async (req,res,next)=> {
   const {firstName,lastName,email,username,password} = req.body;
   const saltedAndHashed = bcrypt.hashSync(password);
   const newUser = await User.create({email,username,hashedPassword:saltedAndHashed});
   const safeUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
    };
   await setTokenCookie(res,safeUser);
   res.json({
    user:safeUser
});
})


module.exports = router;