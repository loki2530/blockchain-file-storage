const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadFile, getFile } = require("../controllers/fileController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/upload", isAuthenticated, upload.single("file"), uploadFile);
router.get("/download/:hash", isAuthenticated, getFile);

module.exports = router;
