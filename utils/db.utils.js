const {Sequelize} = require("sequelize")
const env = require("../config/env.config")
const { logger_console } = require("../config/winston.config")



const pool = new Sequelize({
    dialect: env.dialect,
    host: env.db_host,
    username: env.db_user,
    password: env.db_password,
    logging: false,
})

async function db_exist() {
  try {
    await pool.authenticate();

    const [results] = await pool.query(`SHOW DATABASES LIKE '${env.db_name}';`);
    if (results.length === 0) {
      logger_console.error(`DATABASE ${env.db_name} DOES NOT EXIST`);
      await pool.query(`CREATE DATABASE ${env.db_name};`);
      logger_console.info(`DATABASE ${env.db_name} HAS BEEN CREATED`);
    } else {
      logger_console.info(`DATABASE ${env.db_name} ALREADY EXISTS`);
    }
  } catch (error) {
    logger_console.error(error.message);
    throw new Error(error);
  } finally {
    // Tutup koneksi ke MySQL setelah operasi selesai
    await pool.close();
  }
}



module.exports = {db_exist}