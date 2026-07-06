
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

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
router.post(
  "/resume",
  upload.single("resume"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const formData = new FormData();

      formData.append(
        "file",
        fs.createReadStream(req.file.path)
      );

      // Parse resume
      const parseResponse = await axios.post(
        "http://127.0.0.1:8000/parse-resume",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      const skills = parseResponse.data.skills;

      const education = parseResponse.data.education;

      const projects = parseResponse.data.projects;

      const experience = parseResponse.data.experience;

      // Generate questions
      const questionResponse =
        await axios.post(
          "http://127.0.0.1:8000/generate-questions",
          {
            skills,
          }
        );

      return res.status(200).json({

  message: "Resume processed successfully",

  skills,
  education,
  projects,
  experience,

  questions: questionResponse.data.questions,

});

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        message:
          "Error processing resume",

      });

    }
  }
);
module.exports = router;
