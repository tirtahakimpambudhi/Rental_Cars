const {seller_validations_register,seller_validations_login,seller_validations_edit,seller_validations_change_password} = require("../validations/sellers.validations")
const Seller = require("../models/db/db.sellers.models");
const Seller_Service = require("../services/seller.services");
const env = require("../../config/env.config");
const OTP_SELLER = require("../models/db/db.otp.seller.models");
const Response_Error = require("../errors/error.handler");
const { ValidationError } = require("sequelize");
const multer = require('multer')
const service = new Seller_Service(Seller,OTP_SELLER)
const BASE_URL = new URL(env.base_url)
BASE_URL.port += env.port
BASE_URL.pathname += 'Kelompok_3/seller/change-password'


//SETIAP NEXT(ERROR) AKAN DI REDIRECT PAGE MEREKA AGAR ERROR KELIHATAN
class Seller_Controller_Auth{
   
    async register (req,res,next) {
        try {
            const input = req.body
            await service.register(input,seller_validations_register)
            res.redirect(`/Kelompok_3/seller/otp-verification/${input.email}`)
        } catch (error) {
            next(error);
            res.redirect("/Kelompok_3/seller")

        }
    }
    // async otp_verification (req,res,next){
    //     const result = await OTP_SELLER.findAll()
    //     const result2 = await service.verified_OTP("38187f20-8dd4-42fb-9aaa-9de2230e2f4d")
    //     res.json({data : result2})
    // }
    async otp_verification (req,res,next){
        const email = req.params.email
        const key_otp = req.body.otp
        try {
            await service.OTP(key_otp,email);
            res.redirect("/Kelompok_3/seller/login")
        } catch (error) {
            next(error)
            res.redirect(`/Kelompok_3/seller/otp-verification/${email}`)
        }
    }
    async login (req,res,next) {
        try {
            const input = req.body
            const result = await service.login(input,seller_validations_login)
            res.cookie('refreshToken',result.refreshToken)
            res.redirect(`/Kelompok_3/seller/verification?accesToken=${result.accessToken}`)
        } catch (error) {
            next(error);
            res.redirect("/Kelompok_3/seller/login")
        }
    }

    async edit (req,res,next){
        try {
            const input = req.body
            const id_params = req.params.id
            const result = await service.edit(input,id_params,seller_validations_edit);

            //Endpoint Home
            res.json({data : result})
        } catch (error) {
            if(error instanceof Response_Error){
                res.status(error.status).json({errors: error.message}).end();
            } else if ( error instanceof ValidationError ){
                const validationErrors = error.errors.map((e) => ({
                    field: e.path,
                    message: e.message,
                  }));
                  res.status(400).json({errors : validationErrors.message}).end();
            } else {
                res.status(500).json({errors : error.message}).end();
            }


        }
    }

    async forgot_password (req,res,next){
        try {
            const url = BASE_URL
            const email = req.body.email
            await service.forgot_password(email,url);
            //Diganti Page Forgot Password
            res.redirect("/Kelompok_3/seller/forgot-password")
        } catch (error) {
            next(error)
            res.redirect("/Kelompok_3/seller/forgot-password")
        }
    }

    async reset_password (req,res,next){
        const input = req.body
        const email = req.params.email
        const token = req.params.token
        try {
             await service.reset_password(email,token,input,seller_validations_change_password)
            res.redirect("/Kelompok_3/seller/login")
        } catch (error) {
            next(error)
            res.redirect(`/Kelompok_3/seller/change-password/${email}/${token}`)
        }
    }

    async logout (req,res,next){
        try {
            const refreshToken = req.cookies.refreshToken;
            // Mengarahkan pengguna ke halaman login
            await service.logout(res, refreshToken, "/Kelompok_3/seller/login")
        } catch (error) {
            next(error)
        }
    }

}


module.exports = new Seller_Controller_Auth(); 
