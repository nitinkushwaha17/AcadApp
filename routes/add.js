const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Post = require('../models/Post');
const User = require('../models/User');
const Dept = require('../models/Dept');
const Prof = require('../models/Prof');
const Subject = require('../models/Subject');
const Tag = require('../models/Tag');

router.route('/joinsub')
.get(async(req, res)=>{
    const subSubscribed = await User.findOne({_id: req.user._id})
    const subArr = subSubscribed.subSubscribed.map(sub=>sub.sub);
    const sub = await Subject.find({}).where('_id').nin(subArr);
    res.status(200).send(sub);
})

router.route('/join/:subId')
.post(async(req, res) => {
    const user = await User.findOne({_id: req.user._id});
    const sub = await Subject.findOne({_id: req.params.subId});
    user.subSubscribed.push({sub: req.params.subId, isCR: false});
    sub.students.push(req.user._id);
    await user.save();
    await sub.save();
    res.status(201).send({success: "Subject successfully joined"});
})

router.route('/reset')
.get(async(req, res) => {
    const user = await User.findOne({_id: req.user._id})
    user.subSubscribed = [];
    user.save();
    res.status(201).send({success: "Subject successfully joined"});
})

router.route('/subject')
.get(async(req, res)=>{
    const sub = await Subject.find({});
    res.status(200).send(sub);
})
.post(isLoggedIn, async (req, res) => {
    const sub = await Subject.findOne({subCode: req.body.subCode});
    if(sub){
        res.status(409).send({error: 'Subject already exists'});
        return;
    }
    let createdSub = await Subject.create({name: req.body.name, shortName: req.body.shortName, subCode: req.body.subCode, sem: req.body.sem, 
    sec: req.body.sec, credits: req.body.credits, dept: req.body.dept, profs: req.body.profs, students: [req.user._id]});
    console.log(createdSub);
    let user = await User.findById(req.user._id);
    user.subSubscribed.push({sub:createdSub._id, isCR: true});
    await user.save();
    res.status(201).send({success: "Subject successfully created"});
})
// .post(isLoggedIn, async (req, res) => {
//     console.log(req.body);
//     await db.transaction(async (session)=>{
//         const post = await Post.create([{title: req.body.title, content: req.body.content, author: req.user._id, tags: req.body.tags.map(tag=>tag.title), subject: req.body.subject}], {session});
//         const user = await User.findOne({id: req.user.id}, null, {session});
//         user.posts.push(post[0]._id);
//         await user.save({session});

//         users = await User.find({});
//         let sub=[];
//         users.forEach(user => {
//             if(user.subscription){
//                 sub.push(user.subscription);
//             }
//         })
//         // sendNotification(sub);

//         res.status(201).json({success: 'Sucessfully created'});
//     })
//     .catch((e)=>{
//         console.log(e)
//         return res.status(500).json({error: 'Transaction failed.'});
//     })
// })

router.route('/dept')
.get(async(req, res) => {
    const dept = await Dept.find({});
    res.status(200).send(dept)
})
.post(async(req, res)=>{
    await Dept.create({name: req.body.name, shortName: req.body.shortName});
    res.status(201).send({success: "Department successfully created"});
})

router.route('/prof')
.get(async(req, res)=>{
    const profs = await Prof.find({});
    res.status(200).send(profs);
})
.post(async(req, res) => {
    await Prof.create({name: req.body.name, shortName: req.body.shortName, dept: req.body.dept});
    res.status(201).send({success: "Department successfully created"});
})

router.route('/tag')
.get(async(req, res) => {
    const tags = await Tag.find({});
    res.status(200).send(tags)
})
.post(async(req, res)=>{
    await Tag.create({name: req.body.name, color: req.body.color});
    res.status(201).send({success: "Tag successfully created"});
})

module.exports = router;