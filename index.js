const env = require("./config/env.config");
const { logger_console } = require("./config/winston.config");
const app = require("./src/app");

const PORT = env.port || 3000
app.listen(PORT, () => logger_console.info(`SERVER RUNNING IN ${env.base_url}:${PORT}`))