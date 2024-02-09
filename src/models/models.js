const { initDB } = require("../../config/db.config");
const Cars = require("./db/db.cars.models");
const Seller = require("./db/db.sellers.models");
const Customer = require("./db/db.users.models");
const Invoice = require("./db/db.invoices.models");
const { logger_console } = require("../../config/winston.config");
const Img_Cars = require("./db/db.images.cars");
const OTP_SELLER = require("./db/db.otp.seller.models");
const OTP_USERS = require("./db/db.otp.users.model");
const History_Invoice = require("./db/db.history.invoices");

(async () => {
  try {
    // Inisialisasi database terlebih dahulu
    await initDB();

    // Setelah inisialisasi database berhasil, lanjutkan dengan definisi hubungan
    // Setelah inisialisasi database berhasil, lanjutkan dengan definisi hubungan

    await Seller.sync();
    await Customer.sync();
    await Cars.sync();
    await Invoice.sync();
    await History_Invoice.sync();
    await Img_Cars.sync()
    await OTP_SELLER.sync()
    await OTP_USERS.sync()
    // Setelah tabel-tabel terbuat, definisi hubungan sudah diterapkan

    logger_console.info("All databases have been created");
  } catch (error) {
    logger_console.error(error);
    throw new Error(error);
  }

})();


