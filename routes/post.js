const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Post = require('../models/Post');
const User = require('../models/User');
const sendNotification = require('../utils/notification');
const mongoose = require('mongoose');
const db = mongoose.connection;

router.route('/')
.get(isLoggedIn, async (req, res) => {
    const posts = await Post.find({});
    res.status(200).send(posts);
})
.post(isLoggedIn, async (req, res) => {
    await db.transaction(async (session)=>{
        const post = await Post.create([{title: req.body.title, content: req.body.content, author: req.user._id}], {session});
        const user = await User.findOne({id: req.user.id}, null, {session});
        user.posts.push(post[0]._id);
        await user.save({session});

        users = await User.find({});
        let sub=[];
        users.forEach(user => {
            if(user.subscription){
                sub.push(user.subscription);
            }
        })
        sendNotification(sub);

        res.status(201).json({success: 'sucessfully created'});
    })
    .catch((e)=>{
        return res.status(500).json({error: 'Transaction failed.'});
    })
})

module.exports = router;