const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Post = require('../models/Post');
const User = require('../models/User');
const Subject = require('../models/Subject');
const sendNotification = require('../utils/notification');
const mongoose = require('mongoose');
const db = mongoose.connection;

router.route('/')
.get(isLoggedIn, async (req, res) => {
    let date = req.query.lastpostdate;
    let limit = req.query.limit||5;
    
    const posts = await Post.find({updatedAt: {$lt: date}}).limit(limit).sort({"updatedAt": "desc"}).populate(['tags', 'subject']);
    //first req
    if(!req.query.lastPostDate)
        await User.findByIdAndUpdate(req.user._id, {last_request:{post:Date.now()}});

    // console.log(posts)

    return res.status(200).send(posts);
})
.post(isLoggedIn, async (req, res) => {
    // console.log(req.body);
    await db.transaction(async (session)=>{
        const post = await Post.create([{title: req.body.title, content: req.body.content, author: req.user._id, tags: req.body.tags, subject: req.body.subject}], {session});
        const user = await User.findOne({id: req.user.id}, null, {session});
        user.posts.push(post[0]._id);
        await user.save({session});

        // const users = await User.findById(req.user._id).select('subSubscribed.sub').transform((res)=>res.subSubscribed.map((obj)=>obj.sub));
        // console.log(users.includes(req.subject));
        const subject = await Subject.findById(req.body.subject).populate('students')
        // console.log(subject)
        let sub=[];
        subject.students.forEach(user => {
            if(user.subscription&&user.preferences.notif!==false){
                sub.push(user.subscription);
            }
        })
        // console.log(sub)
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