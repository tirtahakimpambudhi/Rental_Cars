const Cars = require("../models/db/db.cars.models")
const Invoice = require("../models/db/db.invoices.models")
const Seller = require("../models/db/db.sellers.models")
const Customer = require("../models/db/db.users.models")
const Invoice_Service_CRUD = require("../services/invoices.services")
const {invoice_validations_add, invoice_validations_edit} = require("../validations/invoices.validations")
const service = new Invoice_Service_CRUD(Invoice,Customer,Seller,Cars)


class Invoice_Controller {
    async create(req,res,next){
        try {
            const id_params = req.params.id
            const id_cars = req.params.id_cars
            const input = req.body
            const result = await service.create_invoice(input,invoice_validations_add,id_params,id_cars)
            res.json({data : result})
        } catch (error) {
            next(error)
        }
    }

    async edit(req,res,next){
        try {
            const id_params = req.params.id
            const id_Inv = req.params.id_Inv
            const input = req.body
            const result = await service.edit_invoice(input,invoice_validations_edit,id_params,id_Inv);
            res.json({data : result})
        } catch (error) {
            next(error)
        }
    }
    async delete(req,res,next){
        try {
            const id_params = req.params.id
            const id_Inv = req.params.id_Inv
            const result = await service.delete_invoice(id_params,id_Inv)
            res.status(200).json({data : "OK"})
        } catch (error) {
            next(error)
        }
    }
}




module.exports = new Invoice_Controller()