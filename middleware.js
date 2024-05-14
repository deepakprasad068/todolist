module.exports.islogin = (req, res, next) => {
    if (!req.session._id) {

        res.redirect("/login")
    }
    else {
        next();
    }
}
