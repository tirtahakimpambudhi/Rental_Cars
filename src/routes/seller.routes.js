const express = require("express");
const Seller_Controller_Auth = require("../controllers/seller.controller");
const Seller_Controller_Page = require("../controllers/pages/seller.pages.controller")
const verification_token = require("../middlewares/token/verification.token");
const refresh_token = require("../middlewares/token/refresh.token");
const { testing, testing_flash, testing_uploads, testing_post, testing_db } = require("../controllers/pages/test.pages.controller");
const upload = require("../../config/multer.config");
const Cars_Controller = require("../controllers/cars.controller");
const Dashboard = require("../controllers/pages/seller.dashboard.pages.controller");

const route = express.Router()
//Testing
route.get("/test",testing)
route.get("/test/all",testing_db)
route.post("/test",testing_post)
route.get("/test/flash",testing_flash) 
route.post("/test/upload" , upload.array('img',5) ,testing_uploads) 

//Register Page
route.get('/seller', Seller_Controller_Page.register_page)
route.post('/seller', Seller_Controller_Auth.register)
route.get('/seller/otp-verification/:email',Seller_Controller_Page.otp_verification_page)
route.post('/seller/otp-verification/:email',Seller_Controller_Auth.otp_verification)
//Login Page
route.get('/seller/login', Seller_Controller_Page.login_page)
route.post('/seller/login', Seller_Controller_Auth.login)
//Forgot Password Page
route.get('/seller/forgot-password', Seller_Controller_Page.forgot_password_page)
route.post('/seller/forgot-password', Seller_Controller_Auth.forgot_password)
route.get('/seller/change-password/:email/:token', Seller_Controller_Page.change_password_page)
route.post('/seller/change-password/:email/:token', Seller_Controller_Auth.reset_password)

//Verification Page
route.get('/seller/verification',Seller_Controller_Page.verification_page)
route.get('/seller/verification-token',Seller_Controller_Page.verification_token_page)
route.post('/seller/verification',verification_token,Seller_Controller_Page.verification)//Ajax || Fetch
route.post('/seller/verification/refresh-token',refresh_token,Seller_Controller_Page.refresh_token)

//Dashboard Page
route.get("/seller/:id",Seller_Controller_Page.home_page)
route.get("/seller/dashboard/:id",Dashboard.index)
route.delete("/seller/dashboard/logout",Seller_Controller_Auth.logout)
route.get("/seller/dashboard/profile/:id",Dashboard.profile)
route.get("/seller/dashboard/settings/:id",Dashboard.settings)
route.patch("/seller/dashboard/settings/:id", Seller_Controller_Auth.edit)
route.get("/seller/dashboard/data-cars/:id", Dashboard.data_cars)

//Cars Page
route.get("/seller/dashboard/add-cars/:id", Dashboard.add_cars_page)
route.get("/seller/dashboard/previews-cars/:id",Dashboard.preview_cars_page)
route.get("/seller/dashboard/cars/:id",Dashboard.table_cars)
route.get("/seller/dashboard/edit-cars/:id/:carsId",Dashboard.edit_cars_page)
route.post("/seller/dashboard/add-cars/:id",upload.array('img',3),Cars_Controller.create_cars)
route.patch("/seller/dashboard/edit-cars/:id/:carsId",upload.array('img',3),Cars_Controller.edit_cars)
route.delete("/seller/dashboard/delete-cars/:id/:carsId",Cars_Controller.delete_cars)


//Invoice Page
route.post("/seller/invoice/:id/:id_Inv",Seller_Controller_Page.mulct_invoices)

module.exports = route