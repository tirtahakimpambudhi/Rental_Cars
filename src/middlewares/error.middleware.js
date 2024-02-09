const { ValidationError } = require("sequelize");
const multer = require('multer')
const Response_Error = require("../errors/error.handler");
const jwt = require('jsonwebtoken');

const error_middleware = async (err, req, res, next) => {


    if(!err){
      next()
      return ;
  }
  
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
  

  };

module.exports = error_middleware
