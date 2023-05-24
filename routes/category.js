const express = require('express');
const router = express.Router();

const {
    requireSignin,
    isAuth,
    isAdmin
  } = require('../controllers/auth');

const {
    create,
    read,
    readAll,
    update,
    readByName
} = require('../controllers/category');

const {userById} = require('../controllers/user');

router.get('/category/all', readAll);
router.get('/category/:name', readByName);
router.put('/category/update', userById, requireSignin, isAuth, isAdmin, update);
router.post('/category/create/:id', userById, requireSignin, isAuth, isAdmin, create);


module.exports = router;