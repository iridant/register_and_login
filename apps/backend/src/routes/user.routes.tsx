const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware")

const User = require("../models/user.model");

// This endpoint should retrieve data about a specific user. (Read)
router.get("/:id", [authMiddleware.verifyJWT, authMiddleware.isAdmin], function(req, res){
    User.findById(req.params.id).then((user) => {
        res.status(200).send({
            message: "Success.",
            user: user
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Unable to find user provided."
        })
    })   
})

// This endpoint should update a specific user's password/account information (Update)
router.put("/:id", [authMiddleware.verifyJWT, authMiddleware.isSelf], function(req, res){
    res.status(200).send({
        message: "Hello"
    })
})

// This endpoint should remove a specific user from the database. (Delete)
router.delete("/:id", [authMiddleware.verifyJWT, authMiddleware.isAdmin], function(req, res){
    User.findByIdAndDelete(req.params.id).then((user) => {
        res.status(200).send({
            message: "Successfully deleted user.",
            user: user
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Unable to find or delete user provided."
        })
    }) 
})

// This endpoint should retrieve ALL users from the database. (Read)
router.get("", [authMiddleware.verifyJWT, authMiddleware.isAdmin], function(req, res){
    User.find().then((users) => {
        res.status(200).send({
            users: users
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Error retrieving user list from the database."
        })
    })
})

export {}

module.exports = router;