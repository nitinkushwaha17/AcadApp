const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    image: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    subscription: {
        endpoint: String,
        expirationTime: Date,
        keys: {
            p256dh: String,
            auth: String
        }
    }
});

module.exports = mongoose.model('User', UserSchema);