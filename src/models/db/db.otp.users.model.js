const {Model , DataTypes} = require("sequelize");
const {sequelize} = require("../../../config/db.config");
const Customer = require("./db.users.models");


class OTP_USERS extends Model {};

OTP_USERS.init({
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
            model : Customer,
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
    modelName:"otp_users",
    freezeTableName: false,
    timestamps:true,

})

OTP_USERS.belongsTo(Customer, {
    foreignKey : "client_id"
})
Customer.hasOne(OTP_USERS,{
    foreignKey:"client_id",
    onDelete:"CASCADE"
})

module.exports = OTP_USERS