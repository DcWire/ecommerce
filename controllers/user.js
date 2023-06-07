const User = require('../models/user');

exports.userById = (req, res, next) => {
    let id = req.params.userid;
    if(!id) {
        id = req.query.id;
    }
    User.findById(id)
    .then((user) => {
        // console.log(user);
        if(!user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }
        req.profile = user;
        next();
    })
    .catch((err) => {
        return res.status(400).json({
            error: 'User not found',
        });
    })
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.readAll = (req, res) => {
    User.find({})
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        return res.status(400).json({
            error: 'Users not found',
        });
    })
}

exports.update = (req, res) => {
    // console.log('user update', req.body);
    // req.body.role = 0; // role will always be 0
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
    )
    .then((user) => {
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    })
    .catch((err) => {
        return res.status(400).json({
            error: 'Error updating user',
        });
    })
   
};