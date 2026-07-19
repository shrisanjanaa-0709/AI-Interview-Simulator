
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
    console.log("Signup Error:");
    console.log(error.response?.data);
    console.log(error.message);

    res.status(500).json({
        success: false,
        message: error.response?.data || error.message
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