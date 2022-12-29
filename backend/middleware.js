module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // TODO: redirect
        // req.user.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}