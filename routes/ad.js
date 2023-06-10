const express = require('express');
const router = express.Router();

const {
    requireSignin,
    isAuth,
    isAdmin, 
} = require('../controllers/auth');

const {
    create,
    read,
    readAll,
    update,
    remove,
    myAd
} = require('../controllers/ad');

const {userById} = require('../controllers/user');

router.get('/ad/all', readAll);
router.get('/ad/read/:userid', read);
router.put('/ad/update', userById, requireSignin, isAuth, update);
router.post('/ad/create/:userid', userById, requireSignin, isAuth, create);
router.post('/ad/delete', userById, requireSignin, isAuth, remove);
router.get('/ad/myad/:userid', userById, requireSignin, isAuth, myAd);


module.exports = router;