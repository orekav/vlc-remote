require("dotenv").config();

const logger = require("./utilities/logger");
const app = require("./app");
const { PORT } = require("./config/environment");

app.listen(PORT, () => logger.debug(`Server listening on port ${PORT}`));
