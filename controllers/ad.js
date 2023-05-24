const Ad = require('../models/ad');


exports.create = (req, res) => {
    const ad = new Ad(req.body);
    ad.save()
    .then((ad) => {
        res.json({
            ad
        });
    })
    .catch((err) => {
        return res.status(400).json({
            err: errorHandler(err),
        });
    })
};

exports.read = (req, res) => {
    Ad.findById(req.params.id)
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