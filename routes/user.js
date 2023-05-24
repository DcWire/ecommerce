const express = require('express');
const router = express.Router();

const {
    isAuth, 
    isAdmin,
    requireSignin
} = require('../controllers/auth');
const { userById, readAll, read, update } = require('../controllers/user');


router.get('/secret/:userid', requireSignin, isAuth, isAdmin, (req, res) => {
    console.log("Here");
    res.json({
        user: req.profile
    });
})
router.get('/secret/all/:userid', requireSignin, isAuth, isAdmin, readAll);

router.get('/user/:userid', requireSignin, isAuth, read);
router.put('/user/:userid', requireSignin, isAuth, update);

router.param('userid', userById);

module.exports = router;