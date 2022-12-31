const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');

router.route('/subscribe')
.post(isLoggedIn, async (req, res) => {
    console.log(req.body)
    await User.findOneAndUpdate({_id: req.user._id}, {subscription: req.body});
    res.status(200).json({message: 'Successfully subscribed!'});
});

module.exports = router;