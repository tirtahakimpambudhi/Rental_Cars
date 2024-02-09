const { Model , DataTypes } = require("sequelize")
const {sequelize} = require("../../../config/db.config")

const Cars = require("./db.cars.models")
const Seller = require("./db.sellers.models")
const Customer = require("./db.users.models")


class History_Invoice extends Model {} ;

History_Invoice.init({
    id : {
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false
    },
    carsId : {
        type :DataTypes.UUID,
        allowNull : false,
        references : {
            model : Cars ,
            key : "id"
        }
    },
    customerId : {
        type :DataTypes.UUID,
        allowNull : false ,
        references : {
            model : Customer,
            key : "id"
        }
    },sellerId : {
        type :DataTypes.UUID,
        allowNull : false  ,
        references : {
            model : Seller ,
            key : "id"
        }
    },
    days : {
        type :DataTypes.INTEGER,
        allowNull : false
    },
    totalPrice : {
        type :DataTypes.INTEGER,
        allowNull : false
    },
    mulct : {
        type :DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 0
    },
    payment : {
        type :DataTypes.ENUM(['BRI','BCA','PAYPAL']),
        allowNull : false
    },
    rentalDate : {
        type : DataTypes.DATE,
        defaultValue :  DataTypes.NOW(),
        allowNull : false
    },
    dueDate : {
        type : DataTypes.DATE
    },
},{
    sequelize,
    modelName : "history_invoice",
    timestamps : true,
})

History_Invoice.belongsTo(Cars, { foreignKey: 'carsId' });
History_Invoice.belongsTo(Seller, { foreignKey: 'sellerId' });
History_Invoice.belongsTo(Customer, { foreignKey: 'customerId' });
Cars.hasMany(History_Invoice,{
    foreignKey:"carsId",
    onDelete : 'CASCADE'
})
Seller.hasMany(History_Invoice,{
    foreignKey:"sellerId",
    onDelete : 'CASCADE'
})
Customer.hasMany(History_Invoice,{
    foreignKey:"customerId",
    onDelete : 'CASCADE'
})


module.exports = History_Invoice
