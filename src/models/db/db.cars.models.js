const {Model , DataTypes} = require("sequelize")
const {sequelize} = require("../../../config/db.config")
const Seller = require("./db.sellers.models")


class Cars extends Model {}

Cars.init({
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false
    },plat : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true 
    },sellerId : {
        type : DataTypes.UUID,
        allowNull : false ,
        references : {
            model : Seller ,
            key : "id"
        }
    },
    merk : {
        type : DataTypes.ENUM(["TOYOTA","HONDA","FORD","CHEVROLET","VOLKSWAGEN (VW)","BMW","MERCEDES-BENZ","AUDI","NISSAN","HYUNDAI","KIA","MAZDA","SUBARU","VOLVO","TESLA","PORSCHE","LEXUS","JAGUAR","LAND ROVER","FERRARI","LAMBORGHINI","BUGGATATI","MCLAREN","ETC"]),
        allowNull : false
    },
    tipe : {
        type : DataTypes.STRING,
        allowNull : false
    },statusRental : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    modelCars : {
        type : DataTypes.ENUM(['MICRO','HATCHBACK','UNIVERSAL','COUPE','CABRIOLET','ROADSTER','TARGA','LIMOUSINE','MUSCLE','SPORT','SUPERCAR','SUV','PICKUP','VAN',"ETC"]),
        allowNull:false
    },
    color : {
        type : DataTypes.STRING,
        allowNull : false
    },
    pricePerDay : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    prudutionYear:{
        type : DataTypes.STRING,
        allowNull : false
    },
    engine : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description:{
        type : DataTypes.TEXT,
        allowNull : false
    },
    mileagePerLiter : {
        type : DataTypes.STRING,
        allowNull : false
    }

}, {
    sequelize,
    modelName:"car",
    timestamps : true
})

Seller.hasMany(Cars, {
    foreignKey: "sellerId", // Nama kolom kunci asing di tabel Car
  });
  Cars.belongsTo(Seller, {
    foreignKey: "sellerId", // Nama kolom kunci asing di tabel Car
  });
  

module.exports=Cars