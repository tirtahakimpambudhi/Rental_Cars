const env = require("./env.config");
const { Sequelize } = require("sequelize");
const { db_exist } = require("../utils/db.utils");
const { logger_console, logger_file } = require("./winston.config");

// Inisialisasi objek Sequelize
const sequelize = new Sequelize({
  dialect: env.dialect,
  host: env.db_host,
  username: env.db_user,
  password: env.db_password,
  database: env.db_name,
  logging: false,
});

// Buat fungsi async untuk menginisialisasi koneksi dan menunggu db_exist
async function initDB() {
  try {
    await db_exist();

    // Lakukan autentikasi ke database
    await sequelize.authenticate();
    logger_console.info("Connected to the database successfully.");
  } catch (error) {
    logger_console.error(error.message);
    throw new Error(error);
  }
}

// Export objek Sequelize dan fungsi initDB
module.exports = { sequelize, initDB };
