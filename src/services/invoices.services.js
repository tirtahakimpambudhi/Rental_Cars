const Response_Error = require("../errors/error.handler");
const History_Invoice = require("../models/db/db.history.invoices");
const validations = require("../validations/validations");
const Seller_Service = require("./seller.services")


class Invoice_Service_CRUD extends Seller_Service {
    constructor(Inovoice,Customer,Seller_DB,Cars){
        super();
        this.Invoice = Inovoice
        this.Customer = Customer
        this.Seller_DB = Seller_DB
        this.Cars = Cars
        this.Seller = Customer
    }

    async invoice_validate (id_Inv){
        const is_Inv = await this.Invoice.findByPk(id_Inv,{
            include : [
                {
                    model : this.Cars,
                    attributes : ['merk','tipe','plat','statusRental','color']
                },
                {
                    model : this.Seller_DB,
                    attributes:['nameCompany','email','noTelp','address']
                },
                {
                    model : this.Customer,
                    attributes : ['email','name','noTelp','address']
                }
            ]
        });
        if(!is_Inv) throw new Response_Error(404,"NOT FOUND");
        return is_Inv
    }
    async create_invoice(input,schema,id_params,id_cars){
        try {
            const url_id_params = await this.urlQueryValidation(id_params);
            if(!url_id_params) throw new Response_Error(404,"NOT FOUND");
            const cars = await this.Cars.findByPk(id_cars,{
                include : {
                    model : this.Seller_DB,
                    attributes:['nameCompany','email','noTelp','address']
                }
            })
            if(!cars) throw new Response_Error(404,"CARS NOT FOUND");
            const input_validations = validations(schema,input);

            const data = {
                days : input_validations.value.days,
                payment : input_validations.value.payment,
                totalPrice : input_validations.value.days * cars.pricePerDay,
                customerId : url_id_params.id,
                carsId : cars.id,
                sellerId : cars.sellerId
            }

            if(cars.statusRental) throw new Response_Error(400,"Mobil Sedang Dirental")
            const inv = await this.Invoice.create(data,{returning : true})
            inv.dueDate = new Date(inv.rentalDate.getTime() + data.days * 24 * 60 * 60 * 1000);
            await inv.save()
            return id_params
        } catch (error) {
            throw error
        }
    }
    //Perpanjang Sewa || Memperpender Sewaan
    async edit_invoice(input,schema,id_params,id_inv){
        try {
            const url_id_params = await this.urlQueryValidation(id_params);
            if(!url_id_params) throw new Error(404,"NOT FOUND");
            const is_Inv = await this.invoice_validate(id_inv)
            const cars = await this.Cars.findByPk(is_Inv.carsId)
            const input_validations = validations(schema,input);
            const data_update = {
                days : input_validations.value.days,
                payment : input_validations.value.payment,
                totalPrice : input_validations.value.days * cars.pricePerDay,
                dueDate : new Date(is_Inv.rentalDate.getTime() + input_validations.value.days * 24 * 60 * 60 * 1000)
            }
            await this.Invoice.update(data_update,{where : { id : id_inv }});
            return id_params
        } catch (error) {
            throw error ;
        }
    }
    async delete_invoice (id_params,id_Inv){
        try {
            const url_id_params = await this.urlQueryValidation(id_params);
            const is_Inv = await this.invoice_validate(id_Inv)
            //Confirm is you
            const data = {
                days : is_Inv.days,
                payment : is_Inv.payment,
                totalPrice : is_Inv.totalPrice,
                customerId : is_Inv.customerId,
                carsId : is_Inv.carsId,
                sellerId : is_Inv.sellerId
            }
            await History_Invoice.create(data)
            await this.Invoice.destroy({where : {id : is_Inv.id},individualHooks: true})
            return url_id_params
        } catch (error) {
            throw error
        }
    }
}



module.exports = Invoice_Service_CRUD