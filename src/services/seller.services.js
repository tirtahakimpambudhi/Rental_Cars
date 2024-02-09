
const Response_Error = require("../errors/error.handler")
const validations = require("../validations/validations")
// const {seller_validations_register, seller_validations_login, seller_validations_edit, seller_validations_change_password} = require("../validations/sellers.validations")
// const {emailExist, urlQueryValidation} = require("../../utils/seller.utils")
const env = require("../../config/env.config")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const sendEmail = require("../middlewares/email/nodemailer.middleware")
const envConfig = require("../../config/env.config");
const otp = require("../middlewares/otp.generator.middleware");

class Seller_Service {
  constructor(Seller,OTP){
      this.Seller = Seller
      this.OTP_DB = OTP
  }

  async verified_OTP(client_id){
    try {
      const otp_client = await this.OTP_DB.findOne({where : {client_id}})
      const result = (otp_client.is_verified) ?true  :false
      return result
    } catch (error) {
      throw error
    }
  }

  async auth_OTP(client_id,key_otp){
    try {
      const otp_client = await this.OTP_DB.findOne({where : {client_id}})
      const result = (otp_client.key_otp == key_otp) ?otp_client :false
      return result
    } catch (error) {
      throw error
    }
  }


  async urlQueryValidation(id_params){
    try {
      const result = await this.Seller.findByPk(id_params)

      const checkSeller = (result) ?result.getInformationSeller() :false;
      return checkSeller ;
  } catch (error) {
      new Response_Error(500,`Error From Utils : ${error}`);
  }
  }
  async emailExist(email){
    try {
      const result = await this.Seller.count({
          where : {
              email
          }
      });
  
      const resultCheck = (result === 1 ) ?true :false ;
      return resultCheck ; 

  } catch (error) {
      new Response_Error(500,`Error From Utils : ${error}`);
  }
  }

  async register (input,schema){
      try {
          //Validasi Input 
          const validate_input = validations(schema,input)
          //Validasi Email Exist
          const email_validate = await this.emailExist(validate_input.value.email)
          if(email_validate) throw new Response_Error(400,"Account Already Registered");
          //Hashing Password
          const password_hash = await bcrypt.hash(validate_input.value.password,env.salt)
          validate_input.value.password = password_hash
          const client = await this.Seller.create(validate_input.value,{returning : true});
          const otp_data = {
            client_id : client.id,
            key_otp : otp
          }
          const message = `This Your OTP KEY ${otp_data.key_otp}`
          await this.OTP_DB.create(otp_data)
          sendEmail(client.email,"OTP",message);
      } catch (error) {
        throw error
      }
  }

  async OTP (key_otp,email){
    try {
      const client = await this.Seller.findOne({where:{email}});
      if(!client)throw new Response_Error(404,"NOT FOUND");

      const auth_otp = await this.auth_OTP(client.id,key_otp);
      if(!auth_otp) throw new Response_Error(400,"CODE OTP WRONG")

      auth_otp.is_verified = true
      await auth_otp.save()

    } catch (error) {
      throw error
    }
  }
  async login (input,schema){
      try {
          const validate_input = validations(schema, input);
          // Mencari akun berdasarkan email
          const seller = await this.Seller.findOne({
            where: {
              email: validate_input.value.email,
            },
          });
          if (!seller) {
            throw new Response_Error(404, "Email Not Found");
          }
          const verified_otp = await this.verified_OTP(seller.id)
          if(!verified_otp) throw new Response_Error(401,"Account Not Verified! Please Verification OTP")
          // Membandingkan password yang diinputkan dengan yang tersimpan
          const password_validations = await bcrypt.compare(
            validate_input.value.password,
            seller.password
          );
      
          if (!password_validations) {
            throw new Response_Error(401, "Email Or Password Wrong");
          }
      
          // Membuat token akses dan token segar
          const id = seller.id;
          const email = seller.email;
         
          const accessToken = jwt.sign(
            { id, email },
            env.access_token,
            { expiresIn: "30s" }
          );
          const refreshToken = jwt.sign(
            { id, email },
            env.refresh_token,
            { expiresIn: "1d" }
          );
      
          // Menyimpan token segar ke dalam database
          await this.Seller.update(
            { refresh_token: refreshToken },
            {
              where: {
                id,
              },
            }
          );
      
          const token = {
            accessToken,
            refreshToken
          };
      
          return token;
        } catch (error) {
          throw error;
        }
  }

