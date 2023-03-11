const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    batch: {
        type: 'string',
        required: true
    },
    sem: Number,
    subjects: [{
        sub: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        prof: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Prof'
        }
    }]
});

module.exports = mongoose.model('Session', SessionSchema);

// 2022 6