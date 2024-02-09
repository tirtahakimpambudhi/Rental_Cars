
const jwt = require("jsonwebtoken")
const Seller = require("../../models/db/db.sellers.models")
const envConfig = require("../../../config/env.config")
const { logger_file, logger_console } = require("../../../config/winston.config")

const refreshTokenMiddleware = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) res.sendStatus(401)

        const seller = await Seller.findOne({
            where : {
                refresh_token : refreshToken
            }
        })

        if(!seller) res.sendStatus(403)
        jwt.verify(refreshToken,envConfig.refresh_token, (err,decode) => {
            if(err) res.sendStatus(403)
            const email = seller.email
            const id = seller.id
            

            const accessToken = jwt.sign({email,id}, envConfig.access_token,{expiresIn : '60s'})

            res.json({data : {accessToken}})
        })


    } catch (error) {
        logger_file.error(error)
        logger_console.error(error)
        res.status(500).json({errors : error.message})
    }
}

module.exports=refreshTokenMiddleware