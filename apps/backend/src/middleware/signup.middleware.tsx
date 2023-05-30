const User = require("../models/user.model");

/*
    This function will lookup the attempted registration username and verify that
    an account with the same username doesn't exist, if the check is passed -
    the middleware will continue with execution of the controller depending on the
    middleware's order of execution.
*/
async function validateDuplicateUsername(req, res, next){
    try{
        let user = await User.findOne({username: req.body.username});

        if (user) {
            return res.status(400).send({
              message: "Failed! Username is already in use!"
            });
        }

        next();
        
    }catch (error) {
        console.error(error);

        return res.status(500).send({
          message: "Unable to validate username!"
        });
    }
};

/*
    This function will compare the attempted registration password with a regex that
    validates that the password contains at least 8 characters, an uppercase letter,
    a lower case letter, a number, and a special character, if the check is passed -
    the middleware will continue with execution of the controller depending on the
    middleware's order of execution.
*/
async function validatePassword(req, res, next){
    try{
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

        if(!passwordRegex.test(req.body.password)){
            return res.status(400).send({
                message: "Failed! Password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
            });
        }
    }catch(err){
        console.error(err);

        return res.status(500).send({
            message: "Unable to validate password!"
        });
    }

    next();
}

const signupMiddleware = {
    validateDuplicateUsername,
    validatePassword
}

export {}

module.exports = signupMiddleware;