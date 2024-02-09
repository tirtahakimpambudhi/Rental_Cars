const envConfig = require("../../../config/env.config");
const { paging, carsExist } = require("../../../utils/cars.utils");
const { urlQueryValidation, emailExist } = require("../../../utils/seller.utils");
const Response_Error = require("../../errors/error.handler");
const jwt = require("jsonwebtoken");
const validations = require("../../validations/validations");
const { logger_console } = require("../../../config/winston.config");



class Seller_Service_Page {

    constructor(Seller_DB,Cars_DB,Customer_DB,Invoice_DB,History_Invoice_DB,Images_DB){
        this.Seller = Seller_DB
        this.Cars = Cars_DB
        this.Customer = Customer_DB
        this.Invoice = Invoice_DB
        this.History = History_Invoice_DB
        this.Images_DB = Images_DB
    }

    async check_login(id_params){
      try {
        const client = await this.Seller.findByPk(id_params)
        return client.refresh_token
      } catch (error) {
        throw error
      }
    }
    async get_home_page (id_params) {
        try {
          const url_id_params = await urlQueryValidation(id_params);
          if (!url_id_params) throw new Response_Error(404, "NOT FOUND");
          const is_login = await this.check_login(id_params)
          if(!is_login) throw new Response_Error(401, "Your account is not login yet");
          return url_id_params
        } catch (error) {
          throw error
        }
      }
      async get_car_by_id(id_params,id_cars){
        try {
          const url_id_params = await urlQueryValidation(id_params);
          if (!url_id_params) {
            throw new errorResponse(404, "Seller Not Found");
          }

          const carsExist = await this.Cars.findOne({
            where : {
              id : id_cars,
              sellerId : id_params
            }
          })
          if (carsExist ==  null || carsExist == undefined){
            throw new errorResponse(404, "Seller or Cars Not Found");
          }
          return carsExist
        } catch (error) {
          throw error
        }
      }
      async get_cars_page(id_params, page_to , data_per_page){
        try {
            // Mencari akun admin berdasarkan parameter
            const url_id_params = await urlQueryValidation(id_params);
            if (!url_id_params) {
              throw new errorResponse(404, "Seller Not Found");
            }
        
            const total_data = await this.Cars.count()
            
            const {offset,pageActive,totalPage} = paging(total_data,page_to,data_per_page)
            const total_client = await this.Invoice.count({
              where : {
                sellerId : url_id_params.id
              }
            })
            const pagingResult = await this.Cars.findAll({
              where : {
                sellerId : url_id_params.id
              },
              limit: data_per_page,
              offset,
              attributes: ["engine", "prudutionYear", "merk", "tipe", "mileagePerLiter","id","description"],
              include :  this.Images_DB
            });
           
            return {seller : url_id_params , cars:pagingResult , total_client  , page : {pageActive , totalPage}};
          } catch (error) {
            throw error;
          }
      }

      async change_password_page(email,token){
        try {
          
          const email_validate = await emailExist(email)
          if(!email_validate) throw new Response_Error(404,"EMAIL DOESNT EXIST")
          const secret = envConfig.secret_token + email
          const payload = jwt.verify(token,secret);
        } catch (error) {
          throw error
        }
      }

      
  async mulct_users_invoice (id_params,id_Inv,input,schema){
    try {
      
      const url_id_params = await urlQueryValidation(id_params)
      const is_Inv = await this.Invoice.findByPk(id_Inv, {
        include : [
          {
            model : this.Cars,
            attributes: ["merk", "pricePerDay", "tipe", "plat"]
          },
          {
            model : this.Customer,
            attributes: ["id", "email", "name", "address", "noTelp"]
          }
        ]
      })
      if(!url_id_params || !is_Inv) throw new Response_Error(404,"NOT FOUND")
      const validate_input = validations(schema,input)

      const cars = await this.Cars.findByPk(is_Inv.carsId)
       is_Inv.mulct += cars.pricePerDay * validate_input.value.days
       is_Inv.totalPrice += cars.pricePerDay * validate_input.value.days 
       await is_Inv.save()
      return is_Inv
    } catch (error) {
      throw error
    }
  }
  async profile_page(id_params){
    try {
      const url_id_params = await urlQueryValidation(id_params);
      if (!url_id_params) throw new Response_Error(404, "NOT FOUND");
      const result = await this.Seller.findByPk(id_params,{attributes : ['id','name','email','noRekening','address','noTelp','nameCompany','createdAt']});
      const is_login = await this.check_login(id_params)
      if(!is_login) throw new Response_Error(401, "Your account is not login yet");
      return result
    } catch (error) {
      throw error
    }
  }
  async dashboard_page(id_params){
    try {
      const url_id_params = await urlQueryValidation(id_params);
      if (!url_id_params) throw new Response_Error(404, "NOT FOUND");
      const result = await this.Seller.findByPk(id_params,{attributes : ['id','name','email','noRekening','address','noTelp']});
      const is_login = await this.check_login(id_params)
      if(!is_login) throw new Response_Error(401, "Your account is not login yet");

      const count_inv = await this.Invoice.count({where : {sellerId : id_params}})
      const inv = await this.Invoice.findAll({where : {sellerId : id_params}})
      const history_inv = await this.History.findAll({where : {sellerId : id_params}})
      const count_history_inv = await this.History.count({where : {sellerId : id_params}})

      const total_client = count_inv + count_history_inv
      const total_cars = await this.Cars.count({where : {sellerId : id_params}})

      let total_money = 0
      if(total_client !== 0){
        inv.forEach((invoice,index) => {
          if(count_history_inv !== 0){
            if(history_inv[index]){
              total_money += invoice.totalPrice + history_inv[index].totalPrice
            }
          } else {
            total_money +=  invoice.totalPrice 
          }
          
        });

      } 

      return {result,total_client,total_cars,total_money}
    } catch (error) {
      throw error
    }
  }
  async data_cars_page(id_params,page_to) {
    try {
      const url_id_params = await urlQueryValidation(id_params);
      if (!url_id_params) throw new Response_Error(404, "NOT FOUND");
      const result = await this.Seller.findByPk(id_params, { attributes: ['id', 'name', 'email', 'noRekening', 'address', 'noTelp',] });
      const is_login = await this.check_login(id_params)
      if (!is_login) throw new Response_Error(401, "Your account is not login yet");
      const cars = await this.Cars.findAll({where : {sellerId : id_params}})
      const total_data = cars.length
      const {offset,pageActive,totalPage} = paging(total_data,page_to,envConfig.data_per_page)
      const limit = envConfig.data_per_page
      const result_paging = await this.Cars.findAll({
        where: { sellerId: id_params },
        limit: limit,
        offset: offset
      })
      return{result,cars, paging : {result_paging,pageActive,totalPage,total_data}}
    } catch (error) {
      throw error
    }
  }
}

module.exports =  Seller_Service_Page