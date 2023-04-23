// VALIDATION
const Joi = require("joi");


//Register Validation
const registerValidation = (data) => {
    const validateSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    // VALIDATE THE DATA BEFORE WE CREATE NEW USER
    return validateSchema.validate(data);
}
// Login Validation
const loginValidation = (data) => {
    const validateSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return validateSchema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


