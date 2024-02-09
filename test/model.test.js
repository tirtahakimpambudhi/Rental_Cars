const {Model , DataTypes} = require("sequelize")
const {sequelize} = require("../config/db.config")
const {v4 : uuidv4} = require("uuid")


class Test extends Model {}

Test.init({
    id:{
        type : DataTypes.UUIDV4,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        
    },plat : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true 
    },sellerId : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName:"test",
    timestamps : true
})



module.exports=Test