
const Response_Error = require("../src/errors/error.handler");
const Seller = require("../src/models/db/db.sellers.models");


//With Attribute
const urlQueryValidation = async (id_params) => {
    try {
        const result = await Seller.findByPk(id_params)
        const checkSeller = (result) ?result.getInformationSeller() :false;
        return checkSeller ;
    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
}

//Check Account with email
const emailExist = async (email) => {
    try {
        const result = await Seller.count({
            where : {
                email
            }
        });
    
        const resultCheck = (result === 1 ) ?true :false ;
        return resultCheck ; 

    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
}


const settingsUtils = (values) => {
    const validValues = {}
    for (const value in values) {
  
      if(values[value] !== "") {
        validValues[value] = values[value]
      } 
    }

    return validValues
}



module.exports={
    urlQueryValidation,
    emailExist,
    settingsUtils
}