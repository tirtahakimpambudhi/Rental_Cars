const speakeasy = require('speakeasy');

// Fungsi untuk menghasilkan OTP
function generateOTP(secret) {
  // Menghasilkan token OTP menggunakan TOTP
  const token = speakeasy.totp({
    secret: secret,
    encoding: 'base32'
  });
  
  // Mengembalikan token OTP
  return token;
}

// Contoh penggunaan
const secret = speakeasy.generateSecret({ length: 20 }).base32; // Menghasilkan kunci rahasia baru
const otp = generateOTP(secret);

module.exports = otp