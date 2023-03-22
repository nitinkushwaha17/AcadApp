const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.route('/notif')
.post(async(req, res)=>{
    console.log(req.user);
    await User.findByIdAndUpdate(req.user._id, {preferences:{notif: req.body.notif}});
    res.status(200).json({success: 'sucessfully updated'});
})

module.exports = router;