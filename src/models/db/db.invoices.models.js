const { Model , DataTypes } = require("sequelize")
const {sequelize} = require("../../../config/db.config")
const { logger_file, logger_console } = require("../../../config/winston.config")
const Response_Error = require("../../errors/error.handler")
const Cars = require("./db.cars.models")
const History_Invoice = require("./db.history.invoices")
const Seller = require("./db.sellers.models")
const Customer = require("./db.users.models")


class Invoice extends Model {} ;

Invoice.init({
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
    modelName : "invoice",
    timestamps : true,
    hooks : {
        afterCreate : async (inv) => {
            try {
                let cars = await Cars.findByPk(inv.carsId);

                if (cars.statusRental) {
                  throw new Response_Error(404, "Mobis Has Rental");
                } else {
                  cars.statusRental = true;
                  await cars.save();
                }
            } catch (error) {
                throw Response_Error(500,'Error From Database')
            }
        },
        beforeDestroy : async (inv) => {
            
            let cars = await Cars.findByPk(inv.carsId)

            if(!cars.statusRental){
              throw new Response_Error(404,"Mobil Sudah Di Kembalikan")
            } else {
             
              cars.statusRental = false
              await cars.save()
            }
        }
    }
})

Invoice.belongsTo(Cars, { foreignKey: 'carsId' });
Invoice.belongsTo(Seller, { foreignKey: 'sellerId' });
Invoice.belongsTo(Customer, { foreignKey: 'customerId' });
Cars.hasMany(Invoice,{
    foreignKey:"carsId",
    onDelete : 'CASCADE'
})
Seller.hasMany(Invoice,{
    foreignKey:"sellerId",
    onDelete : 'CASCADE'
})
Customer.hasMany(Invoice,{
    foreignKey:"customerId",
    onDelete : 'CASCADE'
})


module.exports = Invoice
