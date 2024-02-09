const { ValidationError } = require("sequelize");
const multer = require('multer')
const Response_Error = require("../errors/error.handler");
const jwt = require('jsonwebtoken');

const error_handler_cars = async (err, req, res,redirectTo) => {

  let messages = {
      code: 500,
      msg: 'Internal Server Error'
  };
  
  if (err instanceof Response_Error) {
      messages.code = err.status;
      messages.msg = err.message;
  } else if (err instanceof ValidationError) {
      const validationErrors = err.errors.map((e) => ({
          field: e.path,
          message: e.message,
      }));
      messages.code = 400;
      messages.msg = validationErrors[0].message;
  } else if (err instanceof multer.MulterError) {
      messages.code = 400;
      messages.msg = err.message;
  } else if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
      messages.code = 401;
      messages.msg = err.message;
  }
  
  req.flash("error", messages);
  
  res.redirect(redirectTo)
  };
// let messages = {}
// const error_middleware = async (err, req, res, next) => {


//   if(!err){
//     next()
//     return ;
// }

// if(err instanceof Response_Error){
//     //Req.flash()
//     messages.code = err.status
//     messages.msg = err.message
//     req.flash("error",messages)
//     // res.status(err.status).json({errors : err.message}).end();
// } else if(err instanceof ValidationError){
//     const validationErrors = err.errors.map((e) => ({
//         field: e.path,
//         message: e.message,
//       }));
//       messages.code = 400
//       messages.msg = validationErrors[0].message
//       req.flash("error",messages)
//     //   res.status(400).json({ errors: validationErrors }).end();
// } else if (err instanceof multer.MulterError ){
//     res.status(400).json({errors : err.message}).end();
// } else if (err instanceof jwt.TokenExpiredError) {
//     messages.code = 401
//     messages.msg = err.message
//     req.flash("error",messages)
//   }  else if(err instanceof jwt.JsonWebTokenError){
//     messages.code = 401
//     messages.msg = err.message
//     req.flash("error",messages)
// } else {
//     res.status(500).json({errors : err.message}).end();
// }
// };

module.exports = error_handler_cars
