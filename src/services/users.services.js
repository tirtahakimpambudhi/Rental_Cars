const Seller_Service = require("./seller.services");



class Users_Service extends Seller_Service{
    constructor(Users){
        super();
        this.Seller = Users
    }
}

module.exports = Users_Service