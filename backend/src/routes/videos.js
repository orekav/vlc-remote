const express = require("express");
const router = express.Router();
const { getFiles, playVideo, uploadVideo } = require("../controllers/videos");

router.get("/", getFiles);
router.post("/", ...uploadVideo);
router.post("/:filepath", playVideo);

module.exports = router;
