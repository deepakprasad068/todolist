const user = require("../models/users");
const bcrypt = require('bcrypt');


module.exports.register = (req, res) => {
    res.render("users/register");
}
module.exports.creatingUser = async (req, res) => {

    const { username, email, password } = req.body;


    const newUser = await new user({ email, username });


    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        await newUser.save();
        res.redirect("/login")

    } catch (error) {
        console.log(error)
    }

}
module.exports.loginpage = (req, res) => {
    res.render("users/login")
}
module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {


        const person = await user.findOne({ username: username });


        const match = await bcrypt.compare(password, person.password);

        if (match == false) {
            res.redirect("/login");
        }
        else {
            req.session._id = person._id;
            res.redirect("/home");
        }
    }
    catch (err) {
        res.redirect("/login");
    }
}
module.exports.home = async (req, res) => {

    try {
        const person = await user.findById(req.session._id).populate('task');
        res.render("users/home", { person })
    } catch (error) {
        res.send(error)
    }

}
module.exports.logout = (req, res, next) => {
    req.session._id = null;

    res.render("users/login")
    next()
}