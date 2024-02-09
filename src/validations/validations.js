const { logger_console } = require("../../config/winston.config")
const Response_Error = require("../errors/error.handler")

const validations = (schema,request) => {
    const result = schema.validate(request, {
        aboutEarly : false
    }) 

    if(result.error){
       throw new Response_Error(400,result.error.message)
    } else {
        return result
    }
}

module.exports = validations