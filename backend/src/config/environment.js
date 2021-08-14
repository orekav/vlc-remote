const { homedir } = require("os");
const {
    PORT,
    VIDEO_PATH_FOLDER,
    LOGGER_LEVEL,
} = process.env;
const path = require("path");

module.exports = {
    PORT: PORT || 3000,
    VIDEO_PATH_FOLDER: path.join(homedir(), VIDEO_PATH_FOLDER),
    LOGGER_LEVEL,
};
