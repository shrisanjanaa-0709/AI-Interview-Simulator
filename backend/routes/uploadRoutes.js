// routes/uploadRoutes.js

const express = require("express");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};
const upload = multer({
    storage,
    fileFilter,
});
router.post("/resume", upload.single("resume"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    res.status(200).json({
        message: "Resume uploaded successfully",
        file: req.file.filename,
    });
});
module.exports = router;
