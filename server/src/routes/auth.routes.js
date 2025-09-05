const express = require("express");

const router = express.Router();

const {
    registerValidation,
    loginValidation,
} = require("../middleware/authvalidation.middleware");

const { login, register, home } = require("../controller/auth.controller");

const verifyToken = require("../middleware/auth.middleware");

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.get("/home/:id", verifyToken, home);

module.exports = router;
