const express = require("express");
const router = express.Router();
const videosRouter = require("./videos");

router.use("/videos", videosRouter), 

module.exports = router;
