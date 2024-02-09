const Joi = require("joi")

const invoice_validations_add = Joi.object({
    days : Joi.number().required(),
    payment : Joi.string().required()
})

const invoice_validations_edit = Joi.object({
    days : Joi.number().required(),
    payment : Joi.string().required()
})
const invoice_validations_mulct = Joi.object({
    days : Joi.number().required(),
})

module.exports={invoice_validations_add,invoice_validations_edit,invoice_validations_mulct}
