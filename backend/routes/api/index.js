const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const userRouter = require('./users.js');
const groupRouter = require('./groups.js');


router.use(restoreUser);

router.use('/session',sessionRouter);

router.use('/users',userRouter);

router.use('/groups',groupRouter);


//test router
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

module.exports = router;
