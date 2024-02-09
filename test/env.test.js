const env = require("../config/env.config")
const { logger_console } = require("../config/winston.config")

// test('Testing Env Variable And Testing JEST', () => {
//     const url = new URL(env.base_url)
//     logger_console.info(url.toString())
// })
const url = new URL(env.base_url)
url.port += env.port
url.pathname += 'Kelompok-3/seller/forgot-password'

logger_console.info(url.toString())