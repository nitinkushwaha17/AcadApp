const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');

router.route('/')
.get(isLoggedIn, async(req, res)=>{
    const user = await User.findOne({_id: req.user._id}).populate('subSubscribed.sub');
    
    res.status(200).send(user.subSubscribed);
})

module.exports = router;