const auth = (req, res, next) => {
    // If the user is logged in, continue with the request to the intended route
    if (req.session.isAuthenticated) {
        return next();
    }

    // If the user isn't logged in, redirect them to the login page
    res.redirect('/login');
};

module.exports = auth;
