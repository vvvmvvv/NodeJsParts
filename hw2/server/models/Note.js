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
        type: String,
        required: true,
        max: 1024,
        min: 6
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

module.exports = mongoose.model('Note', noteSchema );