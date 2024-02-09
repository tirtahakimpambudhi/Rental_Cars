const Seller = require("../../models/db/db.sellers.models")
const Cars = require("../../models/db/db.cars.models")
const Customer = require("../../models/db/db.users.models")
const Invoice = require("../../models/db/db.invoices.models")
const History_Invoice = require("../../models/db/db.history.invoices")
const Img_Cars = require("../../models/db/db.images.cars")
const Seller_Service_Page = require("../../services/pages/seller.page.service")
const envConfig = require("../../../config/env.config")
const {logger_console} = require("../../../config/winston.config");



const service = new Seller_Service_Page(Seller,Cars,Customer,Invoice,History_Invoice,Img_Cars)



class Dashboard {
    async index(req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const data = await service.dashboard_page(id_params)
            const result = data.result

            res.status(code).render("seller/dashboard/dashboard.ejs",{layout :"seller/dashboard/Partials/main.ejs",errors,result,data,title:"Dashboard"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
    async data_cars(req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const page_to = req.query.p
            const data = await service.data_cars_page(id_params,page_to)
            const result = data.result
            res.status(code).render("seller/dashboard/dashboard-data-cars.ejs",{layout :"seller/dashboard/Partials/main.ejs",errors,result,data,title:"Dashboard"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
    async table_cars(req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const page_to = req.query.p
            const data = await service.data_cars_page(id_params,page_to)
            const result = data.result
            res.status(code).render("seller/dashboard/dashboard-table-cars.ejs",{layout :"seller/dashboard/Partials/main.ejs",errors,result,data,title:"Table Cars"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
    async profile (req,res,next){
        try {
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.render("seller/dashboard/dashboard-profile.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,title:"Profile"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
    async settings (req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.status(code).render("seller/dashboard/dashboard-settings.ejs",{layout :"seller/dashboard/Partials/main.ejs",errors,result,title:"Profile"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }

    async add_cars_page(req,res,next) {
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.status(code).render("seller/dashboard/dashboard-add-cars.ejs", { layout: "seller/dashboard/Partials/main.ejs", errors, result, title: "Add-Cars" })
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }

    async edit_cars_page(req,res,next) {
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const id_cars = req.params.carsId
            const carsValue = await service.get_car_by_id(id_params,id_cars)
            const result = await service.profile_page(id_params)
            res.status(code).render("seller/dashboard/dashboard-edit-cars.ejs", { layout: "seller/dashboard/Partials/main.ejs", errors,carsValue, result, title: "Edit-Cars" })
        } catch (error) {
            logger_console.error(error)
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }

    async preview_cars_page(req,res,next) {
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code
            const id_params = req.params.id
            const page = (req.query.page == "0") ?1 :parseInt(req.query.page)
            const result = await service.profile_page(id_params)
            const data = await  service.get_cars_page(id_params,page,envConfig.data_per_page)
            res.status(code).render("seller/dashboard/dashboard-preview-cars.ejs", {layout :"seller/dashboard/Partials/main.ejs",errors,data,result,title:"Preview-Cars"})
        } catch (error) {
            logger_console.error(error)
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
}

module.exports = new Dashboard()