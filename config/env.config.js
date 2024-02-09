const path = require("path")
require("dotenv").config({path : path.join(__dirname,'..','.env')})

module.exports = {
    db_name : process.env.DB_NAME,
    db_user : process.env.DB_USER,
    db_password : process.env.DB_PASSWORD,
    db_host : process.env.DB_HOST,
    base_url : process.env.BASE_URL,
    port : parseInt(process.env.PORT),
    log_level : process.env.LOG_LEVEL,
    dialect : process.env.DB,
    salt : parseInt(process.env.SALT_LEVEL),
    access_token : process.env.ACCESS_TOKEN_SECRET ,
    refresh_token : process.env.REFRESH_TOKEN,
    secret_token : process.env.SECRET_TOKEN,
    data_per_page : parseInt(process.env.DATA_PER_PAGE),
    email : process.env.EMAIL,
    password : process.env.PASS
}