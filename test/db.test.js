const { logger_console } = require("../config/winston.config");
const OTP_SELLER = require("../src/models/db/db.otp.seller.models");
const Test = require("./model.test");



// describe("Test DB", () => {
//     try {
//         beforeAll((done) => {
//             Test.sync().then(() => logger_console.info("DB TEST CREATED"))
//             done()
//         })
//         test("DATABASE TEST", async () => {
    
//             const test = await Test.create({plat:"AB 2364 GH",sellerId:"hy218e9hn1yxe899yx912"},{returning : true})
//             logger_console.info(test.id)
//             expect(test.plat).toBe("AB 2364 GH")
//         })
        
//     } catch (error) {
//         throw new Error(error)
//     }
// })




// async function createTest () {
//  try {
//      Test.sync().then(() => logger_console.info("DB CREATED"))
//     // const test = await Test.create({returning : true})
//     // logger_console.info(test.id)
//  } catch (error) {
//     logger_console.error(error.message)
//     throw new Error(error)
//  }
// }

// createTest()
async function showData(){
   const result = await OTP_SELLER.findAll()
   return result
}

showData()
   .then((data) => console.log(data))
