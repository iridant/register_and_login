const express = require("express");
const router = express.Router();

const signupVerify = require("../middleware/signup.middleware")
const authController = require("../controllers/auth.controller");

router.post("/signin", authController.signOut);
router.post("/signout", authController.signIn);
router.post("/signup", [signupVerify.validateDuplicateUsername, signupVerify.validatePassword], authController.signUp);

export {}

module.exports = router;