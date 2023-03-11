const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    shortName: {
        type: 'string',
        required: true
    },
    subCode: {
        type: 'string',
        required: true
    },
    batch: Number,
    sem: Number,
    sec: String,
    credits: Number,
    profs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prof'
    }],
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dept'
    },
    crs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Subject', SubjectSchema);