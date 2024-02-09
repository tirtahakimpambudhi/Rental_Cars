// const fs = require('fs')
// const path = require('path')
// const { logger_console } = require('../config/winston.config')

// logger_console.info((path.join("upload","images","test.jpg")))

// const obj = {data:["aaa"]}
// logger_console.info(Object.keys(obj).length)
// Import library crypto-js
// const crypto = require('crypto');

// // Fungsi untuk membuat kunci verifikasi
// function generateVerificationKey(secretKey, data) {
//   // Mengonversi kunci rahasia ke dalam bentuk buffer
//   const secretKeyBuffer = Buffer.from(secretKey, 'hex');
  
//   // Menghitung HMAC menggunakan SHA-256
//   const hmac = crypto.createHmac('sha256', secretKeyBuffer);
  
//   // Mengupdate HMAC dengan data yang akan diverifikasi
//   hmac.update(data);
  
//   // Menghasilkan nilai HMAC dalam bentuk hex
//   const verificationKey = hmac.digest('hex');
  
//   // Mengembalikan kunci verifikasi
//   return verificationKey;
// }

// // Contoh penggunaan
// const secretKey = 'yourSecretKeyInHexFormat'; // Ganti dengan kunci rahasia Anda dalam format hex
// const dataToVerify = 'dataToBeVerified'; // Data yang akan diverifikasi

// const verificationKey = generateVerificationKey(secretKey, dataToVerify);
// console.log('Verification Key:', verificationKey);

// Import library speakeasy




