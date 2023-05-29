const User = require("../models/user.model");

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

async function validatePassword(req, res, next){
    try{
        if(!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
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

const verifySignup = {
    validateDuplicateUsername,
    validatePassword
}

export {}

module.exports = verifySignup;