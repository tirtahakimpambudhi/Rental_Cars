// const { logger_console } = require("../config/winston.config");
// const Seller_Service = require("../src/services/seller.services");

const { logger_console } = require("../config/winston.config");
// const Controller = require("../core/Controller");

// const dummyRequest = {
//     header : {
//         'Content-Type':'Application/json'
//     },
//     query : {
//         seller : "$t821y8129hio1hwe"
//     },
//     params : {
//         token : "ih9ue90u20jde"
//     },
//     body : {
//         noRekening:"1234-1234-1234",
//         nameCompany:"CV.EXPRESS",
//         name : "Rizky Kurniawan",
//         email:"rizkyfy@gmail.com",
//         password : "12311231312",
//         noTelp : "083128128",
//         address : "JL BANTUL"

//     }
// }
class Test_Seller {
    constructor(model) {
        this.model = model;
    }

    emailExist(email) {
        return email === "test@gmail.com";
    }

    login(email) {
        const result = this.emailExist(email) ? "Login Succeeded" : "Failed";
        return result;
    }
}

class Test_User extends Test_Seller {
    constructor(model) {
        super(model); // Memanggil konstruktor superclass dengan objek model
    }

    login_users(email) {
        return this.login(email);
    }
}

const model = {}; // Ini adalah contoh objek model kosong, Anda dapat menggantinya dengan sesuatu yang lebih sesuai.

const user = new Test_User(model);
console.log(user.login_users("test@gmail.com")); // Output: "Login Succeeded"
