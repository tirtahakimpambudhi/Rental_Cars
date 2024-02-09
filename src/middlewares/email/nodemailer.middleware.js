
const nm = require("nodemailer")
const envConfig = require("../../../config/env.config")
const Response_Error = require("../../errors/error.handler")


const user = envConfig.email
const pass = envConfig.password


 function sendEmail (toEmail,subject,message) {
    const transport = nm.createTransport({
        service:"gmail",
        auth : {
            user,
            pass
        }
    })

    const options = {
        from:`"ADMIN" <no-reply@gmail.com>`,
        to:toEmail,
        subject:subject,
        text:message
    }

    transport.sendMail(options, (err,info) => {
        if(err) throw new Response_Error(400,err.message);
    })
    
}

module.exports = sendEmail