const mongoose = require('mongoose');

const DeptSchema = new mongoose.Schema({
    name: String,
    shortName: String
});

module.exports = mongoose.model('Dept', DeptSchema);