const { Model , DataTypes } = require("sequelize")
const {sequelize} = require("../../../config/db.config")


class Seller extends Model {
    getInformationSeller(){
        return {id : this.id , name : this.name, email : this.email , password : this.password }
    }
}
    

Seller.init({
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false
    },
    noRekening:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    nameCompany: {
        type : DataTypes.STRING,
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
    timestamps : true,
    modelName : 'seller',
    sequelize
})




module.exports=Seller