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
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dept'
    },
    batch: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    subSubscribed: [{
        sub:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        isCR: Boolean
    }],
    preferences: {
        notif: {
            type: Boolean,
            default: true
        }
    },
    subscription: {
        endpoint: String,
        expirationTime: Date,
        keys: {
            p256dh: String,
            auth: String
        }
    },
    last_request: {
        post: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('User', UserSchema);