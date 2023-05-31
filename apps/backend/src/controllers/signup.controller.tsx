const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");

/* 
    This function will create a new user document within the database, provided that all middlewares pass
    the checks. Password is stored as a hash, rather than plaintext using the bcrypt library.
*/
async function signUp(req, res){
    bcrypt.hash(req.body.password, 10).then(function(hash) {
        User.create({ username: req.body.username, hash: hash }); // Does this async resolve since it's within a promise?
    }).catch((err) => {
        console.error(err)

        return res.status(500).send({
            message: "Error creating user account."
        });
    });

    return res.status(201).send({
        message: "Sign-up Success!"
    });
}

/*
    This function will lookup a user by username, see if it exists and compare
    the inputted plaintext password with the stored password hash within the database for said user.

    If there is a match, a jsonwebtoken is assigned to the user session and the cookie is passed to the
    client through the cookie-session middleware.
*/
async function signIn(req, res){ // What happens if someone signs in as two users at once?
    try{
        User.findOne({ username: req.body.username }).then((user) => {
            bcrypt.compare(req.body.password, user.hash, function(err, result) {
                if(result == false){
                    return res.status(401).send({
                        message: "Invalid username or password."
                    });
                }else{
                    const token = jwt.sign({ id: user._id.toString() }, config.jwt_secret, {
                         algorithm: 'HS256',
                         allowInsecureKeySizes: true,
                         expiresIn: 86400, // 24 hours, in seconds
                    });

                    req.session.token = token;

                    return res.status(200).send({
                        message: "Success! Logging in...",
                        userId: user._id.toString(),
                        user: user.username,
                        roles: user.roles
                    });
                }
            });
        }).catch((err) => {
            return res.status(401).send({
                message: "Invalid username or password."
            });
        })
    }catch(err){
        return res.status(500).send({
            message: "Error logging in."
        });
    }
}

/*
    This function will delete the jwt cookie from the user's session,
    thus logging the user out.
*/
async function signOut(req, res){
    try {
        req.session = null;
        
        return res.status(200).send({
          message: "You've been signed out!"
        });
    } catch (err) {
        return res.status(500).send({
            message: "There was an error signing out."
        });
    }
}

const signUpController = {
    signUp,
    signIn,
    signOut
}

export {}

module.exports = signUpController;