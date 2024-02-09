// const Customer = require("../model/customerModelDb");
// const Response_Error = require("../src/error/responseError");

const Response_Error = require("../src/errors/error.handler");
const Customer = require("../src/models/db/db.users.models");




const emailExistUsers = async (email) => {
    try {
        const result = await Customer.count({
            where : {
                email
            }
        });
    
        const resultCheck = (result === 1) ?true :false ;
        return resultCheck;
    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
};  

const urlQueryValidationUsers = async (id) => {
    try {
        const result = await Customer.findOne({
            where : {
                id
            }
        });
    
        const resultFind = (!result) ?false :result.getFullInformation();
        return resultFind;

    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
}


// const {seller , dll} = db
module.exports={
    emailExistUsers,urlQueryValidationUsers
}