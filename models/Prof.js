const mongoose = require('mongoose');

const ProfSchema = new mongoose.Schema({
    name: String,
    shortName: String,
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dept'
    }
});

module.exports = mongoose.model('Prof', ProfSchema);