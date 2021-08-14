const { VIDEO_PATH_FOLDER } = require("../config/environment");
const logger = require("../utilities/logger");
const { promisify } = require("util");
const { readdir } = require("fs");
const { exec } = require("child_process");

const execPromise = promisify(exec);
const readDirPromise = promisify(readdir);
console.log(VIDEO_PATH_FOLDER)

const getFiles = async (req, res) => {
    const files = await readDirPromise(VIDEO_PATH_FOLDER);
    logger.debug(files);
    res.json(files);
};

// Upload Video
const multer = require("multer");
const videoStorage = multer.diskStorage({
    destination: VIDEO_PATH_FOLDER, // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 128 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        // upload only mp4, mkv and mov formats
        logger.debug("File", { file });
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|mov)$/)) {
            return cb(new Error('Please upload a video'))
        }
        cb(undefined, true)
    }
});

const uploadVideo = [
    videoUpload.single('video'),
    (req, res) => res.json(req.file),
    (error, req, res, next) => res.status(400).send({ error: error.message }),
];


// Play video
const playVideo = async (req, res) => {
    const filepath = `${VIDEO_PATH_FOLDER}/${req.params.filepath}`;
    const flags = [
        "--video-on-top",
        "--play-and-exit",
        "--fullscreen",
        "--no-interact",
        "--no-video-title-show",
        "--no-video-wallpaper"
    ];
    const result = await execPromise(`vlc ${flags.join(" ")} "${filepath}"`);
    res.json({
        ...result,
    });
};

module.exports = {
    getFiles,
    uploadVideo,
    playVideo,
};
