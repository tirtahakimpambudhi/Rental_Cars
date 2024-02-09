const Joi = require("joi")


const users_validations_register = Joi.object({
    name : Joi.string().max(100).required(),
    email : Joi.string().max(100).email().required(),
    noTelp : Joi.string().max(15).required(),
    address : Joi.string().max(400).required(),
    password : Joi.string().min(8).required(),
    repeatPassword : Joi.string().valid(Joi.ref('password')) // Use Joi.ref() to refer to the 'password' field
    .messages({'any.only': 'confirm password and password not same',}).required()
})


const users_validations_edit = Joi.object({
    emailOld : Joi.string().max(100).email().required(),
    passwordOld : Joi.string().min(8).required(),
    name : Joi.string().max(100).optional(),
    email : Joi.string().max(100).email(),
    noTelp : Joi.string().max(15).optional(),
    address : Joi.string().max(400).optional(),
    password : Joi.string().min(8).optional(),
})

const users_validations_login = Joi.object({
    email : Joi.string().max(100).email().required(),
    password : Joi.string().min(8).required(),
    repeatPassword : Joi.string().valid(Joi.ref('password')) // Use Joi.ref() to refer to the 'password' field
    .messages({'any.only': 'confirm password and password not same',}).required()
})

module.exports = {users_validations_register,users_validations_edit,users_validations_login}