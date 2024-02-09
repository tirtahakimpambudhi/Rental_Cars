const Response_Error = require("../errors/error.handler")
const Cars = require("../models/db/db.cars.models")
const Img_Cars = require("../models/db/db.images.cars")
const Seller = require("../models/db/db.sellers.models")
const Cars_Service_CRUD = require("../services/cars.services")
const { test, cars_validations_add, cars_validations_edit } = require("../validations/cars.validations")
const validations = require("../validations/validations")
const service = new Cars_Service_CRUD(Cars,Img_Cars,Seller)

const error_handler_cars = require("../errors/errors.cars.handler")



class Cars_Controller {
    async create_cars(req, res, next) {
        const id_params = req.params.id
        try {
            const data = req.files
            const images_data = { img : {data}}
            const input = req.body
            const images = validations(test,images_data);
            if(images.value.img.data.length === 0 ) throw new Response_Error(400, "File Required")
            await service.create(input,id_params,cars_validations_add,images.value.img.data)
            res.redirect(`/Kelompok_3/seller/dashboard/add-cars/${id_params}`)
        } catch (error) {
            error_handler_cars(error,req,res,`/Kelompok_3/seller/dashboard/add-cars/${id_params}`)
        }
    }

    async edit_cars (req,res,next){
        try {
            const id_params = req.params.id
            const id_cars = req.params.carsId
            const data = req.files
            const images_data = { img : {data}}
            const input = req.body
            if(images_data.img.data.length === 0 ){
                delete input.img;
            }
            const result = await service.update(id_cars,id_params,cars_validations_edit,input,images_data.img.data)

            res.json({data:input})
        } catch (error) {
            next(error)
        }
    }

    async delete_cars (req,res,next){
        try {
            const id_params = req.params.id
            const id_cars = req.params.carsId
            const result = await service.delete(id_params,id_cars);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new Cars_Controller()