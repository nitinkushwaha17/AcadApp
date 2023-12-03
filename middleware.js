module.exports.isLoggedIn = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        req.user = {'_id':'105494720685497613098'};
    }
    else if(!req.isAuthenticated()){
        // TODO: redirect
        // req.user.returnTo = req.originalUrl;
        console.log('redirect');
        return res.redirect('/login');
    }
    next();
}