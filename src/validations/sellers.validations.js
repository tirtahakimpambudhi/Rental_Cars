const Joi = require("joi");


const seller_validations_register = Joi.object({
    noRekening:Joi.string().required(),
    nameCompany:Joi.string().required(),
    name : Joi.string().required(),
    email:Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    noTelp : Joi.string().min(8).required(),
    address : Joi.string().required()
})


const seller_validations_login = Joi.object({
    email:Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    repeatPassword : Joi.string().valid(Joi.ref('password')) // Use Joi.ref() to refer to the 'password' field
    .messages({'any.only': 'confirm password and password not same',}).required()
})


const seller_validations_edit = Joi.object({
    noRekening:Joi.string().optional(),
    emailOld : Joi.string().email().required(),
    passwordOld : Joi.string().min(8).required(),
    nameCompany:Joi.string().optional(),
    name : Joi.string().optional(),
    email:Joi.string().email().optional(),
    password : Joi.string().min(8).optional(),
    noTelp : Joi.string().min(8).optional(),
    address : Joi.string().optional()
    // confirmPassword : Joi.string().valid(Joi.ref('password')) // Use Joi.ref() to refer to the 'password' field
    // .messages({'any.only': 'confirm password and password not same'})
})

const seller_validations_change_password = Joi.object({
    password : Joi.string().min(8).required(),
    repeatPassword : Joi.string().valid(Joi.ref('password')) // Use Joi.ref() to refer to the 'password' field
    .messages({'any.only': 'confirm password and password not same',}).required()
})


module.exports={seller_validations_register,seller_validations_login,seller_validations_edit,seller_validations_change_password}