  async edit (input,id_params,schema){
    try {

      const validate_input = validations(schema, input);
  
      // Mencari akun admin berdasarkan parameter
      const url_id_params = await this.urlQueryValidation(id_params);
  
      if (!url_id_params) {
        throw new Response_Error(404, "NOT FOUND");
      }
  
      // Memastikan email yang ingin diperbarui sesuai
      if (url_id_params.email !== validate_input.value.emailOld) {
        throw new Response_Error(404, "EMAIL NOT FOUND");
      }
  
      // Mencari akun admin berdasarkan email
      const email_validate =await this.Seller.findOne({
        where: {
          email: validate_input.value.emailOld,
        },
      });
  
      if (!email_validate) {
        throw new Response_Error(404, "Email Not Found");
      }
  
      // Memvalidasi password
      const password_validations = await bcrypt.compare(
        validate_input.value.passwordOld,
        email_validate.password
      );
  
      if (!password_validations) {
        throw new Response_Error(401, "Email Or Password Wrong");
      }
  
      const keysToExclude = ["emailOld", "passwordOld"];
      let seller_data = {};
  
      // Memfilter data yang akan diperbarui
      for (let key in validate_input.value) {
        if (!keysToExclude.includes(key)) {
          seller_data[key] = validate_input.value[key];
        }
      }
  
      // Jika password baru disediakan, enkripsi password baru
      if (!seller_data.password == false) {
        seller_data.password = await bcrypt.hash(
          seller_data.password,
          env.salt
        );
        
      } 
      // Melakukan pembaruan data admin
     await this.Seller.update(seller_data, {
        where: {
          id: email_validate.id,
        },
      });
  
      return email_validate.id;
    } catch (error) {
      throw error;
    }
  }

  async forgot_password (email,url){
    try {

      const email_validate = await this.emailExist(email)
      if(!email_validate) {
          throw new Response_Error(404,"EMAIL DOESNT EXIST")
      }
      const seller = await this.Seller.findOne({where : {email}})
      const payload = {email : seller.email , name : seller.name}
      const secret = env.secret_token + seller.email
      const token = jwt.sign(payload,secret,{expiresIn : '10m'})
       url += `/${email}/${token}`
      const text = `This Your Url To Changed Password ${url}`
      sendEmail(email,"FORGOT-PASSWORD",text) 
    } catch (error) {
      throw error;
    }
  }

  async reset_password (email,token,input,schema) {
    try{
    const secret = envConfig.secret_token + email
    const payload = jwt.verify(token,secret)
    const email_validate = await this.emailExist(email)
    if(!email_validate) throw new Response_Error(404,"EMAIL DOESNT EXIST")

    const validate_input = validations(schema,input)
    const new_password = validate_input.value.password

    const new_hash_password = await bcrypt.hash(new_password,envConfig.salt)

    const seller = await this.Seller.findOne({where : {email}})
    if(!seller) throw new Response_Error(404,"NOT FOUND");
    seller.password = new_hash_password;
    await seller.save()
  } catch (error) {
    throw error
  }
  }

  async logout (res,refreshToken,redirectTo){
    try {
      if (!refreshToken) {
          return res.sendStatus(204).redirect(redirectTo); // Menggunakan 'return' untuk menghentikan eksekusi fungsi
      }
      let seller = await this.Seller.findOne({
          where: {
              refresh_token: refreshToken
          }
      });
      if (!seller) {
          return res.status(204).redirect(redirectTo); // Menggunakan 'return' untuk menghentikan eksekusi fungsi
      }
      // Menghapus refreshToken dari cookie
      res.clearCookie('refreshToken');
      // Menetapkan refresh_token menjadi null dan menyimpan perubahan
      seller.refresh_token = null; // Perbaikan penulisan "null"
      
      await seller.save();

      return res.status(204).redirect(redirectTo); 
    } catch (error) {
      throw error
    }
  }

  //Confirm Users || Seller
  async confirm_is_you (id_params,input,schema){
    try {
      //Validasi URL
      const url_id_params = await this.urlQueryValidation(id_params)
      if(!url_id_params) throw new Response_Error(404,"NOT FOUND")
      const validate_input = validations(schema,input)
      //Confirm Is You
      const seller = await this.Seller.findOne({where : {email : validate_input.value.email,password : validate_input.value.password}})
      if(!seller) throw new Response_Error(400,"Is Not You")
      return true
    } catch (error) {
      throw error
    }
  }



}



// class Seller_Service {
//     constructor(Seller){
//         this.Seller = Seller
//     }

//     async register (input){
//         try {
//             //Validasi Input 
//             const validate_input = validations(seller_validations_register,input)
//             //Validasi Email Exist
//             const email_validate = await emailExist(validate_input.value.email)
//             if(email_validate) throw new Response_Error(400,"Account Already Registered");
//             //Hashing Password
//             const password_hash = await bcrypt.hash(validate_input.value.password,env.salt)
//             validate_input.value.password = password_hash
            
//             await this.Seller.create(validate_input.value);
//         } catch (error) {
//           throw error
//         }
//     }

