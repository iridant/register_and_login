const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");

/*
    This function will attempt to retrieve the user's JWT from the serverside cookies
    after, if a token was retrieved, it will be verified with the jwt library. If the
    token is successfully verified, then the middleware will set some flags and continue
    to the next middleware/controller depending on execution order.
*/
async function verifyJWT(req, res, next){
    let token = req.session.token;

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
        req.userId = decoded.id;
        next();
    });
}

const authMiddleware = {
    verifyJWT
}

export {}

module.exports = authMiddleware;