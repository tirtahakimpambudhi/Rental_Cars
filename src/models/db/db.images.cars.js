const {Model , DataTypes} = require("sequelize")
const {sequelize} = require("../../../config/db.config")
const Cars = require("./db.cars.models")

class Img_Cars extends Model {};

Img_Cars.init({
    id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false 
    },
    carsId : {
        type : DataTypes.UUID,
        allowNull : false,
        references : {
            model : Cars,
            key : "id"
        }
    },
    path : {
        type : DataTypes.TEXT,
        allowNull : false
    }
},{
    sequelize,
    timestamps : true,
    modelName : 'images_car'
})


Img_Cars.belongsTo(Cars,{foreignKey : "carsId" })
Cars.hasMany(Img_Cars,{foreignKey : "carsId" , onDelete : "CASCADE"})
module.exports = Img_Cars