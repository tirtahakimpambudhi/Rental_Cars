const Cars = require("../../models/db/db.cars.models")
const Invoice = require("../../models/db/db.invoices.models")
const Seller = require("../../models/db/db.sellers.models")
const Customer = require("../../models/db/db.users.models")
const Users_Service_Pages = require("../../services/pages/users.pages.service")
const service = new Users_Service_Pages(Seller,Cars,Customer,Invoice)

class Users_Controller_Pages{
    async verification_page(req,res,next){
        try {
            const id_params = req.id
            // res.redirect(`/Kelompok-3/rental-cars/${id_params}`)
            res.json({data : id_params})
        } catch (error) {
            next(error)
        }
    }

    async home_page(req,res,next){
        try {
            const id_params = req.params.id
            const result = await service.home_page(id_params)
            res.json({data : result})
        } catch (error) {
            next(error)
        }
    }

    async change_password(req,res,next){
        try {
            const email = req.params.email
            const token = req.params.token
            const result = await service.change_password_page(email,token)
            res.json({title : "Change Password", result})
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new Users_Controller_Pages()