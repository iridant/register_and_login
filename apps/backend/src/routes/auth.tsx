const express = require("express");
const router = express.Router();

const signupMiddleware = require("../middleware/signup.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const signUpController = require("../controllers/signup.controller");

router.post("/signin", signUpController.signIn);
router.post("/signout", signUpController.signOut);
router.post("/signup", [signupMiddleware.validateDuplicateUsername, signupMiddleware.validatePassword], signUpController.signUp);

export {}

module.exports = router;