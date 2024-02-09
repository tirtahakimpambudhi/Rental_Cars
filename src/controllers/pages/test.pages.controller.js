const { logger_console } = require("../../../config/winston.config")
const Cars = require("../../models/db/db.cars.models")
const Img_Cars = require("../../models/db/db.images.cars")
const Seller = require("../../models/db/db.sellers.models")
const { cars_validations_add, test } = require("../../validations/cars.validations")
const validations = require("../../validations/validations")

const testing = async (req,res,next) => {
    const errors = req.flash('error')
    try {
    res.render('test/index.ejs',{layout : "test/Partials/main-layout.ejs",errors,title:"Testing"})
    } catch (error) {
        next(error)
    }
}

const testing_db = async (req,res,next) => {
    try {
        const result = await Cars.findAll({
            include : {
                model : Img_Cars
            }
        })

        res.json({data : result})
    } catch (error) {
        next(error)
    }
}

const testing_post = async (req,res,next) => {
    try {
        res.json({data:req.body})
    } catch (error) {
        next(error)
    }
}

const testing_flash = async (req,res,next) => {
    try {
        throw new Error("Testing")
    } catch (error) {
        req.flash('error',error.message)
        res.redirect("/Kelompok-3/test")
    }
}
const testing_uploads = async (req,res,next) => {
    try {
        const data = req.files
        const input = {
            img : {data}
        }
        const validate_input = validations(test,input)
        const images = validate_input.value.img.data
        let bulk_data = []
        images.forEach(image => {

            let test = {}
            test.carsId = 1
            test.img = image.filename
            bulk_data.push(test)
        });
        console.log(bulk_data)
        res.json({data:images})
    } catch (error) {
        next(error)
    }
}



module.exports = {testing,testing_flash,testing_uploads,testing_post,testing_db}