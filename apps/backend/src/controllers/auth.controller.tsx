const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function signUp(req, res){

    bcrypt.hash(req.body.password, 10).then(function(hash) {
        User.create({ username: req.body.username, hash: hash });
    }).catch((err) => {
        console.error(err)

        return res.status(500).send({
            message: "Error creating user account."
        })
    });

    return res.status(200).send({
        message: "Sign-up Success!"
    });
}

async function signIn(req, res){
    try{
        let user = User.findOne({ username: req.body.username })

        if(user){
            bcrypt.compare(req.body.password, user.hash, function(err, result) {
                if(!result){
                    return res.status(500).send({
                        message: "Invalid username or password."
                    })
                }

                return res.status(200).send({
                    message: "Success! Logging in..."
                })
            });
        }

        return res.status(500).send({
            message: "Invalid username or password."
        })
    }catch(err){
        console.error(err)

        return res.status(500).send({
            message: "Error logging in."
        })
    }
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