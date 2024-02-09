const fs = require("fs");
const path = require("path");
const { carsExist, carsFindByID } = require("../../utils/cars.utils");
const Response_Error = require("../errors/error.handler");

const validations = require("../validations/validations");
const Seller_Service = require("./seller.services");



class Cars_Service_CRUD extends Seller_Service{
    constructor(Cars,Img_Cars,Seller){
        super()
        this.Cars = Cars
        this.Img_Cars = Img_Cars
        this.Seller = Seller//Parent
    }

    //delete_bulk_images
    async delete_bulk_images_file(id_cars){
      try {
        let deletedFiles = 0
        const images_db = await this.Img_Cars.findAll({where : {carsId : id_cars}})//Array
        images_db.forEach((image) => {
          let image_path = path.join(__dirname,"..","..","upload",image.path)
          if(fs.existsSync(image_path)){
            fs.rmSync(image_path)
            deletedFiles ++
          }
        })
        return deletedFiles
      } catch (error) {
        throw error
      }
    }

    async bulk_images(images,carsId){
      try {
        const bulk_data_images = []
        images.forEach(image => {
          const properti_images = {}
          properti_images.carsId = carsId
          properti_images.path = path.join("images",image.filename)
          bulk_data_images.push(properti_images)
      });
        await this.Img_Cars.bulkCreate(bulk_data_images)
      } catch (error) {
        throw error
      }
    }

    async create(input,id_params,schema,images){
        try {
            // Mencari penjual berdasarkan kata sandi
            const url_id_params = await this.urlQueryValidation(id_params)
            // Menangani jika penjual tidak ditemukan

            if (!url_id_params) {
                throw new Response_Error(404, "NOT FOUND");
              }
            //Validasi data mobil
            const validate_input = validations(schema,input)
            // Menghitung jumlah mobil dengan nomor plat yang sama

            const countCars = await carsExist(validate_input.value.plat)
        
            // Menangani jika mobil dengan nomor plat yang sama sudah ada
            if (countCars) {
              throw new Response_Error(401, "Cars Already Exist");
            } else {
                validate_input.value.sellerId = url_id_params.id;
              // Menambahkan data mobil baru
              const result = await this.Cars.create(validate_input.value, { returning: true });
                


              const carsId = result.id
              await this.bulk_images(images,carsId)
              return result;
            }
          } catch (error) {
            throw error
          }
    }
    async update(id_cars,id_params,schema,input,images){
      try {
        const url_id_params = this.urlQueryValidation(id_params);
        if (!url_id_params) {
          throw new Response_Error(404, "NOT FOUND");
        }
        //Validate Input
        const validate_input = validations(schema,input)
        //Check Cars
        const cars = await carsFindByID(id_cars,id_params);
        if(!cars) throw new Response_Error(404,"Cars Not Found")
        //Upload
  
        if(images.length !== 0){
          await this.delete_bulk_images_file(id_cars)
          await this.Img_Cars.destroy({where : {carsId : id_cars}})
          await this.bulk_images(images,id_cars)
        }
        await this.Cars.update(validate_input.value,{
          where : {
            id : id_cars
          }
        })
        return validate_input.value
      } catch (error) {
        throw error
      }
    }

    async delete (id_params,id_cars) {
      try {
        const url_id_params = await this.urlQueryValidation(id_params);
        if (!url_id_params) {
          throw new Response_Error(404, "NOT FOUND");
        }

        const cars = await carsFindByID(id_cars,id_params);
        if(!cars) throw new Response_Error(404,"Cars Not Found")
        const deletedFiles = await this.delete_bulk_images_file(id_cars)
        await this.Img_Cars.destroy({where : {carsId : id_cars}})
        await this.Cars.destroy({where : {id : id_cars}})

        return deletedFiles
      } catch (error) {
        throw error
      }
    }
  
}

module.exports = Cars_Service_CRUD