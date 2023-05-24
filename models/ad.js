const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const adSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    postedBy: {
        type: String,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
}, 
{ timestamps: true });


module.exports = mongoose.model('Ad', adSchema);