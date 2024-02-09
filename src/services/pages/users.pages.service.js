const envConfig = require("../../../config/env.config");
const jwt = require("jsonwebtoken");
const {urlQueryValidationUsers , emailExistUsers} = require("../../../utils/users.utils")
const Response_Error = require("../../errors/error.handler")

class Users_Service_Pages{
    constructor(Seller_DB,Cars_DB,Customer_DB,Invoice_DB){
        this.Seller = Seller_DB
        this.Cars = Cars_DB
        this.Customer = Customer_DB
        this.Invoice = Invoice_DB
    }

    async home_page(id_params){
        try {
            const url_id_params = await urlQueryValidationUsers(id_params);
            if (!url_id_params) throw new Response_Error(404, "NOT FOUND");
            return url_id_params
        } catch (error) {
            throw error
        }
    }

    async change_password_page(email,token){
        try {
            const email_validate = await emailExistUsers(email)
            if(!email_validate) throw new Response_Error(404,"EMAIL DOESNT EXIST")
            const secret = envConfig.secret_token + email
            const payload = jwt.verify(token,secret);
            return payload
        } catch (error) {
            throw error
        }
    }

}

module.exports = Users_Service_Pages