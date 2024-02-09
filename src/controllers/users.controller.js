const envConfig = require("../../config/env.config");
const Customer = require("../models/db/db.users.models");
const Users_Service = require("../services/users.services");
const {users_validations_register, users_validations_login} = require("../validations/users.validations")
const {seller_validations_change_password} = require("../validations/sellers.validations");
const OTP_USERS = require("../models/db/db.otp.users.model");
const service = new Users_Service(Customer,OTP_USERS)


class Users_Controller_Auth{
    async register(req,res,next) {
        try {
            const input = req.body
            const result = await service.register(input,users_validations_register);
            res.json({data:result})
        } catch (error) {
            next(error)
        }
    }

    async login (req,res,next){
        try{
            const input = req.body
            const result = await service.login(input,users_validations_login);
            res.cookie('refreshToken',result.refreshToken)
            res.json({data:result});
        } catch (error){
            next(error)
        }
    }

    async edit (req,res,next){
        try {
            const input = req.body
            const id_params = req.params.id
            const result = await service.edit(input,id_params)
            res.json({data : result})
        } catch (error) {
            next(error)
        }
    }

    async forgot_password (req,res,next){
        try {
            const email = req.body.email
            const url = envConfig.base_url+`:${envConfig.port}`+'/Kelompok_3/users/change-password'
            await service.forgot_password(email,url)
            res.redirect("login")
        } catch (error) {
            next(error)
        }
    }

    async reset_password (req,res,next){
        try {
            const input = req.body
            const email = req.params.email
            const token = req.params.token
            const result = await service.reset_password(email,token,input,seller_validations_change_password)
            res.redirect("/Kelompok_3/users/login")
        } catch (error) {
            next(error)
        }
    }



    async logout (req,res,next){
        try {
            const refreshToken = req.cookies.refreshToken;
            // Mengarahkan pengguna ke halaman login
            await service.logout(res,refreshToken,"/Kelompok_3/users/login")
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new Users_Controller_Auth()