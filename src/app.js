require("./models/models");
const cookieParser = require("cookie-parser")
const express = require("express");
const express_ejs_layout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session")
const env = require("../config/env.config");
const { logger_console } = require("../config/winston.config");
const seller_route = require("./routes/seller.routes");
const error_middleware = require("./middlewares/error.middleware");
const users_route = require("./routes/users.routes");
const methodOverride = require('method-override')



const app = express()
const PORT = env.port  || 3000
//Views
app.set('view engine','ejs')
app.use(express_ejs_layout)
app.use(flash())
app.use(session({
    secret : "error_msg",//.env
    saveUninitialized : true,
    resave : false
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'));
app.use("/Kelompok_3",seller_route);
app.use("/Kelompok_3",users_route);
app.use(error_middleware)


//Static File

app.use("/Kelompok_3",express.static('upload'))
app.use("/Kelompok_3",express.static('assets'))


module.exports=app