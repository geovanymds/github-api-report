const mongoose = require('mongoose');
const Permission = require('./Permission');

const License = new mongoose.Schema({

    key: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    permissions: []

});

module.exports = mongoose.model('License', License);