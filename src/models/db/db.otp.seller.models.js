const {Model , DataTypes} = require("sequelize");
const {sequelize} = require("../../../config/db.config");
const Seller = require("./db.sellers.models");

class OTP_SELLER extends Model {};

OTP_SELLER.init({
    id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    client_id : {
        type : DataTypes.UUID,
        allowNull : false ,
        references : {
            model : Seller,
            key:"id"
        }
    },
    key_otp : {
        type : DataTypes.INTEGER
    },
    is_verified : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
},{
    sequelize,
    modelName:"otp_seller",
    freezeTableName: false,
    timestamps:true,

})

OTP_SELLER.belongsTo(Seller,{
    foreignKey:"client_id"
})
Seller.hasOne(OTP_SELLER,{
    foreignKey:"client_id",
    onDelete:"CASCADE"
})

module.exports = OTP_SELLER