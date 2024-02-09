const multer = require('multer')
const path = require("path")
const Response_Error = require('../src/errors/error.handler')

const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

const storage = multer.diskStorage({
    destination: function (err,file,cb) {
        cb(null,path.join(__dirname,'..','upload','images'))
    },
    filename : function(err,file,cb){
        cb(null, uniqueSuffix + file.originalname)
    }
})

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

const upload = multer({storage, limits : {
    fileSize : 1024 * 1024 * 5,
    fields:'img'
},fileFilter: function(_req, file, cb){
    
    if (!whitelist.includes(file.mimetype)) {
        return cb(new Response_Error(400,'file is not allowed'))
      }
  
      cb(null, true)
}})

module.exports = upload
