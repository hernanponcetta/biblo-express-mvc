var logOff = function(req, res, next) {
    res.clearCookie('recordarme', {path: '/'})
    req.session.destroy(); 
    res.redirect('/');
    next();
}

module.exports = logOff;