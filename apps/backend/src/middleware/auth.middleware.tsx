const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId; 

const config = require("../config/config");

/*
    This function will attempt to retrieve the user's JWT from the serverside cookies
    after, if a token was retrieved, it will be verified with the jwt library. If the
    token is successfully verified, then the existence of a user corresponding with the
    token will be confirmed and the middleware will continue to the next middleware/controller 
    depending on execution order.
*/
async function verifyJWT(req, res, next){
    try{
        let token = req.headers.authorization;

        if (!token) {
            return res.status(403).send({
                message: "No token provided!",
            });
        }
    
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }

            User.findById(decoded.id).then((user) => {
                if(!user){
                    return res.status(410).send({
                        message: "No user matching that token was found"
                    })
                }

                req.userId = decoded.id;
                next();
            })
        });
    }catch(err){
        return res.status(500).send({
            message: "Error verifying token"
        })
    }
}

/*
    This function will attempt to retrieve the user by using the userId previously assigned by
    verifyJWT(), afterwards the roles array is searched for the "admin" role.  If the role exists,
    then the middleware will continue to the next method in the execution order.  Otherwise, the user
    will be sent a response stating that they are unauthorized to access the endpoint.
    
*/
async function isAdmin(req, res, next){
    try{
        console.log(req)
        User.findById(req.userId).then((user) => {
            if(!user.roles.includes("admin")){
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            
            next();
        }).catch((err) => {
            return res.status(500).send({
                message: "User not found!",
            });
        });
    }catch(err){
        return res.status(500).send({
            message: "Could not verify admin role!",
        });
    }
}

/*
    This function will attempt to retrieve the user by using the userId previously assigned by
    verifyJWT(), afterwards the roles array is searched for the "mod" role or greater.  If the
    role exists, then the middleware will continue to the next method in the execution order.
    Otherwise, the user will be sent a response stating that they are unauthorized to access the endpoint.
*/
async function isModerator(req, res, next){
    try{
        User.findById(req.userId).then((user) => {
            if(!["mod", "admin"].some(i => user.roles.includes(i))){
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }

            next();
        }).catch((err) => {
            return res.status(500).send({
                message: "User not found!",
            });
        });
    }catch(err){
        return res.status(500).send({
            message: "Could not verify moderator role!",
        });
    }
}

/*
    This function will attempt to retrieve the user by using the userId previously assigned by
    verifyJWT(), afterwards the roles array is searched for the "user" role or greater.  If the
    role exists, then the middleware will continue to the next method in the execution order.
    Otherwise, the user will be sent a response stating that they are unauthorized to access the endpoint.
*/
async function isUser(req, res, next){
    try{
        User.findById(req.userId).then((user) => {
            if(!["user", "mod", "admin"].some(i => user.roles.includes(i))){
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }

            next();
        }).catch((err) => {
            return res.status(500).send({
                message: "User not found!",
            });
        });
    }catch(err){
        return res.status(500).send({
            message: "Could not verify user role!",
        });
    }
}

const authMiddleware = {
    verifyJWT,
    isAdmin,
    isModerator,
    isUser
}

export {}

module.exports = authMiddleware;