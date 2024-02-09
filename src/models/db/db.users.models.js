const {Model , DataTypes} = require("sequelize");
const {sequelize} = require("../../../config/db.config")
class Customer extends Model {
    getFullInformation(){
        return {id : this.id , name : this.name, email : this.email , password : this.password}
    }
    getInformationSeller(){
        return {id : this.id , name : this.name, email : this.email , password : this.password}
    }
} ;

Customer.init({
        id:{
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : DataTypes.UUIDV4,
            allowNull : false
        },name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            unique : true ,
            allowNull : false ,
            validate : {
                isEmail : {
                    msg: 'Please provide a valid email address'
                }
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },noTelp : {
            type : DataTypes.STRING,
            allowNull : false
        },
        address : {
            type : DataTypes.STRING,
            allowNull : false
        },
        refresh_token : {
            type : DataTypes.STRING
        }
}, {
    sequelize,
    modelName : "customer",
    timestamps : true
})

module.exports = Customer
