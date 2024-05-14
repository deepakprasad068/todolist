const mongoose = require("mongoose");

const task = require("./task")
const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,

    },
    username: {
        type: String,
        unique: true,
        required: true,

    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: task

    }]
})
const user = mongoose.model('User', User);

module.exports = user;

