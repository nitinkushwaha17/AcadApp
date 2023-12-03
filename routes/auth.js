const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require("../models/User");

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // console.log(req.user);
        res.redirect('/');
    }
)

router.get('/getUser', async(req, res) => {
    if(process.env.NODE_ENV !== 'production'){
        const user = await User.findOne({id: '105494720685497613098'});

        return res.send(user);
    }
    res.send(req.user);
})

router.get('/logout', (req, res, next) => {
    console.log("logging out...");
    req.logout((error) => {
        if(error){
            return next(error);
        }
        console.log("ok")
        res.redirect('/');
    })
})

module.exports = router