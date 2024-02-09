// const Cars = require("../model/carsModelDb");
// const Invoice = require("../model/invoicesModelDb");
// const Seller = require("../model/sellerModelDb");
// const Response_Error = require("../src/error/responseError")

const Response_Error = require("../src/errors/error.handler");
const Cars = require("../src/models/db/db.cars.models");
const Invoice = require("../src/models/db/db.invoices.models");
const Seller = require("../src/models/db/db.sellers.models");



const findInvByPk = async (id) => {
    try {
        const result = await Invoice.findByPk(id,{
            include : [
                {
                    model : Cars,
                    as : "Cars",
                    attributes: ["merk", "tipe", "img", "statusRental","totalPrice"]
                },
                {
                    model : Seller ,
                    as : "Seller",
                    attributes : ["nameCompany", "name", "noRekening", "address","noTelp"]
                }
            ]
        })

        const resultFind = (!result) ?false :result;
        return resultFind
    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
};

module.exports = {
    findInvByPk
}