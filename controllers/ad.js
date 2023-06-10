const Ad = require('../models/ad');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const ad = new Ad(req.body);
    ad.save()
    .then((ad) => {
        const id = req.profile._id;
        User.findByIdAndUpdate(
            { _id: id },
            { $push: { ads: ad._id}}
        )
        .then((user) => {
            return res.json({
                ad,
                user
            });
        })
        .catch((err) => {
            return res.status(401).json({
                err: errorHandler(err),
            });
        })
    })
    .catch((err) => {
        return res.status(400).json({
            err: errorHandler(err),
        });
    });

    

    
};

exports.read = (req, res) => {
    Ad.findById(req.params.userid)
    .then((ad) => {
        if (!ad) {
            return res.status(400).json({
                error: 'Ad not found',
            });
        } 
        res.json({
            ad
        });
    })
    .catch((err) => {
        return res.status(401).json({
            err: errorHandler(err)
        });
    })
}

exports.readAll = (req, res) => {
    Ad.find({})
    .then((ads) => {
        res.json(ads);
    })
    .catch((err) => {
        return res.status(400).json({
            error: 'Error finding Ads',
        });
    })
}

exports.update = (req, res) => {

    if(req.profile.name != req.body.postedBy) {
        return res.status(401).json({
            error: 'You are not authorized to perform this action',
        });
    }

    Ad.findOneAndUpdate(
        { _id: req.query.ad },
        { $set: req.body },
        { new: true },
    )
    .then((ad) => {
        return res.json(ad);
    })
    .catch((err) => {
        return res.status(401).json({
            error: 'You are not authorized to perform this action',
        });
    })
};

exports.remove = (req, res) => {
    const id = req.query.id;
    const adid = req.query.adid; 

    User.findById(id)
    .then((user) => {
        user.ads.pull(adid);
        user.save()
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            return res.status(401).json({
                error: 'Unable to delete ad',
            });
        })
    })
    .catch((err) => {
        return res.status(401).json({
            error: 'Unable to delete ad',
        });
    })
}

exports.myAd = (req, res) => {
    const id = req.params.userid;
    User.findById(id)
    .then((user) => {
        return res.json(user.ads);
    })
    .catch((err) => {
        return res.status(401).json({
            error: 'Unable to retreive ads',
        });
    })
}