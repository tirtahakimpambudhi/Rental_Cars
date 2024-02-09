

const Response_Error = require("../src/errors/error.handler");
const Cars = require("../src/models/db/db.cars.models");



const carsFindByID = async (id,sellerId) => {
    try {
          const result =  await Cars.findOne({
              where: {
                id,
                sellerId
              },
            });
      
            const resultFind = (!result) ?false :result
            return resultFind;
      } catch (error) {
          new Response_Error(500,`Error From Utils : ${error}`);
      }
};

const carsExist = async (plat) => {
    try {
        const result = await Cars.count({
            where : {
                plat
            }
        });

        const resultCheck = (result === 1 ) ?true :false ;
        return resultCheck
    } catch (error) {
        new Response_Error(500,`Error From Utils : ${error}`);
    }
}

const paging = (totalData,pageTo,dataPerPage) => { 
    let pageActive = !pageTo == true ? 1 : parseInt(pageTo),
    totalPage = Math.ceil(totalData / dataPerPage);
    const offset = (pageActive - 1) * dataPerPage;
    return {offset , pageActive , totalPage}
  }

module.exports={
    carsFindByID,
    carsExist,
    paging
}


