
const express = require("express");
const axios = require("axios");

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/signup",
            req.body
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Signup failed"
        });

    }
});


router.post("/login", async (req, res) => {
    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/login",
            req.body
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Login failed"
        });

    }
});

module.exports = router;