//     async login (input){
//         try {
//             const validate_input = validations(seller_validations_login, input);
//             // Mencari akun berdasarkan email
//             const seller = await this.Seller.findOne({
//               where: {
//                 email: validate_input.value.email,
//               },
//             });
//             if (!seller) {
//               throw new Response_Error(404, "Email Not Found");
//             }
        
//             // Membandingkan password yang diinputkan dengan yang tersimpan
//             const password_validations = await bcrypt.compare(
//               validate_input.value.password,
//               seller.password
//             );
        
//             if (!password_validations) {
//               throw new Response_Error(401, "Email Or Password Wrong");
//             }
        
//             // Membuat token akses dan token segar
//             const sellerId = seller.id;
//             const email = seller.email;
           
//             const accessToken = jwt.sign(
//               { sellerId, email },
//               env.access_token,
//               { expiresIn: "30s" }
//             );
//             const refreshToken = jwt.sign(
//               { sellerId, email },
//               env.refresh_token,
//               { expiresIn: "1d" }
//             );
        
//             // Menyimpan token segar ke dalam database
//             await this.Seller.update(
//               { refresh_token: refreshToken },
//               {
//                 where: {
//                   id: sellerId,
//                 },
//               }
//             );
        
//             const token = {
//               accessToken,
//               refreshToken,
//             };
        
//             return token;
//           } catch (error) {
//             throw error;
//           }
//     }

//     async edit (input,id_params){
//       try {

//         const validate_input = validations(seller_validations_edit, input);
    
//         // Mencari akun admin berdasarkan parameter
//         const url_id_params = await urlQueryValidation(id_params);
    
//         if (!url_id_params) {
//           throw new Response_Error(404, "NOT FOUND");
//         }
    
//         // Memastikan email yang ingin diperbarui sesuai
//         if (url_id_params.email !== validate_input.value.emailOld) {
//           throw new Response_Error(404, "EMAIL NOT FOUND");
//         }
    
//         // Mencari akun admin berdasarkan email
//         const email_validate =await this.Seller.findOne({
//           where: {
//             email: validate_input.value.emailOld,
//           },
//         });
    
//         if (!email_validate) {
//           throw new Response_Error(404, "Email Not Found");
//         }
    
//         // Memvalidasi password
//         const password_validations = await bcrypt.compare(
//           validate_input.value.passwordOld,
//           email_validate.password
//         );
    
//         if (!password_validations) {
//           throw new errorResponse(401, "Email Or Password Wrong");
//         }
    
//         const keysToExclude = ["emailOld", "passwordOld"];
//         let seller_data = {};
    
//         // Memfilter data yang akan diperbarui
//         for (let key in validate_input.value) {
//           if (!keysToExclude.includes(key)) {
//             seller_data[key] = validate_input.value[key];
//           }
//         }
    
//         // Jika password baru disediakan, enkripsi password baru
//         if (!seller_data.password == false) {
//           seller_data.password = await bcrypt.hash(
//             seller_data.password,
//             env.salt
//           );
          
//         } 
//         // Melakukan pembaruan data admin
//        await this.Seller.update(seller_data, {
//           where: {
//             id: email_validate.id,
//           },
//         });
    
//         return email_validate.id;
//       } catch (error) {
//         throw error;
//       }
//     }

//     async forgot_password (email){
//       try {

//         const email_validate = await emailExist(email)
//         if(!email_validate) {
//             throw new Response_Error(404,"EMAIL DOESNT EXIST")
//         }
//         const seller = await this.Seller.findOne({where : {email}})
//         const payload = {email : seller.email , name : seller.name}
//         const secret = env.secret_token + seller.email
//         const token = jwt.sign(payload,secret,{expiresIn : '10m'})
//         BASE_URL.pathname+= `/${email}/`
//         BASE_URL.pathname+= `${token}`
//         const url = BASE_URL
//         const text = `This Your Url To Changed Password ${url}`
//         sendEmail(email,"FORGOT-PASSWORD",text) 
//       } catch (error) {
//         throw error;
//       }
//     }

//     async reset_password (email,token,input) {
//       try{
//       const secret = envConfig.secret_token + email
//       const payload = jwt.verify(token,secret)
//       const email_validate = await emailExist(email)
//       if(!email_validate) throw new Response_Error(404,"EMAIL DOESNT EXIST")
  
//       const validate_input = validations(seller_validations_change_password,input)
//       const new_password = validate_input.value.password
  
//       const new_hash_password = await bcrypt.hash(new_password,envConfig.salt)
  
//       const seller = await this.Seller.findOne({where : {email}})
//       if(!seller) throw new Response_Error(404,"NOT FOUND");
//       seller.password = new_hash_password;
//       await seller.save()
//     } catch (error) {
//       throw error
//     }
//     }


// }


module.exports = Seller_Service