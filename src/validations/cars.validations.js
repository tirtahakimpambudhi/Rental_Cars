const Joi = require("joi")

const test = Joi.object({
    img:Joi.object({
        data:Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().required()
        })).required()
    })
})
const cars_validations_add = Joi.object({
    plat:Joi.string().required(),
    merk : Joi.string().max(100).required(),
    tipe : Joi.string().max(100).required(),
    modelCars : Joi.string().max(100).required(),
    color : Joi.string().max(100).required(),
    pricePerDay : Joi.number().required(),
    prudutionYear : Joi.string().max(100).required(),
    engine : Joi.string().max(200).required(),
    description : Joi.string().required(),
    mileagePerLiter:Joi.number().required(),
})

const cars_validations_edit = Joi.object({
    plat : Joi.string().max(100).optional(),
    merk : Joi.string().max(100).optional(),
    tipe : Joi.string().max(100).optional(),
    statusRental : Joi.boolean().optional(),
    modelCars : Joi.string().max(100).optional(),
    color : Joi.string().max(100).optional(),
    pricePerDay : Joi.number().optional(),
    prudutionYear : Joi.string().max(100).optional(),
    engine : Joi.string().max(200).optional(),
    description : Joi.string().optional(),
    mileagePerLiter:Joi.string().optional(),
})


module.exports={cars_validations_add,cars_validations_edit,test}