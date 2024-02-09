const Seller = require("../../models/db/db.sellers.models")
const Cars = require("../../models/db/db.cars.models")
const Customer = require("../../models/db/db.users.models")
const Invoice = require("../../models/db/db.invoices.models")
const History_Invoice = require("../../models/db/db.history.invoices")
const Seller_Service_Page = require("../../services/pages/seller.page.service")
const envConfig = require("../../../config/env.config")

const { invoice_validations_mulct } = require("../../validations/invoices.validations")

const service = new Seller_Service_Page(Seller,Cars,Customer,Invoice,History_Invoice)


class Seller_Controller_Page {

    async register_page(req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            res.status(code).render('seller/auth/auth-register.ejs',{layout : "seller/auth/partials/main.ejs",title : "Register",errors})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3")
        }
    }
    async home_page (req,res,next) {
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const id_params = req.params.id
            const result = await service.get_home_page(id_params)
            res.status(code).render("seller/dashboard/index.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,errors,title:"HOME"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
    }
    async login_page (req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
         res.status(code).render('seller/auth/auth-login.ejs',{layout : "seller/auth/partials/main.ejs",title : "Login",errors})
        } catch (error) {
         next(error)
         res.redirect("/Kelompok_3")
        }
        
     }
     async otp_verification_page (req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            res.status(code).render('seller/auth/auth-otp.ejs',{layout : "seller/auth/partials/main.ejs",title : "OTP VERIFICATION",errors})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller")
        }
     }
     async forgot_password_page (req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
         res.status(code).render('seller/auth/auth-forgot-password.ejs',{layout : "seller/auth/partials/main.ejs",title : "Forgot Password",errors}) 
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
     }
     async verification (req,res,next){
         try {
             const result = req.id
             //Endpoint Home
             res.json({data : result})//Redirect Front End
         } catch (error) {
             next(error)
         }
     }
     async verification_token_page(req,res,next){
        try {
            res.render('seller/auth/auth-verification-token.ejs',{layout : "seller/auth/partials/main.ejs",title : "Verification-token"}) 
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
     }
     async verification_page(req,res,next){
        try {
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            const accessToken = req.query.accesToken
            res.status(code).render('seller/auth/auth-verification.ejs',{layout : "seller/auth/partials/main.ejs",title : "Verification",errors,accessToken}) 
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/login")
        }
     }
     async priview_cars_page(req,res,next){
        try {
            const id_params = req.params.id
            const page_to = req.query.p
            const data_per_page = envConfig.data_per_page
            const result = await service.get_cars_page(id_params,page_to,data_per_page)
            res.json({data : result})
        } catch (error) {
            next(error)
        }
     }

     async change_password_page(req,res,next){
        try {
            const email = req.params.email
            const token = req.params.token
            await service.change_password_page(email,token)
            const errors = req.flash('error')
            const code = ( errors.length == 0  ) ?200 :errors[0].code 
            res.status(code).render('seller/auth/auth-reset-password.ejs',{layout : "seller/auth/partials/main.ejs",title : "Reset Password",errors}) 
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/forgot-password")
        } 
     }

     async refresh_token(req,res,next){
        try {

        } catch (error) {
            next(error)
        }
     }
     
     async mulct_invoices (req,res,next){
        try {
            const id_params = req.params.id
            const id_Inv = req.params.id_Inv
            const input = req.body
            const result = await service.mulct_users_invoice(id_params,id_Inv,input,invoice_validations_mulct)
            res.json({data : result })
        } catch (error) {
            next(error)
        }
     }
}

module.exports = new Seller_Controller_Page()