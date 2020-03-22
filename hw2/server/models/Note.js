const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 200,
        min: 1
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isChecked: {
        type: Boolean,
        default: false
    },

    dates: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('notes', noteSchema );