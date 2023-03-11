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
    const posts = await Post.find({}).sort({"updatedAt": "desc"}).populate(['tags', 'subject']);
    await User.findByIdAndUpdate(req.user._id, {last_request:{post:Date.now()}});
    res.status(200).send(posts);
})
.post(isLoggedIn, async (req, res) => {
    console.log(req.body);
    await db.transaction(async (session)=>{
        const post = await Post.create([{title: req.body.title, content: req.body.content, author: req.user._id, tags: req.body.tags, subject: req.body.subject}], {session});
        const user = await User.findOne({id: req.user.id}, null, {session});
        user.posts.push(post[0]._id);
        await user.save({session});

        // const users = await User.findById(req.user._id).select('subSubscribed.sub').transform((res)=>res.subSubscribed.map((obj)=>obj.sub));
        // console.log(users.includes(req.subject));
        const users = await Subject.findById(req.subject).students
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
        console.log(e)
        return res.status(500).json({error: 'Transaction failed.'});
    })
})

router.route('/:id')
.get(async(req, res)=>{
    const post = await Post.findById(req.params.id).sort({"updatedAt": "desc"}).populate(['tags', 'subject']);
    if(!post){
        return res.status(404).send({error: 'Post Not Found'});
    }
    res.status(200).send(post);
})

module.exports = router;