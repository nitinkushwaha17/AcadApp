const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
)

router.get('/getUser', (req, res) => {
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