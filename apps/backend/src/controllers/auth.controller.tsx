const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function signUp(req, res){
    res.status(200).send({
        message: "Sign-up Success!"
    });
}

async function signIn(req, res){
    res.status(200).send({
        message: "Sign-in Success!"
    });
}

async function signOut(req, res){
    res.status(200).send({
        message: "Sign-out Success!"
    });
}

const authController = {
    signUp,
    signIn,
    signOut
}

export {}

module.exports = authController;