const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware")


// This endpoint should retrieve data about a specific user. (Read)
router.get("/:id", [authMiddleware.isAdmin], function(req, res){
    res.status(200).send({
        message: "Hello"
    })
})

// This endpoint should update a specific user's password/account information (Update)
router.put("/:id", [authMiddleware.isSelf], function(req, res){
    res.status(200).send({
        message: "Hello"
    })
})

// This endpoint should remove a specific user from the database. (Delete)
router.delete("/:id", [authMiddleware.isAdmin], function(req, res){
    res.status(200).send({
        message: "Hello"
    })
})

// This endpoint should retrieve ALL users from the database. (Read)
router.get("", [authMiddleware.isAdmin], function(req, res){
    res.status(200).send({
        message: "Hi"
    })
})

export {}

module.exports = router;