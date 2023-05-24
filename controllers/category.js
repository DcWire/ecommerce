const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');
exports.create = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category.save()
    .then((category) => {
        res.json({
            category
        });
    })
    .catch((err) => {
        return res.status(400).json({
            err: errorHandler(err),
        });
    })
};

exports.read = (req, res) => {
    Category.findById(req.params.id)
    .then((category) => {
        if (!category) {
            return res.status(400).json({
                error: 'Category not found',
            });
        } 
        res.json({
            category
        });
    })
    .catch((err) => {
        return res.status(401).json({
            err: errorHandler(err)
        });
    })
}

exports.readByName = (req, res) => {
    Category.find({name: req.params.name})
    .then((category) => {
        if (!category) {
            return res.status(400).json({
                error: 'Category not found',
            });
        } 
        res.json({
            category
        });
    })
    .catch((err) => {
        return res.status(401).json({
            err: errorHandler(err)
        });
    })
};

exports.readAll = (req, res) => {
    Category.find({})
    .then((categories) => {
        res.json(categories);
    })
    .catch((err) => {
        return res.status(400).json({
            error: 'Error finding Categories',
        });
    })
}

exports.update = (req, res) => {
    Category.findOneAndUpdate({_id: req.query.category}, 
        {$set: req.body}, 
        {new: true})
        .then((category) => {
            res.json(category);   
        })
        .catch((err) => {
            return res.status(400).json({
                error: 'You are not authorized to perform this action',
            });
        })
};



