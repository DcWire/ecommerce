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
} = require('../controllers/ad');

const {userById} = require('../controllers/user');

router.get('/ad/all', readAll);
router.get('/ad/read/:id', read);
router.put('/ad/update', userById, requireSignin, isAuth, update);
router.post('/ad/create', userById, requireSignin, isAuth, create);


module.exports = router;