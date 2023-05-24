const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
