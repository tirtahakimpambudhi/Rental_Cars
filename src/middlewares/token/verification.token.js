const jwt = require("jsonwebtoken");
const envConfig = require("../../../config/env.config");
const { logger_file, logger_console } = require("../../../config/winston.config");


const verification_token = (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token,envConfig.access_token, (err,decode) => {
            if(err) return res.sendStatus(403)
    
            req.email = decode.email
            req.id = decode.id
            next()
        })
    } catch (error) {
        logger_file.error(error)
        logger_console.error(error)
        res.status(500).json({errors : error.message})
    }
}

module.exports=verification_token