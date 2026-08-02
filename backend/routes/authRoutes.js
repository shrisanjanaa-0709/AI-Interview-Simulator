const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        console.log("Calling FastAPI Signup...");
        console.log("FASTAPI_URL:", process.env.FASTAPI_URL);

        const response = await axios.post(
            `${process.env.FASTAPI_URL}/signup`,
            req.body,
            {
                timeout: 60000,
            }
        );

        console.log("FastAPI Response:", response.status);

        res.json(response.data);

    } catch (error) {
        console.error("========== SIGNUP ERROR ==========");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Message:", error.message);
        console.error("==================================");

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.FASTAPI_URL}/login`,
            req.body
        );

        res.json(response.data);

    } catch (error) {
        console.log("Login Error:");
        console.log(error.response?.data);
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });
    }
});

module.exports = router;