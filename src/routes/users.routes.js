const express = require('express')
const Invoice_Controller = require('../controllers/invoice.controller')
const Users_Controller_Pages = require('../controllers/pages/users.pages.controller')
const Users_Controller_Auth = require('../controllers/users.controller')
const verification_token = require('../middlewares/token/verification.token')







const users_route = express.Router()
//Auth Page
users_route.post("/users/", Users_Controller_Auth.register)
users_route.post("/users/login", Users_Controller_Auth.login)
users_route.delete("/users/logout", Users_Controller_Auth.logout)
users_route.post("/users/forgot-password",Users_Controller_Auth.forgot_password)
users_route.post("/users/forgot-password",Users_Controller_Auth.forgot_password)
users_route.get('/users/change-password/:email/:token', Users_Controller_Pages.change_password)
users_route.post('/users/change-password/:email/:token', Users_Controller_Auth.reset_password)

//Verification 
users_route.get("/users/verification",verification_token,Users_Controller_Pages.verification_page)

//Home Page
users_route.get("/rental-cars/:id",Users_Controller_Pages.home_page)

//Rental Cars
users_route.post("/rental-cars/:id/cars/:id_cars",Invoice_Controller.create)
users_route.put("/rental-cars/:id/Invoice/:id_Inv",Invoice_Controller.edit)
users_route.delete("/rental-cars/:id/Invoice/:id_Inv",Invoice_Controller.delete)

















module.exports = users_route
